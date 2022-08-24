const NEW_LINE = '\n ';

const _renderErrors = function () {
  this.newline();

  this.errDescriptors.forEach((errDescriptor) => {
    const title = `${this.chalk.bold.red(this.symbols.err)} ${errDescriptor.fixtureName} - ${errDescriptor.testName}`;

    this.setIndent(1).useWordWrap(true).newline().write(title);

    this.setIndent(2);
    errDescriptor.steps.forEach((step) => this.newline().write(step));

    this.newline().newline().setIndent(3).write(this.formatError(errDescriptor.err)).newline().newline();
  });
};

const _renderWarnings = function (warnings) {
  this.newline()
    .setIndent(1)
    .write(this.chalk.bold.yellow(`Warnings (${warnings.length}):`))
    .newline();

  warnings.forEach((msg) => {
    this.setIndent(1).write(this.chalk.bold.yellow(`--`)).newline().setIndent(2).write(msg).newline();
  });
};

const reportTaskStart = function (_, userAgents, testCount) {
  this.testCount = testCount;

  this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();

  userAgents.forEach((ua) => {
    this.write(`- ${this.chalk.blue(ua)}`).newline();
  });
};

const reportFixtureStart = function (name) {
  this.currentFixtureName = name;
};

const reportTestDone = function (name, testRunInfo, meta) {
  const hasErr = !!testRunInfo.errs.length;
  let symbol = null;

  if (testRunInfo.skipped) {
    this.skipped++;
    symbol = this.chalk.cyan('-');
  } else if (hasErr) {
    symbol = this.chalk.red('!');
  } else {
    symbol = '.';
  }

  if (this.spaceLeft - 1 < 0) {
    this.spaceLeft = this.viewportWidth - NEW_LINE.length - 1;
    this.write(NEW_LINE);
  } else {
    this.spaceLeft--;
  }

  this.write(symbol);

  if (hasErr) {
    this.setIndent(2).useWordWrap(true);
    const formattedSteps = meta.steps.map((step, index) => {
      let symbol;
      let color;
      if (index < meta.failIndex) {
        color = 'green';
        symbol = this.symbols.ok;
      } else if (index === meta.failIndex) {
        color = 'red';
        symbol = this.symbols.err;
      } else {
        color = 'grey';
        symbol = '-';
      }
      return [
        this.chalk[color](symbol, ' '),
        step.prefix ? this.chalk.white(`${step.prefix}:  `) : '',
        this.chalk[color](step.keyword),
        this.chalk[color](step.text),
      ].join('');
    });

    this.errDescriptors = this.errDescriptors.concat(
      testRunInfo.errs.map((err) => {
        return {
          steps: formattedSteps,
          err: err,
          testName: name,
          fixtureName: this.currentFixtureName,
        };
      })
    );
  }
};

const reportTaskDone = function (_, passed, warnings) {
  const allPassed = !this.errDescriptors.length;
  const footer = allPassed
    ? this.chalk.bold.green(`${this.testCount} passed`)
    : this.chalk.bold.red(`${this.testCount - passed}/${this.testCount} failed`);

  if (!allPassed) {
    this._renderErrors();
  } else {
    this.newline();
  }

  this.setIndent(1).newline().write(footer).newline();

  if (this.skipped > 0) {
    this.write(this.chalk.cyan(`${this.skipped} skipped`)).newline();
  }

  if (warnings.length) {
    this._renderWarnings(warnings);
  }
};

module.exports = () => {
  return {
    noColors: false,
    spaceLeft: 0,
    errDescriptors: [],
    currentFixtureName: null,
    testCount: 0,
    skipped: 0,
    reportTaskStart,
    reportFixtureStart,
    reportTestDone,
    reportTaskDone,
    _renderErrors,
    _renderWarnings,
  };
};
