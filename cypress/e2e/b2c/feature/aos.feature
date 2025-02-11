Feature: AOS Validation

@roundTrip
Scenario Outline: Search for flights with specific details for a one-way trip using test case ID <testCaseId>
   Given I have the flight details from "<filePath>" with sheet "<sheetName>" for test case ID "<testCaseId>"
    And I setup the test data for adult passengers from "<filePath>"
    And I setup the test data for child passengers from "<filePath>"
    And I setup the test data for infant passengers from "<filePath>"
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
    And I have enter the airline
    When I generate the search URL
    Then I should visit the generated URL   
    Then I checking the origin and Destination as per search
    # Then I need to validate price calendar
    Then I need to validate flight card
    Then I need to validate fare option
    Then I need to validate the time
    Then I need to validate the price
    Then I need to validate the stop
    Then I need to validate Duration
    Then I need to Validate Airlines
    Then I need to validate Refundable Option
    Then I need to validate sortby filter
    Then I click on the flight details
      Then  I need to validate flight details 
    Then I click on the flight ltinerary
     Then  I need to validate flight ltinerary
      
    Then I click on the baggage
     Then I need to validate baggage
    Then I click on the fare breakup
    Then I need to validate fare breakup
    Then I click on the booknow
    Then I need to add the traveller details for "Adult"
    Then I need to add the traveller details for "Child"
    Then I need to add the traveller details for "Infant"
    Then I need to add the passenger common details
     Then I have the promo code
    Then I need to validate flight Summary

    Then I click on payment continue
    Then I need to validate flight Summary payment page
    Then I need to click continue to payment
    Then I need to click search again flight is not avaliable add the traveller details for "Adult"
    Then I need to click search again flight is not avaliable add the traveller details for "Child"
    Then I need to click search again flight is not avaliable add the traveller details for "Infant"
    Then I need to enter card details

    Then I need to validate booking Summary
    Then I need to validate baggage confirmation page
    Then I need to validate confirmation page
    Then I need to validate traveller details

Examples:
    | filePath                          | sheetName  | testCaseId |
     | cypress/fixtures/b2c/flightDetails.xlsx | Oneway     | TC009      |
  


     

     


@roundTrip1
Scenario Outline: Search for flights with specific details for a roundTrip trip using test case ID <testCaseId>
    Given I have the flight details from "<filePath>" with sheet "<sheetName>" for test case ID "<testCaseId>"
    And I setup the test data for adult passengers from "<filePath>"
    And I setup the test data for child passengers from "<filePath>"
    And I setup the test data for infant passengers from "<filePath>"
    And I have the departure location
    And I have the return location
    And I have the departure date
    And I have the cabin class
    And I have the departure return location
    And I have the return location two
    And I have the return date
    And I have the cabin return class
    And I have the trip type
    And I have the number of adults
    And I have the number of children
    And I have the number of infants
    And I have the direct flight option set to
    And I have the baggage option set to
    And I have the refundable option set to
    And I have enter the airline
    When I generate the search URL
    Then I should visit the generated URL
    # Then I checking the origin and Destination as per search
    # Then I need to validate price calendar roundtrip
    Then I need to validate flight card roundtrip
     Then I need to validate the time roundtrip
    Then I need to validate the price roundtrip
    Then I need to validate the stop roundtrip
    Then I need to validate Duration roundtrip
    Then I need to Validate airlines roundtrip
    Then I need to validate Refundable Option
    Then I need to validate fare option
    Then I need to validate sortby filter roundtrip
    Then I click on the flight details
     Then I click on the flight ltinerary
     Then  I need to validate flight ltinerary
    Then I click on the baggage
    Then I need to validate baggage
    Then I click on the fare breakup
    Then I need to validate fare breakup
    Then I click on the booknow
    Then I need to add the traveller details for "Adult"
    Then I need to add the traveller details for "Child"
    Then I need to add the traveller details for "Infant"
    Then I need to add the passenger common details
    Then I need to validate flight Summary
    Then I click on payment continue
    Then I need to validate flight Summary payment page
    Then I need to click continue to payment
    Then I need to validate booking Summary
    Then I need to validate baggage confirmation page
    Then I need to validate confirmation page
    Then I need to validate traveller details

Examples:
    | filePath                          | sheetName  | testCaseId |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC001      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC002      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC003      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC004      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC005      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC006      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC007      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC008      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC009      |
    | cypress/fixtures/b2c/flightDetails.xlsx | Roundtrip  | TC0010      |

@multicity
Scenario: Search for flights with specific details for multicity trip
    Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "multicity threesegment" and index 0
    Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
    And I have the departure location
    And I have the return location
    And I have the departure date
    And I have the cabin class
    And I have the departure location two
    And I have the return location twoo
    And I have the departure date two
    And I have the cabin class two
    And I have the departure location three
    And I have the return location three
    And I have the departure date three
    And I have the cabin class three
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
    # Then I need to validate flight card muticity
    # Then I need to validate the time
    # Then I need to validate the price multicity
    # Then I need to validate the stop multicity
    # Then I need to validate Duration
    # Then I need to Validate Airlines multicity
    # Then I need to validate fare option multicity
    # Then I need to validate sortby filter
    Then I click on the flight details multicity
    Then I click on the booknow
    # Then I need to add the traveller details for "Adult"
    # Then I need to add the traveller details for "Child"
    # Then I need to add the traveller details for "Infant"
    # Then I need to add the passenger common details
    Then I need to validate flight Summary
    Then I need to click continue to payment
    Then I need to validate confirmation page

# @multicitysix
# Scenario: Search for flights with specific details for multicity six
#     Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "multicity sixsegment" and index 0
#     Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
#     Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
#     Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
#     And I have the departure location
#     And I have the return location
#     And I have the departure date
#     And I have the cabin class
#     And I have the departure location two
#     And I have the return location twoo
#     And I have the departure date two
#     And I have the cabin class two
#     And I have the departure location three
#     And I have the return location three
#     And I have the departure date three
#     And I have the cabin class three
#     And I have the departure location four
#     And I have the return location four
#     And I have the departure date four
#     And I have the cabin class four
#     And I have the departure location five
#     And I have the return location five
#     And I have the departure date five
#     And I have the cabin class five
#     And I have the departure location six
#     And I have the return location six
#     And I have the departure date six
#     And I have the cabin class six
#     And I have the market country code
#     And I have the trip type
#     And I have the number of adults
#     And I have the number of children
#     And I have the number of infants
#     And I have the direct flight option set to
#     And I have the baggage option set to
#     And I have the refundable option set to
#     # And I have enter the airline
#     When I generate the search URL
#     Then I should visit the generated URL
#     Then I click on the flight details
#     Then I click on the booknow
#     Then I need to add the traveller details for "Adult"
#     Then I need to add the traveller details for "Child"
#     Then I need to add the traveller details for "Infant"
#     Then I need to add the passenger common details
#     Then I need to click continue to payment
