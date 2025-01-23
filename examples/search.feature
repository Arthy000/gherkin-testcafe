@slow
Feature: The big search feature

  I want to find TestCafe repository by Google search

  Scenario: Searching for TestCafe on Google
    Given I opened a search page
    When I type my search request "github TestCafe"
    And I press the "enter" key
    Then I should see that the first result is "DevExpress/testcafe:"

  Scenario Outline: Searching for <keyword> on Google
    Given I opened a search page
    When I type my search request "<keyword>"
    And I press the "enter" key
    Then I should see that the first result is "<result-text>"

    Examples:
      | keyword   | result-text |
      | facebook  | Facebook    |
      | instagram | Instagram   |

  @searchHook
  Scenario: Searching for hook keyword on Google
    Given I opened a search page
    When I type my search request
    And I press the "enter" key
    Then I should see that the first result is as expected
