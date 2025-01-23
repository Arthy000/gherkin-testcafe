Feature: Reporting step status

    I want to see steps in my reports

    Scenario: No step definition
        Given I opened a search page
        When I use an undefined step
        Then the failed step should be displayed in red
        And the next steps should be displayed in grey

    Scenario: Failed step
        Given I opened a search page
        When I try to click on a component that doesn't exist
        Then the test should fail
        And the report should highlight the steps in matching colors