import { Given, Then } from '@cucumber/cucumber';

import { AFTER_PREFIX, BEFORE_PREFIX, beforeTags, afterTags, bothTags } from './hooks-const';

/* PREREQUISITES */

Given(/a (BeforeAll|AfterAll) hook is defined/, async (t: TestController) => {
  // NOTE: nothing to do here as there is no way to check for global hooks being implemented
});

Given(/the scenario has no tags/, async (t: TestController) => {
  const testTags: string[] = getTagsFromMeta(t);
  // fails if any tag is added to the scenario
  await t.expect(testTags.length).eql(0, `At least one tag (${testTags}) is attached to the scenario`);
});

Given(/the scenario has a tag linked to a Before hook/, async (t: TestController) => {
  // fails in any case except a single tag that contains "before"
  const testTags: string[] = getTagsFromMeta(t);
  await t
    .expect(testTags.length)
    .eql(1, `Tag count is ${testTags.length}`)
    .expect(beforeTags)
    .contains(testTags[0], `${testTags[0]} doesn't exist in the hooks-tag file`);
});

Given(/the scenario has one tag linked to a Before hook/, async (t: TestController) => {
  // fails in any case except a single tag that contains "before"
  const testTags: string[] = getTagsFromMeta(t).filter((tag) => tag.includes(BEFORE_PREFIX));
  await t
    .expect(testTags.length)
    .eql(1, `Tag count is ${testTags.length}`)
    .expect(beforeTags)
    .contains(testTags[0], `${testTags[0]} doesn't exist in the hooks-tag file`);
});

Given(/the scenario has one tag linked to an After hook/, async (t: TestController) => {
  // fails in any case except a single tag that contains "before"
  const testTags: string[] = getTagsFromMeta(t).filter((tag) => tag.includes(AFTER_PREFIX));
  await t
    .expect(testTags.length)
    .eql(1, `Tag count is ${testTags.length}`)
    .expect(afterTags)
    .contains(testTags[0], `${testTags[0]} doesn't exist in the hooks-tag file`);
});

Given(/the scenario has a tag linked to an After hook/, async (t: TestController) => {
  // fails in any case except a single tag that contains "after"
  const testTags: string[] = getTagsFromMeta(t);
  await t
    .expect(testTags.length)
    .eql(1, `Tag count is ${testTags.length}`)
    .expect(afterTags)
    .contains(testTags[0], `${testTags[0]} doesn't exist in the hooks-tag file`);
});

Given(/the scenario has several tags linked to Before hooks/, async (t: TestController) => {
  // Cause the test to fail if the number of tags is less than 2
  const testTags: string[] = getTagsFromMeta(t);
  await t.expect(testTags.length).gte(2, `Tag count is ${testTags.length}`);

  await Promise.all(
    testTags.map(async (tag) => t.expect(beforeTags).contains(tag, `${tag} doesn't exist in the hooks-tag file`))
  );
});

Given(/the scenario has a tag linked to a Before and an After hook/, async (t: TestController) => {
  // fails in any case except a single tag that contains "both"
  const testTags: string[] = getTagsFromMeta(t);
  await t
    .expect(testTags.length)
    .eql(1, `Tag count is ${testTags.length}`)
    .expect(bothTags)
    .contains(testTags[0], `${testTags[0]} doesn't exist in the hooks-tag file`);
});

/* ASSERTIONS */

Then(/the BeforeAll hook should have run before any scenario/, async (t: TestController) => {
  const fixtureName = t.testRun.test.fixture.name;
  // fixtureCtx.featureName is set by the BeforeAll hook (see hooks-global.ts)
  // Will cause the test to fail if the BeforeAll hook hasn't run
  await t
    .expect(fixtureName)
    .ok("fixtureName doesn't exist in the test object")
    .expect(fixtureName)
    .contains(t.fixtureCtx.featureName, `featureName is not properly set to the current feature name`);
});

Then(/the AfterAll hook should have run after the previous feature/, async (t: TestController) => {
  // cause the test to fail if the featureCounter hasn't been initialized yet
  const { finishedFeaturesCount } = t.testRun.fixtureCtx;
  await t
    .expect(typeof finishedFeaturesCount)
    .eql('number', `The finishedFeatureCount is of type ${typeof finishedFeaturesCount} instead of number`)
    .expect(finishedFeaturesCount)
    .gt(0, "No feature was finished or AfterAll didn't run");
});

Then(/no tagged hook should run/, async (t: TestController) => {
  const contextKeys = Object.keys(t.ctx);
  const beforeHookTrackers = contextKeys.filter((contextKey) => contextKey.includes(BEFORE_PREFIX));
  const afterHookTrackers = contextKeys.filter((contextKey) => contextKey.includes(AFTER_PREFIX));
  await t.expect(beforeHookTrackers.length).eql(0, `${beforeHookTrackers} hooks have run`);
  await t.expect(afterHookTrackers.length).eql(0, `${afterHookTrackers} hooks have run`);
});

Then(/the linked Before hook should have run/, async (t: TestController) => {
  // Cause the test to fail if no before hook ran or if the wrong one did
  const selectedHook = Object.keys(t.ctx).filter((contextKey) => contextKey.includes(BEFORE_PREFIX));
  const testTags = getTagsFromMeta(t);
  await t
    .expect(selectedHook.length)
    .eql(
      1,
      `${selectedHook.length || 'No'} "${BEFORE_PREFIX}" key ${
        selectedHook.length > 1 ? 'were' : 'was'
      } found in the context`
    )
    .expect(testTags)
    .contains(selectedHook[0], `${selectedHook[0]} is not associated to the current scenario`);
});

Then(/the linked After hook should run/, async (t: TestController) => {
  // NOTE: cannot be tested in the current test because the hooks runs after it
  // Instead the AfterAll hook checks if the After hook ran the correct amount of times
});

Then(/the linked Before hooks should have run/, async (t: TestController) => {
  // Cause the test to fail if no before hook ran
  const selectedHooks = Object.keys(t.ctx).filter((contextKey) => contextKey.includes(BEFORE_PREFIX));
  await t.expect(selectedHooks.length).gt(0, `No key containing ${BEFORE_PREFIX} was found in the context`);

  const testTags: string[] = getTagsFromMeta(t);

  await Promise.all(
    testTags.map(async (tag) => t.expect(selectedHooks).contains(tag, `The hook associated to ${tag} hasn't run`))
  );
});

/* HELPERS */
const getTagsFromMeta = (t: TestController): string[] => {
  return t.testRun.test.meta.tags
    .split(',')
    .filter((tag) => tag)
    .map((tag) => tag.replace('@', ''));
};
