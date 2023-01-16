import { Given, When, Then, Before } from '@cucumber/cucumber';
import { Selector as NativeSelector } from '../src'; // use 'gherkin-testcafe' outside of this repository

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

// this CSS Selector will probably change often but I don't see any other way,
// except the full path which might be even more unstable
const privacyModale = '#xe7COe';

/* HOOKS */

Before('@googleHook', async (t: TestController) => {
  t.ctx.hookValue = 'GitHub';
});

/* PREREQUISITES */

Given("I opened Google's search page", async (t: TestController) => {
  await t.navigateTo('https://www.google.com');
});

Given(/^I dismissed the privacy statement when it appeared$/, async (t: TestController) => {
  const elem = Selector(privacyModale, t);
  const acceptButton = Selector('#L2AGLb > div', t);
  await t.expect(elem.exists).ok('The privacy statement should be displayed', { timeout: 5000 }).click(acceptButton);
});

/* ACTIONS */

When(/^I type my search request "(.+)" on Google$/, async (t: TestController, [searchRequest]: string[]) => {
  await searchOnGoogle(t, searchRequest);
});

When(/^I type my search request on Google$/, async (t: TestController) => {
  await searchOnGoogle(t);
});

When(/^I press the "(.+)" key$/, async (t: TestController, [key]: string[]) => {
  await t.pressKey(key);
});

/* ASSERTIONS */

Then(
  /^I should see that the first Google's result is "(.+)"$/,
  async (t: TestController, [expectedSearchResult]: string[]) => {
    await expectGoogleResult(t, expectedSearchResult);
  }
);

Then(/^I should see that the first Google's result is as expected$/, async (t: TestController) => {
  await expectGoogleResult(t);
});

/* HELPERS */

// reusing logic example
const searchOnGoogle = async (t: TestController, search?: string) => {
  const input = Selector('[name="q"]', t);
  const searchKeyword = search || t.ctx.hookValue;

  await t
    .expect(searchKeyword)
    .ok()
    .typeText(input, search || t.ctx.hookValue);
};

const expectGoogleResult = async (t: TestController, result?: string) => {
  const firstLink = Selector('#rso', t).find('a');
  const searchResult = result || t.ctx.hookValue;

  await t.expect(searchResult).ok().expect(firstLink.innerText).contains(searchResult);
};
