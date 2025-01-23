Feature: Reporting background step status

    I want to see backgroubd steps marked as such in my reports

    Background:
        Given I opened a search page

    Scenario: No step definition
        Given I forgot to implement some step
        Then the step details should be displayed in the report
        And background steps should be marked as such