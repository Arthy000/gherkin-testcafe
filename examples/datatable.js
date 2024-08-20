import { Given, When, Then } from '@cucumber/cucumber';
import { Selector as NativeSelector } from 'gherkin-testcafe';

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

Given("I opened TestCafe's demo page", async (t) => {
  await t.navigateTo('https://devexpress.github.io/testcafe/example/');
});

When('I click on 5 checkboxes', async (t, [], table) => {
  for (const { checkboxId } of table.hashes()) {
    await t.click('#' + checkboxId);
  }
});

Then(/^the amount of selected checkboxes should be "(.+)"$/, async (t, [amount]) => {
  const selectedCheckboxes = Selector('input[type="checkbox"]').filter((checkbox) =>
    Boolean(checkbox && checkbox.checked),
  );

  await t.expect(selectedCheckboxes.count).eql(Number(amount));
});
