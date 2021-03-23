import { Given, When, Then, Before } from '@cucumber/cucumber';
import { ClientFunction, Selector as NativeSelector } from 'testcafe';

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

Before('@googleHook', async () => {
  console.log('Running Google e2e test.');
});

Given("I open Google's search page", async t => {
  await t.navigateTo('https://www.google.com');
});

When(/^I dismiss the privacy statement when it appears$/, async (t) => {
  const elem = Selector('#lb > div > div:nth-child(1)', t);
  await t.expect(elem.exists).eql(true, 'The privacy statement should be displayed', { timeout: 5000 });

  // forcefully remove as it seems google knows when an automated session is running
  await removeElement(t, '#lb');
});

When(/^I am typing my search request "(.+)" on Google$/, async (t, [searchRequest]) => {
  const input = Selector('[name="q"]', t);

  await t.typeText(input, searchRequest);
});

When(/^I am pressing "(.+)" key on Google$/, async (t, [key]) => {
  await t.pressKey(key);
});

Then(/^I should see that the first Google's result is "(.+)"$/, async (t, [expectedSearchResult]) => {
  const firstLink = Selector('#rso', t).find('a');

  await t.expect(firstLink.innerText).contains(expectedSearchResult);
});

async function removeElement(t, elementSelector) {
  await ClientFunction((elementSelector) => {
    const element = document.querySelector(elementSelector);
    element.parentNode.removeChild(element);
  }).with(t)(elementSelector);
}

