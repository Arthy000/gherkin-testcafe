const { Then } = require('@cucumber/cucumber');

Then('I should output why I was included', () => {
  const tagsArg = process.argv[process.argv.findIndex((arg) => arg === '--tags') + 1];

  const reasonMapping = {
    '@scenarioTag1': 'it had @scenarioTag1',
    '~@scenarioTag1': "it didn't have @scenarioTag1",
    '@scenarioTag1,@scenarioTag2': 'it had @scenarioTag1, @scenarioTag2, or both',
    '@scenarioTag1 and @scenarioTag2': 'it had both @scenarioTag1 and @scenarioTag2',
    '@scenarioTag1,~@scenarioTag2': 'it had @scenarioTag1 but not @scenarioTag2',
    '@scenarioTag1 and ~@scenarioTag2,@scenarioTag2 and ~@scenarioTag1':
      'it had @scenarioTag1 or @scenarioTag2, but not both',
  };

  console.log('This scenario ran because', reasonMapping[tagsArg]);
});
