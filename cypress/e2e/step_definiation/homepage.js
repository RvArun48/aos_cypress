import { Given } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../../POM/HomePage"; 

const homePage = new HomePage(); 



Given("I want to open the application", () => {
    cy.visit(Cypress.env("url"));
cy.log("Opened the application.");
  });



When("the flight search section should be visible", () => {
  
  cy.get(".empireF_searchWrap").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Flight search section is visible');
    } else {
      cy.log('Flight search section is Not visible');
    }
  });
});

Then("the advanced search button should be visible", () => {
  cy.get(".AdvSearchOpt-btn").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Advanced search  section is visible');
    } else {
      cy.log('Advanced search  section is Not visible');
    }
  });
});

When("I click the flight button", () => {
  cy.contains("Flights").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el);
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  

When("the flight button action is verified", () => {
  cy.contains("Flights").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
      cy.get('#one-way').should('contain', 'Round Trip');
      cy.log(' Flight button action is verified');

    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  
When("I click the hotel button", () => {
  cy.contains("Hotels").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el);
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  

When("the hotel button action is verified", () => {
  cy.contains("Hotels").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
      cy.contains('Nationality').should('contain', 'Nationality');
      cy.log(' Hotel button action is verified');

    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
  });


  When("I click the sports button", () => {
    cy.contains("Sports").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el);
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    
  
  When("the sports button action is verified", () => {
    cy.contains("Sports").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
        cy.contains('Search Your Favourite').should('contain', 'Search Your Favourite');
        cy.log(' Sports button action is verified');
  
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    


  When("I click the packages button", () => {
    cy.contains("Packages").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el);
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    
  
  When("the packages button action is verified", () => {
    cy.contains("Packages").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
        cy.get('#HybdFlyingDropDown').should('contain', 'Flying From');
        cy.log(' Packages button action is verified');
  
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
    });
  




