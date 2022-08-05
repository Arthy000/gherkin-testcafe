const fs = require('fs');
const { join } = require('path');

const reportersPath = join(__dirname, '..', 'src', 'reporters');

const reporterTestSuite = (reporterFile) => () => {
  test('Reporter name matches GTC pattern', () => expect(reporterFile).toMatch(/^gtc-reporter-/));
  const reporterFunction = require(join(reportersPath, `${reporterFile}.js`));
  test('Reporter provides methods from TestCafe API', () => {
    expect(reporterFunction()).toHaveProperty('reportTaskStart');
    expect(reporterFunction()).toHaveProperty('reportFixtureStart');
    expect(reporterFunction()).toHaveProperty('reportTestDone');
    expect(reporterFunction()).toHaveProperty('reportTaskDone');
  });
};

const names = fs.readdirSync(reportersPath).map((file) => file.replace('.js', ''));

names.forEach((name) => {
  describe(`Reporter - ${name}`, reporterTestSuite(name));
});
