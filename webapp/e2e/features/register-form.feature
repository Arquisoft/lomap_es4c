Feature: Login in

Scenario: The user wants to login
  Given An unlogged user
  When I select the login option
  Then The page for the POD provider will show, asking for credentials