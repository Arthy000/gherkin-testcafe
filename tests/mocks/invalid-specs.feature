
  @tag1
  Scenario: Scenario1
    Given given1-1
    When When1-1
    And When1-2
    And When1-3
    Then Then1-1

  @tag2
  Scenario Outline: Scenario2-<example>
    Given given2-1
    When when2-<example>
    Then then2-1

    Examples:
      | example |
      | 1       |
      | 2       |
      | 3       |
