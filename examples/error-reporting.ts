import { Given, When } from '@cucumber/cucumber';

// looks like Cucumber doesn't have translated function
Given(/j'ai défini mon test dans un autre language/, async (t: TestController) => {
  await t.wait(2500);
});

When(/mon test échoue/, async (t: TestController) => {
  await t.expect(true).notOk();
});

When(/I try to click on a component that doesn't exist/, async (t: TestController) => {
  await t.click('span > div > span > input > div > span');
});
