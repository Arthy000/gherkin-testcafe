Feature: HTTP Basic Authentication

  I want to be able to import HTTP credentials in my tests by using TestCafe's httpAuth functionality

  Scenario: Authenticating on test site
    Given I created an HTTP authentication file for my feature
    And I opened the HTTP test site
    When I open the protected page
    Then I should reach the protected page