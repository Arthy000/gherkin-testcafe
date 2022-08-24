const _renderErrors = function (errs) {
  this.setIndent(3).newline();

  errs.forEach((err, idx) => {
    const prefix = this.chalk.red(`${idx + 1}) `);

    this.newline().write(this.formatError(err, prefix)).newline().newline();
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

const reportTaskStart = function (startTime, userAgents, testCount) {
  this.startTime = startTime;
  this.testCount = testCount;

  this.setIndent(1).useWordWrap(true).write(this.chalk.bold('Running tests in:')).newline();

  userAgents.forEach((ua) => {
    this.write(`- ${this.chalk.blue(ua)}`).newline();
  });

  this.newline();
};

const reportFixtureStart = function (name) {
  this.currentFixtureName = name;
};

const reportTestDone = function (name, testRunInfo, meta) {
  const hasErr = !!testRunInfo.errs.length;
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

  name = `${this.currentFixtureName} - ${name}`;

  let title = `${symbol} ${nameStyle(name)}`;

  if (testRunInfo.unstable) {
    title = title.concat(this.chalk.yellow(' (unstable)'));
  }

  if (testRunInfo.screenshotPath) {
    title = title.concat(` (screenshots: ${this.chalk.grey.underline(testRunInfo.screenshotPath)})`);
  }

  this.setIndent(1).useWordWrap(true).write(title);

  if (hasErr) {
    this.setIndent(2).useWordWrap(true).newline();
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

  this.afterErrList = hasErr;

  this.newline();
};

const reportTaskDone = function (endTime, passed, warnings) {
  const durationMs = endTime - this.startTime;
  const durationStr = this.moment.duration(durationMs).format('h[h] mm[m] ss[s]');
  let footer =
    passed === this.testCount
      ? this.chalk.bold.green(`${this.testCount} passed`)
      : this.chalk.bold.red(`${this.testCount - passed}/${this.testCount} failed`);

  footer += this.chalk.gray(` (${durationStr})`);

  this.setIndent(1).useWordWrap(true);

  if (!this.afterErrList) this.newline();

  this.newline().write(footer).newline();

  if (this.skipped > 0) {
    this.write(this.chalk.cyan(`${this.skipped} skipped`)).newline();
  }

  if (warnings.length) this._renderWarnings(warnings);
};

module.exports = () => {
  return {
    noColors: false,
    startTime: null,
    afterErrList: false,
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
