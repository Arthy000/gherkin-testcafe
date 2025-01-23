Feature: Using custom parameter types

  I want to demonstrate the use of a custom "Color" parameter type

  @googleHook
  Scenario: Searching for blue color in Google
    Given I opened a search page
    When I search for the "blue" color
    And I press the "enter" key
    Then I should see the corresponding code in the page

# blue is recognized by Cucumber as a color
# (based on the regexp in the custom type)