Feature: Home Page Tests
  Validate key components and functionality of the Home Page.

 
@homepage
  Scenario: Validate key sections of the Home Page
  Given I want to open the application
    And the flight search section should be visible
   And the advanced search button should be visible

 
   
    When I click the hotel button
    Then the hotel button action is verified
     When I click the package button
    Then the package button action is verified
    When I click the sports button
    Then the sports button action is verified
     When I click the flight button
    Then the flight button action is verified
   

    When I switch to the Round Trip tab
     Then the Round Trip tab should be active
    Then the origin input should be visible
    And the destination input should be visible
    And the departure date input should be visible
    And the return date input should be visible
    And the traveler and class panel should be visible

 
      When I switch to the One Way tab
       Then the One Way tab should be active
    Then the origin input should be visible
    And the destination input should be visible
    And the departure date input should be visible
    And the traveler and class panel should be visible


    When I switch to the Multi City 3 Segment tab
     Then the Multi City 3 Segment tab should be active
     Then the origin input should be visible
    And the destination input should be visible
    And the departure date input should be visible
   
    Then I add a new segment
    And the traveler and class panel should be visible

 When I switch to the Multi City tab
    Then the Multi City tab should be active


    When I click on the advanced search button
    Then the advanced search options should be validate




   





