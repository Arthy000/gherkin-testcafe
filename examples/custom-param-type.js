import { When, Then } from '@cucumber/cucumber';
import { Selector as NativeSelector } from 'testcafe';

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

When('I search for the "{color}" color on Google', async (t, [color]) => {
  const input = Selector('[name="q"]', t);
  await t.typeText(input, `${color.name} code`);
});

Then('I should see the "{word}" result in the page', async (t, [value]) => {
  const result = Selector('div', t).withText(value);
  await t.expect(result.visible).ok();
});
