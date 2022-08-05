const CliArgumentParser = require('testcafe/lib/cli/argument-parser');
module.exports = class GherkinTestcafeCliArgumentParser extends CliArgumentParser {
  constructor(cwd) {
    super(cwd);
    this.testCafeCommand.parent._name = 'gherkin-testcafe';
    this.testCafeCommand.parent._defaultCommandName = 'gherkin-testcafe';
    this.testCafeCommand._name = 'gherkin-testcafe';
  }
  _addTestCafeCommand() {
    return super
      ._addTestCafeCommand()
      .option(
        '--tags <tag[,tag2,...]>',
        'specify a list of tags to filter the tests by. Negate tags with ~ to exclude all scenarios with that tag',
        (val) => (val ? val.split(',') : val)
      )
      .option(
        '--param-type-registry-file <file path>',
        'relative path to a file that exports a "cucumberExpressions.ParameterTypeRegistry" object'
      )
      .option(
        '--dry-run',
        'start gherkin-testcafe in dry-run mode, this will output any step without a matching definition'
      );
  }
};
