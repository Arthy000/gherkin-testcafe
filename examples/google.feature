Feature: The big search feature

  I want to find TestCafe repository by Google search

  @googleHook
  Scenario: Searching for TestCafe on Google
    Given I opened Google's search page
    And I dismissed the privacy statement when it appeared
    When I type my search request "github TestCafe" on Google
    And I press the "enter" key
    Then I should see that the first Google's result is "DevExpress/testcafe:"

  Scenario Outline: Searching for <keyword> on Google
    Given I opened Google's search page
    And I dismissed the privacy statement when it appeared
    When I type my search request "<keyword>" on Google
    And I press the "enter" key
    Then I should see that the first Google's result is "<result-text>"

    Examples:
      | keyword  | result-text |
      | facebook | Facebook    |
      | twitter  | Twitter     |
