const { existsSync } = require('fs');
const { join } = require('path');
const { GeneralError } = require('testcafe/lib/errors/runtime');
const { RUNTIME_ERRORS } = require('testcafe/lib/errors/types');
const TestcafeReporter = require('testcafe/lib/reporter');
const { isReporterPluginFactory, processReporterName } = require('testcafe/lib/utils/reporter');

const requireReporterPluginFactory = (reporterName) => {
  try {
    const gherkinReporterPath = join(__dirname, 'reporters', reporterName);
    return reporterName.includes('gtc-reporter') && existsSync(gherkinReporterPath.concat('.js'))
      ? require(gherkinReporterPath)
      : require('testcafe-reporter-' + reporterName);
  } catch (err) {
    throw new GeneralError(RUNTIME_ERRORS.cannotFindReporterForAlias, reporterName);
  }
};

const getPluginFactory = (reporterFactorySource) => {
  if (!isReporterPluginFactory(reporterFactorySource)) {
    return requireReporterPluginFactory(reporterFactorySource);
  }
  return reporterFactorySource;
};

TestcafeReporter._addDefaultReporter = function (reporters) {
  reporters.push({
    name: 'gtc-reporter-spec',
    output: process.stdout,
  });
};

TestcafeReporter.getReporterPlugins = function (reporters = []) {
  if (!reporters.length) {
    TestcafeReporter._addDefaultReporter(reporters);
  }
  return Promise.all(
    reporters.map(async ({ name, output, options }) => {
      const pluginFactory = getPluginFactory(name);
      const processedName = processReporterName(name);
      const outStream = output ? await TestcafeReporter._ensureOutStream(output) : void 0;
      return {
        plugin: pluginFactory(options),
        name: processedName,
        outStream,
      };
    })
  );
};

module.exports = TestcafeReporter;
