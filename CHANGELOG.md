# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.4.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.3.1...v5.4.0) (2022-06-04)


### Features

* **reporting:** output steps as metadata ([75d0cc4](https://github.com/Arthy000/gherkin-testcafe/commit/75d0cc4d28b997ecf9e18204789800e905db5d32)), closes [#48](https://github.com/Arthy000/gherkin-testcafe/issues/48)

### [5.3.1](https://github.com/Arthy000/gherkin-testcafe/compare/v5.3.0...v5.3.1) (2022-06-01)

## [5.3.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.2.0...v5.3.0) (2022-05-24)


### Features

* **authentication:** add the ability to use http authentication ([fa1cf91](https://github.com/Arthy000/gherkin-testcafe/commit/fa1cf91834b6239120d3a5a0524f0bd34e65ac39)), closes [#76](https://github.com/Arthy000/gherkin-testcafe/issues/76)
* **globalhooks:** add the ability to access a copy of the features metadata ([#68](https://github.com/Arthy000/gherkin-testcafe/issues/68)) ([7ead487](https://github.com/Arthy000/gherkin-testcafe/commit/7ead487943ca70d71c6a82b4851e23d18c62bc10))

### [5.2.1](https://github.com/Arthy000/gherkin-testcafe/compare/v5.2.0...v5.2.1) (2022-05-24)

## [5.2.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.1.0...v5.2.0) (2022-02-15)


### Features

* **globalhooks:** add the ability to access a copy of the features metadata ([#68](https://github.com/Arthy000/gherkin-testcafe/issues/68)) ([e87d6cc](https://github.com/Arthy000/gherkin-testcafe/commit/e87d6cce02d9cf7c26812595c588d3f137537554))

## [5.1.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.0.1...v5.1.0) (2021-07-16)


### Features

* docStrings support ([3ee6859](https://github.com/Arthy000/gherkin-testcafe/commit/3ee6859524e76e5e1a7815f981cc01bfa31586d9))


### Bug Fixes

* **cucumber:** add transpose to declared exports for cucumber ([d4e8117](https://github.com/Arthy000/gherkin-testcafe/commit/d4e8117f0bd94a868b8470017285c54489524d6b))

### [5.0.1](https://github.com/Arthy000/gherkin-testcafe/compare/v5.0.0...v5.0.1) (2021-04-28)


### Bug Fixes

* **hooks:** fix cucumber hooks overwrite ([8401669](https://github.com/Arthy000/gherkin-testcafe/commit/8401669b5f6451932cef91af023d2605781fa766))

## [5.0.0](https://github.com/Arthy000/gherkin-testcafe/compare/v4.0.0...v5.0.0) (2021-03-23)


### ⚠ BREAKING CHANGES

* **cucumber library:** Any existing users of the library will need to update their cucumber imports from
'cucumber' to '@cucumber/cucumber'

* **cucumber library:** update to the latest cucumber library version ([3e47116](https://github.com/Arthy000/gherkin-testcafe/commit/3e47116c0b6cbc72a0e096b87264ec710317c16c)), closes [#22](https://github.com/Arthy000/gherkin-testcafe/issues/22)

## [4.0.0](https://github.com/Arthy000/gherkin-testcafe/compare/v3.0.1...v4.0.0) (2021-02-26)


### ⚠ BREAKING CHANGES

* the new version will only work with testcafe 1.10 and above

### Bug Fixes

* change the options given to typescript compiler ([6514445](https://github.com/Arthy000/gherkin-testcafe/commit/65144456e0122a10587f9833924250e02e4b67ff)), closes [#24](https://github.com/Arthy000/gherkin-testcafe/issues/24)
* get rid of non-unix end of line ([6ad4cfd](https://github.com/Arthy000/gherkin-testcafe/commit/6ad4cfdbdf07507eebf2b1eb25fbafbacb67c3bd)), closes [#21](https://github.com/Arthy000/gherkin-testcafe/issues/21)

### [3.0.1](https://github.com/Arthy000/gherkin-testcafe/compare/v3.0.0...v3.0.1) (2021-01-13)


### Bug Fixes

* fix api dryrun always enabled ([58baad0](https://github.com/Arthy000/gherkin-testcafe/commit/58baad0c019c5dfd08054cf05822b80496f08da5))

## [3.0.0](https://github.com/Arthy000/gherkin-testcafe/compare/v2.4.2...v3.0.0) (2021-01-13)


### ⚠ BREAKING CHANGES

* changes to the returned types (when using typescript) might break existing
interfaces that extend the current return types

### Features

* add tags as fixture and test metadata ([08c4cd2](https://github.com/Arthy000/gherkin-testcafe/commit/08c4cd268cfbb508e8b2a151280bbe0c70cc096c)), closes [#9](https://github.com/Arthy000/gherkin-testcafe/issues/9)
* add the ability to look for step without implementation ([9513efe](https://github.com/Arthy000/gherkin-testcafe/commit/9513efe1dd636277a716585ffd7c98c1057e67ad)), closes [#12](https://github.com/Arthy000/gherkin-testcafe/issues/12)


### Bug Fixes

* add gtc-specific properties to runner typings ([fa86575](https://github.com/Arthy000/gherkin-testcafe/commit/fa865758c0c68c4419a46662449b61d420e2bec3)), closes [#14](https://github.com/Arthy000/gherkin-testcafe/issues/14)
