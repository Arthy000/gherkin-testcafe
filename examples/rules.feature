Feature: Rules

  I want to be able to use the Gherkin Rule keyword in feature files

  Rule: Scenarios within rules should be executed

    Scenario: Scenario within a rule
      Then I should output the name of the scenario

  Rule: Examples within rules should be executed

    Example: Example within a rule
      Then I should output the name of the scenario

  Rule: Scenario outlines within rules should execute all parameters

      Scenario Outline: Scenario <example> of outline within a rule
        Then I should output the name of the scenario

        Examples:
          | example |
          | 1       |
          | 2       |

  Rule: Parameterized scenarios within rules should execute all parameters

      Scenario: Parameterized scenario <example> within a rule
        Then I should output the name of the scenario

        Examples:
          | example |
          | 1       |
          | 2       |