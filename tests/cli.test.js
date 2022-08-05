const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('CLI rewire', () => {
  test('TestCafe import rewired', async () => {
    const { stdout, stderr } = await exec('npx gherkin-testcafe -h');
    expect(stdout).toContain('Usage: gherkin-testcafe [options]');
    expect(stdout).toContain('--tags');
    expect(stdout).toContain('--param-type-registry-file');
    expect(stdout).toContain('--dry-run');
    expect(stderr).not.toContain('error');
  });
});
