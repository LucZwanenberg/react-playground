Feature: Display Hello World After Button Click

  As a user
  I want to see a greeting message only after clicking a button
  So that the user interface remains clean and uncluttered

  Scenario: User clicks the button to reveal the greeting message
    Given the application is open
    Then the greeting message "Hello World!" should not be visible
    And a button with the text "Click me" should be present
    When the user clicks the "Click me" button
    Then the button should disappear
    And the greeting message "Hello World!" should become visible
