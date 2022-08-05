@featuretag
Feature: The feature
  Feature description

  @tag1
  Scenario: Scenario1
    Given given1-1
    When when1-1
    And when1-2
    And when1-3
    Then then1-1

  @tag2
  Scenario Outline: Scenario2-<example>
    Given given2-1
    When when2-<example>
    Then then2-1

    @tag2-1
    Examples:
      | example |
      | 1       |
      | 2       |

    @tag2-2
    Examples:
      | example |
      | 3       |
