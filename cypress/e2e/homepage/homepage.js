import { Given } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../POM/HomePage"; 

const homePage = new HomePage(); 



Given("I want to open the application", () => {
    cy.visit(Cypress.env("url"));
cy.log("Opened the application.");
  });

Then("the header should be visible", (component) => {
 
      homePage.getHeader().should("be.visible");
    
   
     homePage.getFooter().should("be.visible");
     
    
      homePage.getFlightSearchSection().should("be.visible");
    
 
      // homePage.getAdvancedSearchButton().should("be.visible");
     
});

When("I click the flight button", (button) => {
  
      homePage.getFlightButton().click();
     
      homePage.getHotelButton().click();
     
      homePage.getSportsButton().click();
      
});

Then("the {string} button action is verified", () => {
  // Add specific verification logic if needed
});

When("I switch to the {string} tab", (tab) => {
  switch (tab) {
    case "Round Trip":
      homePage.getRoundTripTab().click();
      break;
    case "One Way":
      homePage.clickOneWayTab();
      break;
    case "Multi City (3 Segment)":
      homePage.clickMultiCity3SegmentTab();
      break;
    case "Multi City":
      homePage.clickMultiCityTab();
      break;
    default:
      throw new Error(`Tab "${tab}" is not recognized`);
  }
});

Then("the {string} tab should be active", (tab) => {
  switch (tab) {
    case "Round Trip":
      homePage.getRoundTripTab().should("have.class", "mdc-tab--active");
      break;
    case "One Way":
      homePage.getOneWayTab().should("have.class", "mdc-tab--active");
      break;
    case "Multi City (3 Segment)":
      homePage.getMultiCity3SegmentTab().should("have.class", "mdc-tab--active");
      break;
    case "Multi City":
      homePage.getMultiCityTab().should("have.class", "mdc-tab--active");
      break;
    default:
      throw new Error(`Tab "${tab}" is not recognized`);
  }
});

When("I input {string} in the origin field", (origin) => {
  homePage.setOrigin(origin);
});

Then("I should select {string} from the dropdown", (selection) => {
  homePage.selectOriginFromDropdown(selection);
});

When("I select a date range for round trip", () => {
  homePage.selectDateRange(10, 15);
});

Then("the round trip date range is validated", () => {
  // Add validation logic for date range if necessary
});
