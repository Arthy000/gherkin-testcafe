const CliArgumentParser = require('testcafe/lib/cli/argument-parser');

module.exports = class GherkinTestcafeCliArgumentParser extends CliArgumentParser {
  _describeProgram() {
    super._describeProgram();

    this.program._name = 'gherkin-testcafe';

    this.program.option(
      '--tags <tag[,tag2,...]>',
      'specify a list of tags to filter the tests by. Negate tags with ~ to exclude all scenarios with that tag',
      val => (val ? val.split(',') : val)
    );

    this.program.option(
      '--param-type-registry-file <file path>',
      'relative path to a file that exports a "cucumberExpressions.ParameterTypeRegistry" object'
    );

    this.program.option(
      '--dry-run',
      'start gherkin-testcafe in dry-run mode, this will output any step without a matching definition'
    );
  }
};
