import { AfterAll, BeforeAll } from '@cucumber/cucumber';

let finishedFeaturesCount = 0;

BeforeAll(async (ctx, meta) => {
  console.log('Preparing feature:', meta.name);
  // set the fixtureCtx for all the scenarios included in the feature
  ctx.featureName = meta.name;
  ctx.afterHooksCounter = 0;
  ctx.finishedFeaturesCount = finishedFeaturesCount;
});

AfterAll(async (ctx, meta) => {
  const expectedCount = 3;
  if (meta.name === 'Hooks feature 2' && ctx.afterHooksCounter !== expectedCount) {
    throw new Error(`The After hooks ran ${ctx.afterHooksCounter} times instead of ${expectedCount}`);
  }
  finishedFeaturesCount += 1;
  console.log('Cleaning after feature:', meta.name);
});
