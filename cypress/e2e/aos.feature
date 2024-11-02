Feature: aos validation
Scenario: Home Page
 Feature: Flight search

  Scenario: Search for flights with specific details
  
     Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "Booking Data" and index 0
     Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
     Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
     Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"




    And I have the departure location 
    And I have the return location 
   And I have the departure date 
    And I have the cabin class 
   And I have the market country code 
    And I have the trip type 
    And I have the number of adults 
    And I have the number of children 
    And I have the number of infants 
    And I have the direct flight option set to 
    And I have the baggage option set to
    And I have the refundable option set to 
   # And I have enter the airline 
    When I generate the search URL
    Then I should visit the generated URL
    Then I click on the flight details  
 Then I click on the booknow 
 Then I need to add the traveller details for "Adult"
 Then I need to add the traveller details for "Child"
 Then I need to add the traveller details for "Infant"
 #Then I need to add the passport information
 Then I need to add the passenger common details
 Then I need to click continue to payment
