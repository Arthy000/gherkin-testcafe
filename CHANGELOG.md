# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.4.0](https://github.com/Arthy000/gherkin-testcafe/compare/v7.2.0...v7.4.0) (2025-01-23)


### Features

* **dependencies:** update TestCafe, Cucumber, and peer dependencies ([#162](https://github.com/Arthy000/gherkin-testcafe/issues/162)) ([7015180](https://github.com/Arthy000/gherkin-testcafe/commit/70151807ec7b30c9a322d987dea34d2432feadf9))
* **testcafe:** update supported testcafe version ([#169](https://github.com/Arthy000/gherkin-testcafe/issues/169)) ([54d9340](https://github.com/Arthy000/gherkin-testcafe/commit/54d93400f7d243f994f6404a590d95ac0d1ce931)), closes [#165](https://github.com/Arthy000/gherkin-testcafe/issues/165)

## [7.3.0](https://github.com/Arthy000/gherkin-testcafe/compare/v7.2.0...v7.3.0) (2024-08-20)


### Features

* **dependencies:** update TestCafe, Cucumber, and peer dependencies ([#162](https://github.com/Arthy000/gherkin-testcafe/issues/162)) ([336765e](https://github.com/Arthy000/gherkin-testcafe/commit/336765ef6de76b7be11acbdae030bea774a08990))

## [7.2.0](https://github.com/Arthy000/gherkin-testcafe/compare/v7.1.2...v7.2.0) (2024-01-07)


### Features

* **cucumber:** update cucumber internal deps and peer deps ([#152](https://github.com/Arthy000/gherkin-testcafe/issues/152)) ([60b4bdc](https://github.com/Arthy000/gherkin-testcafe/commit/60b4bdcbf294863823c6de193eb4dba94127c14c))
* **testcafe:** update testcafe version in peer dependency ([#148](https://github.com/Arthy000/gherkin-testcafe/issues/148)) ([f115ec0](https://github.com/Arthy000/gherkin-testcafe/commit/f115ec03ffc26c4a6ff2ebfc65b333cf994e77a6))


### Bug Fixes

* **compiler:** fix forgotten import ([a169b79](https://github.com/Arthy000/gherkin-testcafe/commit/a169b798b27d1901a2bef0fc95288357e5ce7257))
* **yarn:** downgrade yarn ([#153](https://github.com/Arthy000/gherkin-testcafe/issues/153)) ([078803d](https://github.com/Arthy000/gherkin-testcafe/commit/078803dd6997bb17dcd4c8730a99b1e0378e4cc7))

### [7.1.2](https://github.com/Arthy000/gherkin-testcafe/compare/v7.1.1...v7.1.2) (2023-09-04)


### Bug Fixes

* **dependencies:** fix peer dependencies range for testcafe ([#142](https://github.com/Arthy000/gherkin-testcafe/issues/142)) ([de2619c](https://github.com/Arthy000/gherkin-testcafe/commit/de2619c4c7ef711f2b992c1abae65b05587ec433))

### [7.1.1](https://github.com/Arthy000/gherkin-testcafe/compare/v7.1.0...v7.1.1) (2023-08-27)

## [7.1.0](https://github.com/Arthy000/gherkin-testcafe/compare/v7.0.0...v7.1.0) (2023-08-05)


### Features

* **compiler:** add support for the Gherkin Rule keyword ([#135](https://github.com/Arthy000/gherkin-testcafe/issues/135)) ([0fcbb86](https://github.com/Arthy000/gherkin-testcafe/commit/0fcbb86d1e518a47be9e6a3b2e6af652593ea597)), closes [#134](https://github.com/Arthy000/gherkin-testcafe/issues/134)
* **testcafe:** add support for latest versions of testcafe ([#138](https://github.com/Arthy000/gherkin-testcafe/issues/138)) ([369175c](https://github.com/Arthy000/gherkin-testcafe/commit/369175ca86b02994d34e658bba572d46a9979a66)), closes [#133](https://github.com/Arthy000/gherkin-testcafe/issues/133)

## [7.0.0](https://github.com/Arthy000/gherkin-testcafe/compare/v6.0.1...v7.0.0) (2023-04-27)


### ⚠ BREAKING CHANGES

* **cucumber:** TestCafe 1.20 and Cucumber 8 have been removed from the peer dependencies, risks of
warnings when updating this package if older versions of the dependencies were used

* **cucumber:** update cucumber dependencies and peer dependencies ([#132](https://github.com/Arthy000/gherkin-testcafe/issues/132)) ([f1f772a](https://github.com/Arthy000/gherkin-testcafe/commit/f1f772a09bf00f215826fc66ea7e8d7581040516)), closes [#130](https://github.com/Arthy000/gherkin-testcafe/issues/130)

### [6.0.1](https://github.com/Arthy000/gherkin-testcafe/compare/v6.0.0...v6.0.1) (2023-04-27)

## [6.0.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.5.1...v6.0.0) (2023-02-25)


### ⚠ BREAKING CHANGES

* **deps:** Risk of failure if cucumber and cucumber-expressions are not properly installed in
the user's project

### Features

* **deps:** update testcafe compatibility ([#123](https://github.com/Arthy000/gherkin-testcafe/issues/123)) ([cd650e9](https://github.com/Arthy000/gherkin-testcafe/commit/cd650e9c368acc1264fdf437ba62c85975c32fb4))
* **deps:** upgrade dependencies ([#124](https://github.com/Arthy000/gherkin-testcafe/issues/124)) ([84ec0a6](https://github.com/Arthy000/gherkin-testcafe/commit/84ec0a67e2fbcf3f12b352cfc06e6c72101e01f6))
* **documentation:** improve documentation and typing ([#115](https://github.com/Arthy000/gherkin-testcafe/issues/115)) ([6c39dbb](https://github.com/Arthy000/gherkin-testcafe/commit/6c39dbb6a9170ce7e9cb30556049ea1405e6792a))
* **testcontroller:** add new properties to TestController typing ([#113](https://github.com/Arthy000/gherkin-testcafe/issues/113)) ([293dd77](https://github.com/Arthy000/gherkin-testcafe/commit/293dd7755f31f5ff8c89dcd55877a5341129df88))

## [5.6.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.5.1...v5.6.0) (2023-01-21)


### Features

* **documentation:** improve documentation and typing ([#115](https://github.com/Arthy000/gherkin-testcafe/issues/115)) ([6c39dbb](https://github.com/Arthy000/gherkin-testcafe/commit/6c39dbb6a9170ce7e9cb30556049ea1405e6792a))
* **testcontroller:** add new properties to TestController typing ([#113](https://github.com/Arthy000/gherkin-testcafe/issues/113)) ([293dd77](https://github.com/Arthy000/gherkin-testcafe/commit/293dd7755f31f5ff8c89dcd55877a5341129df88))

### [5.5.2](https://github.com/Arthy000/gherkin-testcafe/compare/v5.5.1...v5.5.2) (2022-12-10)

### [5.5.1](https://github.com/Arthy000/gherkin-testcafe/compare/v5.5.0...v5.5.1) (2022-11-11)


### Bug Fixes

* **dependencies:** add chalk dependency ([7ac895e](https://github.com/Arthy000/gherkin-testcafe/commit/7ac895efcd21551199feb9716ef93617f456a93c)), closes [#103](https://github.com/Arthy000/gherkin-testcafe/issues/103)

## [5.5.0](https://github.com/Arthy000/gherkin-testcafe/compare/v5.4.4...v5.5.0) (2022-09-16)


### Features

* **reporting:** improve reporting capabilities with step keywords ([46dcc41](https://github.com/Arthy000/gherkin-testcafe/commit/46dcc41017ba188912e9e88bca87c75cc94a5229)), closes [#99](https://github.com/Arthy000/gherkin-testcafe/issues/99)

### [5.4.4](https://github.com/Arthy000/gherkin-testcafe/compare/v5.4.3...v5.4.4) (2022-08-15)


### Bug Fixes

* **compiler.js:** updated Testcafe dependency to 1.20 and fixed sourc… ([#98](https://github.com/Arthy000/gherkin-testcafe/issues/98)) ([33dd883](https://github.com/Arthy000/gherkin-testcafe/commit/33dd88354a8a4afa7ab72a3b8a3d8420ad37ee79)), closes [#97](https://github.com/Arthy000/gherkin-testcafe/issues/97) [#97](https://github.com/Arthy000/gherkin-testcafe/issues/97)

### [5.4.3](https://github.com/Arthy000/gherkin-testcafe/compare/v5.4.2...v5.4.3) (2022-06-16)


### Bug Fixes

* **reporting:** fix missing newline in gtc-reporter-list ([8dc4beb](https://github.com/Arthy000/gherkin-testcafe/commit/8dc4beba697686bd556b14886a21b34c845129a1)), closes [#89](https://github.com/Arthy000/gherkin-testcafe/issues/89)

### [5.4.2](https://github.com/Arthy000/gherkin-testcafe/compare/v5.4.1...v5.4.2) (2022-06-08)


### Bug Fixes

* **reporter:** take into account the absence of keyword ([3d7c8e2](https://github.com/Arthy000/gherkin-testcafe/commit/3d7c8e2ef042893a6fd98606f803b28c9e787697)), closes [#89](https://github.com/Arthy000/gherkin-testcafe/issues/89)

### [5.4.1](https://github.com/Arthy000/gherkin-testcafe/compare/v5.4.0...v5.4.1) (2022-06-08)


### Bug Fixes

* **reporter:** fix various issues in the custom reporters ([8e2ee9b](https://github.com/Arthy000/gherkin-testcafe/commit/8e2ee9be6dcda21f89b73aa4a8f63fe2461f832f)), closes [#89](https://github.com/Arthy000/gherkin-testcafe/issues/89) [#90](https://github.com/Arthy000/gherkin-testcafe/issues/90)

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
