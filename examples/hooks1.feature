Feature: Hooks feature 1
    I want to be able to use hooks to link specific behaviors to my scenarios

    Scenario: Global hooks run before or after each feature
        Given a BeforeAll hook is defined
        Then the BeforeAll hook should have run before any scenario

    Scenario: No tag
        Given the scenario has no tags
        Then no tagged hook should run

    @beforetag1
    Scenario: One tag - before
        Given the scenario has a tag linked to a Before hook
        Then the linked Before hook should have run

    @beforetag1 @beforetag2
    Scenario: Several tags
        Given the scenario has several tags linked to Before hooks
        Then the linked Before hooks should have run
