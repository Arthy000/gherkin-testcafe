Feature: Doc string feature

    I want to use a doc string in my test

    Scenario: Asserting page subtitle
        Given I opened TestCafe's demo page
        Then I should see the following page subtitle
            """
            This webpage is used as a sample in TestCafe tutorials.
            """

# this only works for v5.0.0 or above