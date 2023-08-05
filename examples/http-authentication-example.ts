import { existsSync } from 'fs';
import { Given, When, Then } from '@cucumber/cucumber';
import { Selector } from 'gherkin-testcafe';

const linkSelector = Selector(
  'div.row:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(3)',
);

Given('I created an HTTP authentication file for my feature', async (t) => {
  // only works with js files at the moment
  const allowedExtentions = ['.js'];
  const foundCredentialFiles = allowedExtentions
    .map((extention) => __filename.slice(0, -3).concat('.credentials', extention))
    .filter((filename) => existsSync(filename));
  await t.expect(foundCredentialFiles.length).gt(0);
});

Given('I opened the HTTP test site', async (t) => {
  await t.navigateTo('https://authenticationtest.com/').expect(linkSelector.exists).ok();
});

When('I open the protected page', async (t) => {
  await t.click(linkSelector);
});

Then('I should reach the protected page', async (t) => {
  const titleSelector = Selector('div.container h1');
  await t.expect(titleSelector.innerText).eql('Login Success');
});
