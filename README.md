# gherkin-testcafe

> Run TestCafé tests with the Gherkin syntax

## Table of contents

1. [What it does](#what-it-does)
2. [Installation](#installation)
3. [Upgrading from previous version](#upgrading-from-version-1x)
4. [CLI Usage](#cli-usage)
5. [Programming interface](#programming-interface)
   1. [Special Cases](#special-cases)
      1. [Fixture and test name](#fixture-and-test-name)
      2. [Metadata](#metadata)
      3. [Fixture context](#fixture-context)
      4. [Basic HTTP Authentication](#basic-http-authentication)
6. [Writing step definitions](#writing-step-definitions)
7. [Supported gherkin features and limitations](#supported-gherkin-features-and-limitations)
   1. [Tags](#tags)
   2. [Cucumber Expressions](#cucumber-expressions)
   3. [Hooks](#hooks)
      1. [Before and After](#before-and-after)
      2. [BeforeAll and AfterAll](#beforeall-and-afterall)
   4. [Data tables](#data-tables)
   5. [Step reporting](#step-reporting)
8. [Using typescript and ESnext features](#using-typescript-and-esnext-features)
9. [Contributing](#contributing)
   1. [Commits](#commits)
   2. [Releases](#releases)

## What it does

[TestCafé](https://devexpress.github.io/testcafe/) is a tool for automating end-to-end tests for websites.
This package provides a compatibility layer so that BDD-style tests can be run with TestCafé using the [Gherkin syntax](https://docs.cucumber.io/gherkin/).
Please note that [there was a plan](https://github.com/DevExpress/testcafe/issues/1373#issuecomment-291526857) to officially support Gherkin syntax in TestCafé. However it has been cancelled.

## Installation

Install `gherkin-testcafe` and `cucumber`<sup>1</sup> via npm or yarn:

    npm i gherkin-testcafe @cucumber/cucumber

or

    yarn add gherkin-testcafe @cucumber/cucumber

You may also install `gherkin-testcafe` globally in order to be able to use the
CLI without `npx`.

TestCafé is a peer dependency of this package. There is no need to publish a new version of this package everytime a new version of TC is released, but this does mean there is a risk of compatibility issues. To make sure you are using compatible versions, please refer to this (new and incomplete) [compatibility matrix](./version-matrix.md)

<sup>1</sup> This package internally uses [Cucumber.js](https://github.com/cucumber/cucumber-js) to parse step definitions.
You will need it to define steps (see [Writing step definitions](#writing-step-definitions)).

## CLI usage

Use the `gherkin-testcafe` just like you use TestCafé's CLI. Just replace
`testcafe` with `gherkin-testcafe` and load all JS and feature files:

    gherkin-testcafe firefox,IE tests/**/*.js tests/**/*.feature

Use `--help` command to see all options:

    gherkin-testcafe --help

All [TestCafé CLI options](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html) are supported.

Additionally, you can specify:

- Tags to run (see [Tags](#tags)):

  The `--tags` parameter can take a list of tags to filter scenarios in (or out)
  of the test run.

  - Including tag:

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags @TAG

    _This runs all scenarios that have `@TAG`_

  - Excluding tag:

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags ~@TAG

    _This runs all scenarios that don't have `@TAG`_

  - List of tags:

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags @TAG1,@TAG2

    _This runs all scenarios that have `@TAG1` **or** `@TAG2`_

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags @TAG1,~@TAG2

    _This runs all scenarios that have `@TAG1` **and not** `@TAG2`_

  - `and` operation:

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags "@TAG1 and @TAG2"

    _This runs all scenarios that have `@TAG1` **and** `@TAG2`_

          gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --tags "@TAG1 and ~@TAG2, @TAG2 and ~@TAG1"

    _This runs all scenarios that have **either** `@TAG1` **or** `@TAG2`,
    not both_

- Custom parameter types, (see [Cucumber Expressions](#cucumber-expressions))

        gherkin-testcafe firefox tests/**/*.js tests/**/*.feature --param-type-registry-file ./a-file-that-exports-a-parameter-type-registry.js

## Programming interface

To get more fine grained control over the testrun, you can use the programming interface.
It is very similar to [TestCafé's programming interface](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/).
It supports all options of [TestCafé's runner class](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html), except it replaces `src` with `steps` and `specs`.

You can use the programming interface almost exactly like TestCafé's. Just replace the import of `testcafe` by `gherkin-testcafe` and load all step and spec files:

```diff
- const createTestCafe = require('testcafe');
+ const createTestCafe = require('gherkin-testcafe');

module.exports = async () => {
    const testcafe = await createTestCafe();
    const runner = await testcafe.createRunner();
    const remoteConnection = await testcafe.createBrowserConnection();

    return runner
-       .src('test.js')
+       .src(['steps/**/*.js', 'specs/**/*.feature'])
        .browsers([remoteConnection, 'chrome'])
        .run();
};
```

You can use all [other runner methods](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#methods), that you like as well (e.g. `filter`, `screenshots` and `reporter`).

### Special cases

Some features couldn't be implemented in the exact same way they work for regular TestCafé. This is mostly due to the fact that our compiler handles the [fixture](https://testcafe.io/documentation/402775/reference/test-api/global/fixture) and [test](https://testcafe.io/documentation/402774/reference/test-api/global/test) objects internally. This means that `fixture` and `test` methods are not available outside of the gherkin compiler.

#### Fixture and test name

Fixture and test name can be accessed from the tests through the `testRun` property of the TestController object.

```ts
Given(/some step/, async (t: TestController) => {
  const { name: testName, fixture } = t.testRun.test;
  const { name: fixtureName } = fixture;
});
```

#### Metadata

The [fixture.meta()](https://testcafe.io/documentation/402780/reference/test-api/fixture/meta) and [test.meta()](https://testcafe.io/documentation/402734/reference/test-api/test/meta) methods cannot be used directly. Instead, the compiler will automatically add the name of the feature and the tags attached to it in the fixture metadata. The test metadata will only contain the attached tags.

The fixture metadata is accessible from within the `beforeAll` and `afterAll` [hooks](#beforeall-and-afterall).

The test and fixture metadata can be accessed from the tests through the `testRun` property of the TestController object.

```ts
Given(/some step/, async (t: TestController) => {
  const testMeta = t.testRun.test.meta;
  const fixtureMeta = t.testRun.test.fixture.meta;
});
```

#### Fixture context

The fixture context can be accessed from the tests through the `testRun` property of the TestController object.

```ts
Given(/some step/, async (t: TestController) => {
  const { fixtureCtx } = t.testRun;
});
```

It is best practice to avoid sharing data between tests, so the fixture context **should only ever be read**.
Writing into the fixtureCtx property of the test run is not forbidden, but should be avoided.

The fixture context is also accessible from within the `beforeAll` and `afterAll` [hooks](#beforeall-and-afterall).

#### Basic HTTP Authentication

TestCafé doesn't display nor handle the browser's dialog boxes, so [Basic HTTP Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) can only be achieved by programmatically setting the Authorization header properly, then accessing the page.

To do this, regular TestCafé exposes the [fixture.httpAuth](https://testcafe.io/documentation/402781/reference/test-api/fixture/httpauth) and [test.httpAuth](https://testcafe.io/documentation/402735/reference/test-api/test/httpauth) methods.

For the same reason as before, in gherkin-testcafe, neither are accessible outside of the compiler.
To work around that, you may create `featureFileName.credentials.js` next to `featureFileName.feature` that exports the needed credentials.

That file being JS, you can get the credentials from any kind of source you'd like, as long as the end result is properly exported with the property names that `httpAuth` is expecting.

The credentials are applied to all the tests in the feature. They will not be applied to any other feature, each feature file requires its own dedicated credential file.

At the moment, `httpAuth` can only be used at the feature level.

## Writing step definitions

To write step definitions, import `Given`, `When` and/ or `Then` from `cucumber`<sup>2</sup>:

```js
import { Given, When, Then } from '@cucumber/cucumber';

Given(/some precondition/, async (t) => {
  // The first argument of Given, When and Then will be a regex that matches the step.
  // The second argument is a function that takes TestCafé's test controller object as a parameter.
});

When(/something (.+) happens/, async (t, params) => {
  // Captured parameters in the step regex will be passed as the second argument to the test implementation.
  // "When Something great happens" will call this function with `["great"]` as `params`.
});

When(/something (.+) and (.+) happens/, async (t, [param1, param2]) => {
  // You can use regular array destructuring to access params directly.
  // "When Something great and awesome happens" will result in `"great"` as `param1` and `"awesome"` as `param2`.
});

Then(/an assertion takes place/, async (t) => {
  // Test code is the same as TestCafé's test function accepts.
  await t.expect(true).ok();
});

Then(
  'use Cucumber Expressions to get {int}, {float}, {word}, {string}, etc',
  async (t, [intParam, floatParam, singleWordParam, stringParam]) => {
    // You can use "Cucumber Expressions" instead of regex to get the parameters in the desired types.
    // It's also possible to add custom parameter types if needed.
    await t.expect(typeof intParam).eql('number');
  }
);
```

<sup>2</sup> You need to install [Cucumber.js](https://github.com/cucumber/cucumber-js) as a dependency (see [Installation](#installation)).

It is worth noting, that for the test runner, `Given`, `When` and `Then` are the same thing.
You can define

```js
Given(/some step/, async (t) => {
  // Test code
});
```

and use it as

```gherkin
When some step
```

Please refer to the [examples directory](./examples) for more examples.

## Supported gherkin features and limitations

This package supports a wide range of gherkin features.
Most notable features are:

- Features (Gherkin `feature` keyword): Will be transformed into a [TestCafé fixture](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html#fixtures).
- Scenarios (Gherkin `scenario` keyword): Will be transformed into a [TestCafé test](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html#tests).
- Backgrounds (Gherkin `background` keyword): Background steps are prepended to Scenario/ Scenario outline steps. `Before` hooks are run before background steps.
- Scenario outlines (Gherkin `Scenario Outline` and `Examples` keywords): Will transform every example into on [TestCafé test](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html#tests).
- Tags/ Hooks: See [Tags](#tags) and [Hooks](#hooks).
- [Cucumber Expressions](#cucumber-expressions)

### Tags

Scenarios can be tagged using [Gherkin's @-notation](https://docs.cucumber.io/cucumber/api/#tags).
The runner can then be configured to filter scenarios to be run based on these tags.
The tags will be evaluated in such a way that scenarios that have any of the including tags (begins with @)
but none of the excluding tags (begins with ~@) will be run.

Examples:

```
    runner.tags(['@TAG']) // Will run all scenarios marked with @TAG

    runner.tags(['~@TAG']) // Will run all scenarios that are not marked with @TAG

    runner.tags(['@TAG', '~@OTHER_TAG']) // Will run all scenarios that are marked with @TAG but not with @OTHER_TAG

    runner.tags(['@TAG', '@OTHER_TAG']) // Will run all scenarios that are marked with @TAG or with @OTHER_TAG

    runner.tags(['@TAG and @OTHERTAG']) // Will run all scenarios that are marked with @TAG and with @OTHER_TAG
```

**Note:** Do not set `--tags` CLI parameter when running tests through the programming interface as it is internally used to pass the selected tags to the gherkin compiler.

### Cucumber Expressions

Besides using Regular Expressions, you can also use [Cucumber Expressions](https://cucumber.io/docs/cucumber/cucumber-expressions/) in your steps, and have support for [Optional text](https://cucumber.io/docs/cucumber/cucumber-expressions/#optional-text), [Alternative text](https://cucumber.io/docs/cucumber/cucumber-expressions/#alternative-text) and getting parameters in their desired types. The [Cucumber built-in parameter types](https://cucumber.io/docs/cucumber/cucumber-expressions/#parameter-types) are supported by default.

It's also possible to add custom parameter types by creating a file that exports a `cucumberExpressions.ParameterTypeRegistry`, and passing this file's path to the CLI with `--param-type-registry-file` or to the Programming interface with the `parameterTypeRegistryFile` method.

Example:

1.  Create a _ParameterTypeRegistry_ (e.g. _myCustomParamRegistry.js_):

    ```js
    import { ParameterTypeRegistry, ParameterType } from '@cucumber/cucumber-expressions';

    class Color {
      constructor(name) {
        this.name = `${name} color`;
      }
    }

    const registry = new ParameterTypeRegistry();

    registry.defineParameterType(
      new ParameterType(
        'color', // name of the parameter
        /red|blue|yellow/, // regexp used to match
        Color, // the parameter's type
        (name) => new Color(name) // transformer function
      )
    );

    module.exports = registry;
    ```

2.  Use it in a step:

        When I am searching for the blue color on Google

3.  Retrieve the value in the step implementation:

    ```js
    When('I am searching for the {color} color on Google', async (t, [color]) => {
      console.log(color.name); // blue color
    });
    ```

4.  Configure the _runner_ to use your custom _ParameterTypeRegistry_:

    ```js
    runner.parameterTypeRegistryFile('./myCustomParamRegistry.js');
    ```

    **Note:** Do not set `--param-type-registry-file` CLI parameter when running tests through the programming interface as it is internally used to pass the path of the _ParameterTypeRegistry_ file to the gherkin compiler.

Please refer to the [examples directory](./examples), and the official [Cucumber Expressions](https://cucumber.io/docs/cucumber/cucumber-expressions/) documentation for more details.

### Hooks

In contrast to [Cucumber.js' hooks](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md), they are implemented differently in this package.
Hooks in this package are always asynchronous.
Instead of taking a callback parameter to end the hook, this package's hooks return a promise.
Once this promise fulfills, the hook is considered done.
The order of hook execution is not guaranteed to follow any rules.
So be careful when using multiple hooks for the same scenario.

#### `Before` and `After`

Before/After hooks run before or after each test (i.e. scenario).
Each hook implementation gets TestCafé's test controller object as a parameter.

```js
import { Before } from '@cucumber/cucumber';

Before('@tag1', async (t) => {
  // do something
  // e.g. write to t.ctx or read from t.fixtureCtx
});
```

Untagged hooks are run before/ after each test.

#### `BeforeAll` and `AfterAll`

BeforeAll/AfterAll hooks run before or after each fixture (i.e. feature).
Each hook implementation gets TestCafé's fixture context.
See [Sharing Variables Between Fixture Hooks and Test Code](https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html#sharing-variables-between-fixture-hooks-and-test-code) documentation for more details.

```js
import { BeforeAll } from '@cucumber/cucumber';

BeforeAll(async (ctx, meta) => {
  // do something with the context and/or the meta
});
```

### Data tables

When steps have a data table, they are passed an object with methods that can be used to access the data.

- with column headers
  - `hashes`: returns an array of objects where each row is converted to an object (column header is the key)
  - `rows`: returns the table as a 2-D array, without the first row
- without column headers
  - `raw`: returns the table as a 2-D array
  - `rowsHash`: returns an object where each row corresponds to an entry (first column is the key, second column is the value)

See the [examples directory](./examples) for an example.

### Step reporting

By default, the reporter used by TestCafé is `spec`.
TestCafé has no reason to handle the concept of "step" because it's a notion that is specific to gherkin.

To work around that:

- The metadata of a `test` now contains the full list of steps that compose the `scenario` it's based on.
  In case of failure of a step, its index is also added to the metadata.
- A custom reporter (`gtc-reporter-spec`) has been added to the project.
  It is automatically used instead of spec as the default reporter for `gherkin-testcafe`.
  Note that `spec` remains usable by simply using the `reporter` option provided by TestCafé:
  `bash gherkin-testcafe chrome ./tests/* --reporter spec `
  If you use the API,
  `js runner.reporter("spec") `
- Custom internal reporters have also been created based on `list` and `minimal`.
  The gtc reporters behave in exactly the same way as their TestCafé counterparts, except that the steps are part of the
  output, with highlighing indicating which ones succeeded, which ones failed, and which ones didn't run.
  `diff + ✓ Given some step that succeeded - ✖ When some step that failed # - Then some step that didn't run `

      To use one of this package's internal reporters, use its name in the reporter option:
      ```bash
      gherkin-testcafe chrome ./tests/* --reporter gtc-reporter-list
      gherkin-testcafe chrome ./tests/* --reporter gtc-reporter-minimal
      gherkin-testcafe chrome ./tests/* --reporter gtc-reporter-spec # unnecessary as it is the default behavior
      ```

Note that other official reporters could be adapted in the future.

#### Implement / Adapt a custom reporter

If you are using a [custom reporter](https://testcafe.io/documentation/402810/guides/extend-testcafe/reporter-plugin)
and want to use or display the step information, all you need to do is access the metadata from your reporter's methods.

Fortunately, accessing metadata is [built-in behavior](https://testcafe.io/documentation/402810/guides/extend-testcafe/reporter-plugin#implement-the-reporter) for normal TestCafé reporters:
TestCafé will pass the metadata object to your test reporting function as the third argument.

The properties that are dedicated to this feature are `steps` and `failIndex`.
Each step in the `steps` array has two properties: `type` and `text`.

Representation:

```json
{
    "failIndex": 2,
    "steps": [
        { "type": "Context", "keyword": "Given", "prefix": "Background", "text": "some background step"}
        { "type": "Context", "keyword": "Given", "text": "some step that succeeded"},
        { "type": "Action", "keyword": "When", "text": "some step that failed"},
        { "type": "Action", "keyword": "And", "text": "some step that didn't run"},
        { "type": "Outcome", "keyword": "Then", "text": "some other step that didn't run"}
    ]
}
```

Usage example:

```js
const reportTestDone = function (name, testRunInfo, meta) {
    meta.steps.forEach((step, index) => {
        let color;
        let symbol;
        if (index < meta.failIndex) {
            color = 'green';
            symbol = this.symbols.ok;
        } else if (index === meta.failIndex) {
            color = 'red';
            symbol = this.symbols.err;
        } else {
            color = 'grey';
            symbol = '-';
        }
        this.write(this.chalk[color](symbol));
        if (step.prefix) {
            this.write(this.chalk.white(`${step.prefix}:`));
        }
        this.write(this.chalk[color](`${step.keyword}${step.text}`));
        this.newline();
    });
},
```

## Using Typescript and ESnext features

With `gherkin-testcafe`, you can use Typescript and ESnext features (like es module import statements) the same way you can use them in regular TestCafé tests.
In fact, it actually uses TestCafé's compilers to compile Typescript and ESNext files.

Please refer to [TestCafé's Typescript support manual page](https://devexpress.github.io/testcafe/documentation/test-api/typescript-support.html) to see how you can customize compiler options and which compiler options are used by default.

Please make sure **not** to install `@types/cucumber`!
`gherkin-testcafe` will provide types for the `cucumber` module.

Unfortunately, you cannot define your custom parameter types registry file in Typescript or with ESnext features.

## Contributing

- The release branch is `master`.
- The development branch is `develop`.

Always create your new branch from `develop`.

I'd appreciate if you would use `git flow` (or follow its naming conventions)
but it's not mandatory.

Commits will generally not be accepted if they have not been properly formatted.

### Commits

The package has `commitizen` as a dev dependency.
To create the proper commit, use `yarn gitcommit` and follow the prompts.

Do not hesitate to create an issue if you need help.

### Releases

The package has `standard-version` as a dev dependency. It makes version
management pretty easy, as long as commits have been properly formatted (hence
the obligation to use `commitizen`)
