const { ParameterTypeRegistry, ParameterType } = require('@cucumber/cucumber-expressions');

class Color {
  constructor(name) {
    this.name = `${name} color`;
    this.code = {
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
    }[name];
  }
}

const registry = new ParameterTypeRegistry();

registry.defineParameterType(
  new ParameterType(
    'color', // name
    /red|green|blue/, // regexp
    Color, // type
    (name) => new Color(name), // transformer function
  ),
);

module.exports = registry;
