exports.default = function () {
  return require(`${__dirname}/../package.json`).version;
};

module.exports = exports.default;
