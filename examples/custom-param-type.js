import { When, Then } from '@cucumber/cucumber';
import { Selector as NativeSelector } from 'gherkin-testcafe';

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t });
};

When('I search for the "{color}" color on Google', async (t, [color]) => {
  t.ctx.selectedColor = color;
  const input = Selector('[name="q"]', t);
  await t.typeText(input, `${color.name} code`);
});

Then('I should see the corresponding code in the page', async (t) => {
  const selectedColor = t.ctx.selectedColor;
  const result = Selector('div[data-tts="answers"]>div', t);
  await t.expect(result.innerText).contains(selectedColor.code);
});
