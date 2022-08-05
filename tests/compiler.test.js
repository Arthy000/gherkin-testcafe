const GherkinTestcafeCompiler = require('../src/compiler');
const cucumberExpressions = require('@cucumber/cucumber-expressions');
const { join } = require('path');
const Module = require('module');

const mockDirectory = join(__dirname, '..', 'tests', 'mocks');

describe('Compiler functions', () => {
  describe('Get tags', () => {
    test('No tags', () => {
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual([]);
    });

    test('One tag', () => {
      process.argv.push('--tags', '@tag1');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual(['@tag1']);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('List of tags', () => {
      process.argv.push('--tags', '@tag1,@tag2,@tag3');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual(['@tag1', '@tag2', '@tag3']);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('Cumulated tags', () => {
      process.argv.push('--tags', '@tag1 and @tag2');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual([['@tag1', '@tag2']]);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('List of cumulated tags', () => {
      process.argv.push('--tags', '@tag1 and @tag2, @tag3 and @tag4');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual([
        ['@tag1', '@tag2'],
        ['@tag3', '@tag4'],
      ]);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('Ignore spaces after comas', () => {
      const sameResult = ['@tag1', '@tag2'];
      // with space
      process.argv.push('--tags', '@tag1, @tag2');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual(sameResult);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
      // without space
      process.argv.push('--tags', '@tag1,@tag2');
      const gtcCompiler2 = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler2.tags).toEqual(sameResult);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('Exclude tag', () => {
      process.argv.push('--tags', '~@tag1');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual(['~@tag1']);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('Cumulated + excluded tags', () => {
      process.argv.push('--tags', '~@tag1, ~@tag2');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual(['~@tag1', '~@tag2']);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });

    test('XOR tags', () => {
      process.argv.push('--tags', '~@tag1 and @tag2, @tag1 and ~@tag2');
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      expect(gtcCompiler.tags).toEqual([
        ['~@tag1', '@tag2'],
        ['@tag1', '~@tag2'],
      ]);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--tags');
    });
  });

  describe('Get parameter-type registry', () => {
    test('No file', () => {
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      const getParametersTypes = (mapObject) => Array.from(mapObject.values()).map((paramObject) => paramObject.name);
      const baseTypeRegistry = getParametersTypes(new cucumberExpressions.ParameterTypeRegistry().parameterTypeByName);
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypeByName');
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypesByRegexp');
      expect(getParametersTypes(gtcCompiler.cucumberExpressionParamRegistry.parameterTypeByName)).toStrictEqual(
        baseTypeRegistry
      );
    });

    test('Valid file', () => {
      process.argv.push('--param-type-registry-file', join(mockDirectory, 'color-registry.js'));
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      const getParametersTypes = (mapObject) => Array.from(mapObject.values()).map((paramObject) => paramObject.name);
      const baseTypeRegistry = getParametersTypes(new cucumberExpressions.ParameterTypeRegistry().parameterTypeByName);
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypeByName');
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypesByRegexp');
      expect(getParametersTypes(gtcCompiler.cucumberExpressionParamRegistry.parameterTypeByName)).toEqual([
        ...baseTypeRegistry,
        'color',
      ]);
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--param-type-registry-file');
    });

    test('Invalid export in file', () => {
      process.argv.push('--param-type-registry-file', join(mockDirectory, 'invalid-registry.js'));
      const gtcCompiler = new GherkinTestcafeCompiler(['mock.js'], []);
      const getParametersTypes = (mapObject) => Array.from(mapObject.values()).map((paramObject) => paramObject.name);
      const baseTypeRegistry = getParametersTypes(new cucumberExpressions.ParameterTypeRegistry().parameterTypeByName);
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypeByName');
      expect(gtcCompiler.cucumberExpressionParamRegistry).toHaveProperty('parameterTypesByRegexp');
      expect(getParametersTypes(gtcCompiler.cucumberExpressionParamRegistry.parameterTypeByName)).toEqual(
        baseTypeRegistry
      );
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--param-type-registry-file');
    });

    test('Missing file', () => {
      process.argv.push('--param-type-registry-file', join(mockDirectory, 'missing-registry.js'));
      expect(() => {
        new GherkinTestcafeCompiler(['mock.js'], []);
      }).toThrow('Cannot find module');
      process.argv.splice(-2, 2);
      expect(process.argv).not.toContain('--param-type-registry-file');
    });
  });

  describe('_loadSpecs function', () => {
    test('No spec file', async () => {
      const gtcCompiler = new GherkinTestcafeCompiler([], []);
      const specs = gtcCompiler._loadSpecs();
      await expect(specs).rejects.toThrow('No spec file path provided');
    });
    test('Spec file not found', async () => {
      const gtcCompiler = new GherkinTestcafeCompiler([], []);
      const specs = gtcCompiler._loadSpecs(join(mockDirectory, 'nosuchfile.feature'));
      await expect(specs).rejects.toThrow('ENOENT: no such file or directory');
    });
    test('Invalid spec file', async () => {
      const gtcCompiler = new GherkinTestcafeCompiler([], []);
      const specs = gtcCompiler._loadSpecs(join(mockDirectory, 'invalid-specs.feature'));
      await expect(specs).rejects.toThrow('Failed to parse feature file');
    });
    test('Valid spec file', async () => {
      const gtcCompiler = new GherkinTestcafeCompiler([], []);
      const specs = await gtcCompiler._loadSpecs(join(mockDirectory, 'valid-specs.feature'));
      const { feature } = specs.gherkinDocument;
      const [{ source }, { gherkinDocument }, ...pickles] = specs.gherkinResult;
      expect(feature.name).toBe('The feature');
      expect(feature.tags.find((tag) => tag.name === '@featuretag')).not.toBeUndefined();
      expect(source).toHaveProperty('data', 'mediaType', 'uri');
      expect(gherkinDocument).toHaveProperty('comments', 'feature', 'uri');
      expect(pickles).toHaveProperty('length', 4);
      expect(pickles.map(({ pickle }) => pickle.name)).toEqual([
        'Scenario1',
        'Scenario2-1',
        'Scenario2-2',
        'Scenario2-3',
      ]);
      expect(pickles.map(({ pickle }) => pickle.tags.map((tag) => tag.name).sort())[0]).toEqual(
        ['@tag1', '@featuretag'].sort()
      );
      expect(pickles.map(({ pickle }) => pickle.tags.map((tag) => tag.name).sort())[1]).toEqual(
        ['@tag2', '@tag2-1', '@featuretag'].sort()
      );
      expect(pickles.map(({ pickle }) => pickle.tags.map((tag) => tag.name).sort())[2]).toEqual(
        ['@tag2', '@tag2-1', '@featuretag'].sort()
      );
      expect(pickles.map(({ pickle }) => pickle.tags.map((tag) => tag.name).sort())[3]).toEqual(
        ['@tag2', '@tag2-2', '@featuretag'].sort()
      );
      expect(pickles.map(({ pickle }) => pickle.steps)[0]).toHaveProperty('length', 5);
      expect(pickles.map(({ pickle }) => pickle.steps)[1]).toHaveProperty('length', 3);
      expect(pickles.map(({ pickle }) => pickle.steps)[2]).toHaveProperty('length', 3);
      expect(pickles.map(({ pickle }) => pickle.steps)[3]).toHaveProperty('length', 3);
    });
  });
});
