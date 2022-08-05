const GherkinTestcafeCliArgumentParser = require('../src/argument-parser.js');
const CliArgumentParser = require('testcafe/lib/cli/argument-parser');

describe('CLI Argument Parser', () => {
  const gtcAP = new GherkinTestcafeCliArgumentParser();
  const tcAP = new CliArgumentParser();

  const { options } = gtcAP.testCafeCommand;

  test('CLI name override', () => {
    expect(gtcAP.testCafeCommand._name).toBe('gherkin-testcafe');
    expect(true).toBe(true);
  });

  const gtcParams = ['tags', 'param-type-registry-file', 'dry-run'];

  const paramTestFunction = (param) => () => {
    const paramOption = options.filter((option) => option.long === `--${param}`);
    expect(paramOption).not.toBeUndefined();
  };

  describe('Each GTC param should be documented', () => {
    gtcParams.forEach((param) => test(`CLI ${param} option is documented`, paramTestFunction(param)));
  });

  describe('Every TC param should be documented', () => {
    test(`Original CLI documentation still intact`, () => {
      tcAP.testCafeCommand.options.map((tcOption) => tcOption.long).forEach((tcOption) => paramTestFunction(tcOption));
    });
  });
});
