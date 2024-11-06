Feature: aos validation

# Scenario: Search for flights with specific details for one way trip
  
#      Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "Booking Data" and index 0
#      Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
#      Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
#      Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"




#     And I have the departure location 
#     And I have the return location 
#    And I have the departure date


#     And I have the cabin class 
#     And I have the market country code 
#     And I have the trip type 
#     And I have the number of adults 
#     And I have the number of children 
#     And I have the number of infants 
#     And I have the direct flight option set to 
#     And I have the baggage option set to
#     And I have the refundable option set to 
#    #  And I have enter the airline 
#     When I generate the search URL
#     Then I should visit the generated URL
#     Then I click on the flight details  
#  Then I click on the booknow 
#  Then I need to add the traveller details for "Adult"
#  Then I need to add the traveller details for "Child"
#  Then I need to add the traveller details for "Infant"

#  Then I need to add the passenger common details
#  Then I need to click continue to payment


Scenario: Search for flights with specific details for round trip
  Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "Roundtrip" and index 0
     Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
     Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
     Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I have the departure location 
    And I have the return location 
    And I have the departure date 
    And I have the cabin class 
    Given I have the departure return location 
    And I have the return location two
    
    And I have the return date 
    
    
    And I have the cabin return class
    And I have the trip type 
   
    And I have the number of adults 
    And I have the number of children 
    And I have the number of infants 
    And I have the direct flight option set to 
    And I have the baggage option set to
    #And I have the key parameter
    And I have the refundable option set to 
   #  And I have enter the airline 
    When I generate the search URL
    Then I should visit the generated URL
    Then I click on the flight details  
    Then I click on the booknow 
   Then I need to add the traveller details for "Adult"
   Then I need to add the traveller details for "Child"
   Then I need to add the traveller details for "Infant"

   Then I need to add the passenger common details
   Then I need to click continue to payment



#   Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "Booking Data" and index 0
#      Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
#      Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
#      Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
#     Given I have the departure location
#     And I have the return location
#     And I have the departure date
#     And I have the return date
#     And I have the cabin class
#     And I have the trip type
#    Then I need to add the traveller details for "Adult"
#  Then I need to add the traveller details for "Child"
#  Then I need to add the traveller details for "Infant"
#     And I have the direct flight option
#     And I have the baggage option
#     And I have the key parameter
#     And I have the language code
#     And I have the market country code
#     And I have segment-specific details
#     When I generate the URL parameters
#     Then I should see the generated URL with parameters



#     Feature: Generate Flight Search URL for Multi-Segment Trip

#   Scenario: Generate URL with multi-segment parameters
#     Given I have the departure location for Segment 1
#     And I have the return location for Segment 1
#     And I have the departure date for Segment 1
#     And I have the cabin class for Segment 1

#     And I have the departure location for Segment 2
#     And I have the return location for Segment 2
#     And I have the departure date for Segment 2
#     And I have the cabin class for Segment 2

#     And I have the departure location for Segment 3
#     And I have the return location for Segment 3
#     And I have the departure date for Segment 3
#     And I have the cabin class for Segment 3

#     And I have the departure location for Segment 4
#     And I have the return location for Segment 4
#     And I have the departure date for Segment 4
#     And I have the cabin class for Segment 4

#     And I have the departure location for Segment 5
#     And I have the return location for Segment 5
#     And I have the departure date for Segment 5
#     And I have the cabin class for Segment 5

#     And I have the departure location for Segment 6
#     And I have the return location for Segment 6
#     And I have the departure date for Segment 6
#     And I have the cabin class for Segment 6

#     And I have the trip type
#     And I have the number of adults
#     And I have the number of children
#     And I have the number of infants
#     And I have the direct flight option
#     And I have the baggage option
#     And I have the key parameter
#     And I have the language code
#     And I have the market country code

#     When I generate the URL parameters
#     Then I should see the generated URL with parameters
