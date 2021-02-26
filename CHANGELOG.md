# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
