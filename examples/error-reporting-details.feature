Feature: Reporting step status

    I want to see steps in my reports

    Scenario: No step definition
        Given I open Google's search page
        When I use an undefined step
        Then the step is displayed in red
        And the rest in grey

    Scenario: Failed step
        Given I open Google's search page
        When I try to click on a component that doesn't exist
        Then the test should fail
        And the report should highlight the steps in matching colors