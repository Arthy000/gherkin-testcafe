const gherkin = require('gherkin');
const Fixture = require('testcafe/lib/api/structure/fixture');
const Test = require('testcafe/lib/api/structure/test');
const { GeneralError } = require('testcafe/lib/errors/runtime');
const { RUNTIME_ERRORS } = require('testcafe/lib/errors/types');
const { supportCodeLibraryBuilder } = require('cucumber');
const DataTable = require('cucumber/lib/models/data_table').default;
const testRunTracker = require('testcafe/lib/api/test-run-tracker');
const cucumberExpressions = require('cucumber-expressions');
const TestcafeESNextCompiler = require('testcafe/lib/compiler/test-file/formats/es-next/compiler');
const TestcafeTypescriptCompiler = require('testcafe/lib/compiler/test-file/formats/typescript/compiler');
const CustomizableCompilers = require('testcafe/lib/configuration/customizable-compilers');
const { readFileSync } = require('fs');
const chalk = require('chalk');

const AND_SEPARATOR = ' and ';

const getTags = () => {
  const tagsIndex = process.argv.findIndex(val => val === '--tags');
  if (tagsIndex !== -1) {
    return process.argv[tagsIndex + 1]
      .split(',')
      .map(tag => (tag.includes(AND_SEPARATOR) ? tag.split(AND_SEPARATOR) : tag));
  }

  return [];
};

const getParameterTypeRegistry = () => {
  const parameterTypeRegistryIndex = process.argv.findIndex(val => val === '--param-type-registry-file');

  if (parameterTypeRegistryIndex !== -1) {
    const parameterTypeRegistryFilePath = process.argv[parameterTypeRegistryIndex + 1];
    const absFilePath = require.resolve(parameterTypeRegistryFilePath, {
      paths: [process.cwd()]
    });
    return require(absFilePath);
  }

  return new cucumberExpressions.ParameterTypeRegistry();
};

module.exports = class GherkinTestcafeCompiler {
  constructor(sources, compilerOptions) {
    this.stepFiles = sources.filter(source => source.endsWith('.js') || source.endsWith('.ts'));
    this.specFiles = sources.filter(source => source.endsWith('.feature'));

    this.stepDefinitions = [];

    this.afterHooks = [];
    this.beforeHooks = [];
    this.beforeAllHooks = [];
    this.afterAllHooks = [];

    this.tags = getTags();
    this.cucumberExpressionParamRegistry = getParameterTypeRegistry();
    this.externalCompilers = [
      new TestcafeESNextCompiler(),
      new TestcafeTypescriptCompiler(compilerOptions[CustomizableCompilers.typescript])
    ];
  }

  _streamToArray(readableStream) {
    return new Promise((resolve, reject) => {
      const items = [];
      readableStream.on('data', items.push.bind(items));
      readableStream.on('error', reject);
      readableStream.on('end', () => resolve(items));
    });
  }

  async _loadSpecs(specFile) {
    const gherkinResult = await this._streamToArray(gherkin.fromPaths([specFile]));

    const testFile = { filename: specFile, collectedTests: [] };
    const fixture = new Fixture(testFile);

    const { gherkinDocument } = gherkinResult[1];

    if (!gherkinDocument) {
      throw new Error(
        [
          'Failed to parse feature file ' + specFile,
          ...gherkinResult
            .filter(({ attachment }) => Boolean(attachment))
            .map(({ attachment }) => attachment.source.uri + attachment.data)
        ].join('\n')
      );
    }
    return { gherkinResult, gherkinDocument, testFile, fixture };
  }

  _findStepDefinition(step) {
    for (const stepDefinition of this.stepDefinitions) {
      const [isMatched] = this._shouldRunStep(stepDefinition, { text: step });
      if (isMatched) {
        return true;
      }
    }
    return false;
  }

  async _dryRun() {
    const featureStepsArray = await Promise.all(
      this.specFiles.map(async specFile => {
        const { gherkinResult, gherkinDocument } = await this._loadSpecs(specFile);

        const featureTitle = `Feature: ${gherkinDocument.feature.name}`;
        const featureSteps = [];
        gherkinResult.forEach(({ pickle: scenario }) => {
          if (scenario) {
            scenario.steps.forEach(step => {
              if (featureSteps.every(stepText => stepText !== step.text)) {
                featureSteps.push(step.text);
              }
            });
          }
        });

        const missingFeatureSteps = featureSteps.filter(step => !this._findStepDefinition(step));

        return { featureTitle, featureSteps, missingFeatureSteps };
      })
    );

    featureStepsArray.map(({ featureTitle, featureSteps, missingFeatureSteps }) => {
      const color = missingFeatureSteps.length === 0 ? 'green' : 'red';
      console.log(`\n   ${featureTitle}`);
      console.log(
        `     Steps: ${chalk[color](`${featureSteps.length - missingFeatureSteps.length}/${featureSteps.length}`)}`
      );
      if (missingFeatureSteps.length) {
        console.log(
          `     Missing steps:`,
          chalk.red(missingFeatureSteps.reduce((acc, cur) => `${acc}\n        ${cur}`, ''))
        );
      }
    });
  }

  async getTests() {
    await this._loadStepDefinitions();

    const dryRun = process.argv.findIndex(val => val === '--dry-run') !== -1;

    if (dryRun) {
      await this._dryRun();
      process.exit(0);
    }

    let tests = await Promise.all(
      this.specFiles.map(async specFile => {
        const { gherkinResult, gherkinDocument, testFile, fixture } = await this._loadSpecs(specFile);

        fixture(`Feature: ${gherkinDocument.feature.name}`)
          .before(ctx => this._runFeatureHooks(ctx, this.beforeAllHooks))
          .after(ctx => this._runFeatureHooks(ctx, this.afterAllHooks))
          .meta(
            'tags',
            `${
              gherkinDocument.feature.tags.length > 0
                ? gherkinDocument.feature.tags.map(tag => tag.name).reduce((acc, cur) => `${acc},${cur}`)
                : ''
            }`
          );

        gherkinResult.forEach(({ pickle: scenario }) => {
          if (!scenario || !this._shouldRunScenario(scenario)) {
            return;
          }

          const test = new Test(testFile);
          test(`Scenario: ${scenario.name}`, async t => {
            let error;

            try {
              for (const step of scenario.steps) {
                await this._resolveAndRunStepDefinition(t, step);
              }
            } catch (e) {
              error = e;
            }

            if (error) {
              throw error;
            }
          })
            .page('about:blank')
            .before(t => this._runHooks(t, this._findHook(scenario, this.beforeHooks)))
            .after(t => this._runHooks(t, this._findHook(scenario, this.afterHooks)))
            .meta(
              'tags',
              scenario.tags.length > 0 ? scenario.tags.map(tag => tag.name).reduce((acc, cur) => `${acc},${cur}`) : ''
            );
        });

        return testFile.collectedTests;
      })
    );

    tests = tests.reduce((agg, cur) => agg.concat(cur));

    if (this.filter) {
      tests = tests.filter(test => this.filter(test.name, test.fixture.name, test.fixture.path));
    }

    if (!tests.length) {
      throw new GeneralError(RUNTIME_ERRORS.noTestsToRun);
    }

    return tests;
  }

  async _loadStepDefinitions() {
    supportCodeLibraryBuilder.reset(process.cwd());

    const compilerResult = this.externalCompilers.map(async externalCompiler => {
      const testFiles = this.stepFiles.filter(filename => {
        let supportedExtensions = externalCompiler.getSupportedExtension();

        if (!Array.isArray(supportedExtensions)) {
          supportedExtensions = [supportedExtensions];
        }

        for (const extension of supportedExtensions) {
          if (filename.endsWith(extension)) {
            return true;
          }
        }

        return false;
      });

      const compiledCode = await externalCompiler.precompile(
        testFiles.map(filename => {
          const code = readFileSync(filename, 'utf-8');

          return { code, filename };
        })
      );

      testFiles.forEach((filename, index) => {
        externalCompiler.execute(compiledCode[index], filename);
      });
    });

    await Promise.all(compilerResult);

    supportCodeLibraryBuilder.options.parameterTypeRegistry = this.cucumberExpressionParamRegistry;
    const finalizedStepDefinitions = supportCodeLibraryBuilder.finalize();
    this.afterHooks = finalizedStepDefinitions.afterTestCaseHookDefinitions;
    this.afterAllHooks = finalizedStepDefinitions.afterTestRunHookDefinitions;
    this.beforeHooks = finalizedStepDefinitions.beforeTestCaseHookDefinitions;
    this.beforeAllHooks = finalizedStepDefinitions.beforeTestRunHookDefinitions;
    this.stepDefinitions = finalizedStepDefinitions.stepDefinitions;
  }

  _resolveAndRunStepDefinition(testController, step) {
    for (const stepDefinition of this.stepDefinitions) {
      const [isMatched, parameters, table] = this._shouldRunStep(stepDefinition, step);
      if (isMatched) {
        return this._runStep(stepDefinition.code, testController, parameters, table);
      }
    }

    throw new Error(`Step implementation missing for: ${step.text}`);
  }

  _runStep(step, testController, parameters, table) {
    const markedFn = testRunTracker.addTrackingMarkerToFunction(testController.testRun.id, step);

    testRunTracker.ensureEnabled();

    return markedFn(testController, parameters, table);
  }

  _findHook(scenario, hooks) {
    return hooks.filter(hook => !hook.options.tags || scenario.tags.find(tag => tag.name === hook.options.tags));
  }

  async _runHooks(testController, hooks) {
    for (const hook of hooks) {
      await this._runStep(hook.code, testController, []);
    }
  }

  async _runFeatureHooks(fixtureCtx, hooks) {
    for (const hook of hooks) {
      await hook.code(fixtureCtx);
    }
  }

  _shouldRunScenario(scenario) {
    return (
      this._scenarioHasAnyOfTheTags(scenario, this._getIncludingTags(this.tags)) &&
      this._scenarioLacksTags(scenario, this._getExcludingTags(this.tags))
    );
  }

  _getCucumberDataTable(step) {
    if (step.argument && step.argument.dataTable) return new DataTable(step.argument.dataTable);
    else if (step.dataTable) return new DataTable(step.dataTable);
    else return null;
  }

  _shouldRunStep(stepDefinition, step) {
    if (typeof stepDefinition.pattern === 'string') {
      const cucumberExpression = new cucumberExpressions.CucumberExpression(
        stepDefinition.pattern,
        this.cucumberExpressionParamRegistry
      );

      const matchResult = cucumberExpression.match(step.text);
      return matchResult
        ? [true, matchResult.map(r => r.getValue()), this._getCucumberDataTable(step)]
        : [false, [], this._getCucumberDataTable(step)];
    } else if (stepDefinition.pattern instanceof RegExp) {
      const match = stepDefinition.pattern.exec(step.text);
      return [Boolean(match), match ? match.slice(1) : [], this._getCucumberDataTable(step)];
    }

    const stepType = step.text instanceof Object ? step.text.constructor.name : typeof step.text;

    throw new Error(`Step implementation invalid. Has to be a string or RegExp. Received ${stepType}`);
  }

  _getIncludingTags(tags) {
    return tags.filter(tag => (Array.isArray(tag) ? true : !tag.startsWith('~')));
  }

  _getExcludingTags(tags) {
    return tags
      .filter(tag => (Array.isArray(tag) ? false : tag.startsWith('~')))
      .map(tag => (!Array.isArray(tag) && tag.startsWith('~') ? tag.slice(1) : tag));
  }

  _scenarioHasAnyOfTheTags(scenario, tags) {
    const scenarioTagsList = scenario.tags.map(tag => tag.name);

    return (
      !tags.length ||
      tags.some(tag => {
        return Array.isArray(tag) ? this._scenarioHasAllOfTheTags(scenario, tag) : scenarioTagsList.includes(tag);
      })
    );
  }

  _scenarioLacksTags(scenario, tags) {
    return !tags.length || !this._scenarioHasAnyOfTheTags(scenario, tags);
  }

  _scenarioHasAllOfTheTags(scenario, tags) {
    const scenarioTagsList = scenario.tags.map(tag => tag.name);

    return tags.every(tag =>
      tag.startsWith('~') ? !scenarioTagsList.includes(tag.slice(1)) : scenarioTagsList.includes(tag)
    );
  }

  static getSupportedTestFileExtensions() {
    return ['.js', '.ts', '.feature'];
  }

  static cleanUp() {}
};
