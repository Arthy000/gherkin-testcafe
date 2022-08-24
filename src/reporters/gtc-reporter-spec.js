const _renderWarnings = function (warnings) {
  this.newline()
    .setIndent(1)
    .write(this.chalk.bold.yellow(`Warnings (${warnings.length}):`))
    .newline();

  warnings.forEach((msg) => {
    this.setIndent(1).write(this.chalk.bold.yellow(`--`)).newline().setIndent(2).write(msg).newline();
  });
};

const _renderErrors = function (errs) {
  this.setIndent(3).newline();

  errs.forEach((err, idx) => {
    const prefix = this.chalk.red(`${idx + 1}) `);
    this.newline().write(this.formatError(err, prefix)).newline().newline();
  });
};

const reportTaskStart = function (startTime, userAgents, testCount) {
  this.startTime = startTime;
  this.testCount = testCount;

  this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();

  userAgents.forEach((ua) => {
    this.write(`- ${this.chalk.blue(ua)}`).newline();
  });
};

const reportFixtureStart = function (name) {
  this.setIndent(1).useWordWrap(true);

  if (this.afterErrorList) {
    this.afterErrorList = false;
  } else {
    this.newline();
  }

  this.write(name).newline();
};

const reportTestDone = function (name, testRunInfo, meta) {
  let hasErr = !!testRunInfo.errs.length;
  let symbol = null;
  let nameStyle = null;

  if (testRunInfo.skipped) {
    this.skipped++;

    symbol = this.chalk.cyan('-');
    nameStyle = this.chalk.cyan;
  } else if (hasErr) {
    symbol = this.chalk.red.bold(this.symbols.err);
    nameStyle = this.chalk.red.bold;
  } else {
    symbol = this.chalk.green(this.symbols.ok);
    nameStyle = this.chalk.grey;
  }

  let title = `${symbol} ${nameStyle(name)}`;

  this.setIndent(1).useWordWrap(true);

  if (testRunInfo.unstable) title += this.chalk.yellow(' (unstable)');

  if (testRunInfo.screenshotPath) title += ` (screenshots: ${this.chalk.underline.grey(testRunInfo.screenshotPath)})`;

  this.write(title);
  this.newline();

  if (hasErr) {
    this.setIndent(2).useWordWrap(true);
    meta.steps.forEach((step, index) => {
      let color;
      let symbol;
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
      this.write(this.chalk[color](symbol));
      if (step.prefix) {
        this.write(this.chalk.white(`${step.prefix}:`));
      }
      this.write(this.chalk[color](`${step.keyword}${step.text}`));
      this.newline();
    });
    this._renderErrors(testRunInfo.errs);
  }

  this.afterErrorList = hasErr;
};

const reportTaskDone = function (endTime, passed, warnings) {
  const durationMs = endTime - this.startTime;
  const durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
  let footer =
    passed === this.testCount
      ? this.chalk.bold.green(`${this.testCount} passed`)
      : this.chalk.bold.red(`${this.testCount - passed}/${this.testCount} failed`);

  footer = footer.concat(this.chalk.grey(` (${durationStr})`));

  if (!this.afterErrorList) {
    this.newline();
  }

  this.setIndent(1).useWordWrap(true);

  this.newline().write(footer).newline();

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
    startTime: null,
    afterErrorList: false,
    testCount: 0,
    skipped: 0,
    _renderErrors,
    _renderWarnings,
    reportTaskStart,
    reportFixtureStart,
    reportTestDone,
    reportTaskDone,
  };
};
