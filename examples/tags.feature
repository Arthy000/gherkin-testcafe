@featureTag
Feature: Tags filtering

    I want to be able to filter scenarios and features based on tags

    Scenario Outline: Scenario with <tags>
        Then I should output why I was included
        @scenarioTag1
        Examples:
            | tags         |
            | scenarioTag1 |

        @scenarioTag1 @scenarioTag2
        Examples:
            | tags                          |
            | scenarioTag1 and scenarioTag2 |

        @scenarioTag2
        Examples:
            | tags         |
            | scenarioTag2 |

        Examples:
            | tags   |
            | no tag |