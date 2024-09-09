Feature: Displaying the user greeting

  As a user
  I want to see the currently logged-in account
  So I know my changes are recorded to correct account

  Scenario: Displaying the greeting for the authenticated user
    Given the authentication service returns the following user:
      | first_name | last_name  | email                        |
      | Alice      | Wonderssen | alice.wonderssen@example.org |
    When I navigate to the application home page
    Then the application should show "Hello, Alice Wonderssen (alice.wonderssen@example.org)"
