Feature: Using custom parameter types

  I want to demonstrate the use of a custom "Color" parameter type

  @googleHook
  Scenario: Searching for color in Google
    Given I opened Google's search page
    And I dismissed the privacy statement when it appeared
    When I search for the "blue" color on Google
    And I press the "enter" key
    Then I should see the "#0000FF" result in the page

# here, blue and #0000FF are recognized by Cucumber as being respectively
# a color (based on the custome typing)
# and a word (based on Cucumber default types)