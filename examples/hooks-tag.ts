import { After, Before } from '@cucumber/cucumber';
import { afterTags, beforeTags, bothTags } from './hooks-const';

const allBeforeTags = [...beforeTags, ...bothTags];
const allAfterTags = [...afterTags, ...bothTags];

allBeforeTags.forEach((fullTag) =>
  Before(`@${fullTag}`, async (t: TestController) => {
    t.ctx[fullTag] = true;
  })
);

allAfterTags.forEach((fulltag) => {
  After(`@${fulltag}`, async (t: TestController) => {
    t.testRun.fixtureCtx.afterHooksCounter += 1;
  });
});
