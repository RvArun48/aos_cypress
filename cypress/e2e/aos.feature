Feature: AOS Validation

  @oneway
  Scenario: Search for flights with specific details for one way trip
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
    Then I checking the origin and Destination as per search
    Then I click on the flight details
    Then I click on the booknow
    Then I need to add the traveller details for "Adult"
    Then I need to add the traveller details for "Child"
    Then I need to add the traveller details for "Infant"
    Then I need to add the passenger common details
    Then I need to click continue to payment

  @roundTrip
  Scenario: Search for flights with specific details for round trip
    Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "Roundtrip" and index 0
    Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
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
    # And I have enter the airline
    When I generate the search URL
    Then I should visit the generated URL
    Then I click on the flight details
    Then I click on the booknow
    Then I need to add the traveller details for "Adult"
    Then I need to add the traveller details for "Child"
    Then I need to add the traveller details for "Infant"
    Then I need to add the passenger common details
    Then I need to click continue to payment

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
    And I have the return location two
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
    Then I click on the flight details
    Then I click on the booknow
    Then I need to add the traveller details for "Adult"
    Then I need to add the traveller details for "Child"
    Then I need to add the traveller details for "Infant"
    Then I need to add the passenger common details
    Then I need to click continue to payment

  @multicitysix
  Scenario: Search for flights with specific details for multicity six
    Given I have the flight details from "cypress/fixtures/flightDetails.xlsx" with sheet "multicity sixsegment" and index 0
    Given I setup the test data for adult passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for child passengers from "cypress/fixtures/flightDetails.xlsx"
    Given I setup the test data for infant passengers from "cypress/fixtures/flightDetails.xlsx"
    And I have the departure location
    And I have the return location
    And I have the departure date
    And I have the cabin class
    And I have the departure location two
    And I have the return location two
    And I have the departure date two
    And I have the cabin class two
    And I have the departure location three
    And I have the return location three
    And I have the departure date three
    And I have the cabin class three
    And I have the departure location four
    And I have the return location four
    And I have the departure date four
    And I have the cabin class four
    And I have the departure location five
    And I have the return location five
    And I have the departure date five
    And I have the cabin class five
    And I have the departure location six
    And I have the return location six
    And I have the departure date six
    And I have the cabin class six
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
    Then I need to add the passenger common details
    Then I need to click continue to payment




