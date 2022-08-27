import { Given, When, Then } from '@cucumber/cucumber';
import { Selector as NativeSelector } from 'testcafe';

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

Then(/^The amount of selected checkboxes should be "(.+)"$/, async (t, [amount]) => {
  const selectedCheckboxes = Selector('input[type="checkbox"]').filter((checkbox) =>
    Boolean(checkbox && checkbox.checked)
  );

  const checkedCount = await selectedCheckboxes.count;

  await t.expect(checkedCount).eql(Number(amount));
});
