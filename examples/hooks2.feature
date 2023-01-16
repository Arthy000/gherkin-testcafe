Feature: Hooks feature 2
    I want to be able to use hooks to link specific behaviors to my scenarios

    Scenario: Global hooks run before or after each feature
        Given a AfterAll hook is defined
        Then the AfterAll hook should have run after the previous feature

    @aftertag
    Scenario: One tag - after
        Given the scenario has a tag linked to an After hook
        Then the linked After hook should run

    @beforeaftertag
    Scenario: One tag - before and after
        Given the scenario has a tag linked to a Before and an After hook
        Then the linked Before hook should have run
        And the linked After hook should run

    @beforetag1 @aftertag
    Scenario: Several tags - before and after
        Given the scenario has one tag linked to a Before hook
        And the scenario has one tag linked to an After hook
        Then the linked Before hook should have run
        And the linked After hook should run
