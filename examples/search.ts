import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Selector as NativeSelector } from 'gherkin-testcafe';

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

// this CSS Selector will probably change often but I don't see any other way,
// except the full path which might be even more unstable
const privacyModale = '#xe7COe';

/* HOOKS */

Before('@searchHook', async (t: TestController) => {
  t.ctx.hookValue = 'GitHub';
});

/* PREREQUISITES */

Given('I opened a search page', async (t: TestController) => {
  // Google blocks my tests now :(
  await t.navigateTo('https://duckduckgo.com');
});

/* ACTIONS */

When(/^I type my search request "(.+)"$/, async (t: TestController, [searchRequest]: string[]) => {
  await search(t, searchRequest);
});

When(/^I type my search request$/, async (t: TestController) => {
  await search(t);
});

When(/^I press the "(.+)" key$/, async (t: TestController, [key]: string[]) => {
  await t.pressKey(key);
});

/* ASSERTIONS */

Then(/^I should see that the first result is "(.+)"$/, async (t: TestController, [expectedSearchResult]: string[]) => {
  await expectResult(t, expectedSearchResult);
});

Then(/^I should see that the first result is as expected$/, async (t: TestController) => {
  await expectResult(t);
});

/* HELPERS */

// reusing logic example
const search = async (t: TestController, search?: string) => {
  const input = Selector('[name="q"]', t);
  const searchKeyword = search || t.ctx.hookValue;

  await t
    .expect(searchKeyword)
    .ok()
    .typeText(input, search || t.ctx.hookValue);
};

const expectResult = async (t: TestController, result?: string) => {
  const firstLink = Selector("section[data-testid='mainline']", t).find('article h2 a span');
  const searchResult = result || t.ctx.hookValue;

  await t.expect(searchResult).ok().expect(firstLink.innerText).contains(searchResult);
};
