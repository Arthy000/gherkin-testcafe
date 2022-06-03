require('./reporter');
require.cache[require.resolve('testcafe/lib/reporter')] = require.cache[require.resolve('./reporter')];
