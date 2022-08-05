import { Given, When, Then } from '@cucumber/cucumber';

Given('given1-1', async (t: TestController) => {
  await t.click('someselector');
});

When('when1-1', async (t: TestController) => {});

When('when1-2', async (t: TestController) => {});

When('when1-3', async (t: TestController) => {});

Then('then1-1', async (t: TestController) => {});
