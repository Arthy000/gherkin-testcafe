const { Then } = require('@cucumber/cucumber');

Then('I should output the name of the scenario', (t) => {
    console.log('Executed scenario', t.testRun.test.name);
});
