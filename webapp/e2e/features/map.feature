Feature: Load map

Scenario: The user loads the map
  Given A logged user
  When I select to see the map
  Then The map will be loaded

Scenario: Add a point
  Given A user in the map
  When I select the button to add a marker
  And I click on the map
  Then A marker will be added to the map

Scenario: Remove a marker
  Given A user in the map
  When I click on a marker
  Then I click to delete the marker