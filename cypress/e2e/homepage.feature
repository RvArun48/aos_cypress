Feature: Home Page Tests
  Validate key components and functionality of the Home Page.

 
@homepage
  Scenario: Validate key sections of the Home Page
  Given I want to open the application
     Then the header should be visible
    # And the footer should be visible
    # And the flight search section should be visible
    # And the advanced search button should be visible

 
    When I click the flight button
    Then the flight button action is verified
    When I click the hotel button
    Then the hotel button action is verified
    When I click the sports button
    Then the sports button action is verified


    When I switch to the "Round Trip" tab
    Then the "Round Trip" tab should be active
    When I switch to the "One Way" tab
    Then the "One Way" tab should be active
    When I switch to the "Multi City (3 Segment)" tab
    Then the "Multi City (3 Segment)" tab should be active
    When I switch to the "Multi City" tab
    Then the "Multi City" tab should be active


    When I switch to the "Round Trip" tab
    Then the origin input should be visible
    And the destination input should be visible
    And the departure date input should be visible
    And the return date input should be visible
    And the traveler and class panel should be visible

 
    When I switch to the "One Way" tab
    Then the origin input should be visible
    And the destination input should be visible
    And the departure date input should be visible
    And the traveler and class panel should be visible


    When I switch to the "Multi City" tab
    Then I add a new segment
    And the inputs for the multi-city search should be validated
    And the traveler and class panel should be visible


    When I click on the advanced search button
    Then the advanced search options should be validated

    When I input "DXB" in the origin field
    Then I should select "Dubai International Airport" from the dropdown

  
    When I select a date range for round trip
    Then the round trip date range is validated
    When I select the departure date for one way
    Then the one-way date is validated
    When I select the departure date for multi-city
    Then the multi-city date is validated
    When I select the departure date for multi-city (3 segment)
    Then the multi-city (3 segment) date is validated




   





