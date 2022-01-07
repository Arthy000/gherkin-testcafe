import { Given, Then } from '@cucumber/cucumber';
import { Selector } from 'testcafe';

Given('I opened TestCafe demo page', async (t) => {
  await t.navigateTo('https://devexpress.github.io/testcafe/example/');
});

Then('I should see the following page subtitle', async (t, [], _, docString) => {
  await t.expect(Selector('header > p').textContent).contains(docString);
});
