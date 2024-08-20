Feature: Datatable demo feature

  Scenario: Searching for Datatable by Google
    Given I opened TestCafe's demo page
    When I click on 5 checkboxes
      | checkboxId                       |
      | remote-testing                   |
      | reusing-js-code                  |
      | background-parallel-testing      |
      | continuous-integration-embedding |
      | traffic-markup-analysis          |
    Then the amount of selected checkboxes should be "5"
