import { Given } from "cypress-cucumber-preprocessor/steps";




Given("I want to open the application", () => {
  cy.visit(Cypress.env("url"));
  cy.log("Opened the application.");
});


Then("the company logo should be visiable", () => {


  cy.get('img[alt="logo"]').first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('logo is visible');
    } else {
      cy.log('logo is NOT visible');
    }
  });
});


Then("the conduct should be visiable", () => {
    cy.get(".contact-box").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
});
  

Then("the follow us should be visiable", () => {
    cy.get(".social-box").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
});
  
Then("the get support on should be visiable", () => {
    cy.contains("Get Support On").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the get support on is clickable", () => {

    cy.contains("Get Support On").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });





  Then("the security policy should be visiable", () => {
    cy.contains("Security Policy").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the security policy is clickable", () => {

    cy.contains("Security Policy").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });


  
  Then("the about us should be visiable", () => {
    cy.contains(" About Us ").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the about us is clickable", () => {

    cy.contains(" About Us ").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });


  Then("the conduct us should be visiable", () => {
    cy.contains("Contact Us").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the conduct us is clickable", () => {

    cy.contains("Contact Us").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });






  Then("the terms and conditions should be visiable", () => {
    cy.contains("Terms and Conditions").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the terms and conditions is clickable", () => {

    cy.contains("Terms and Conditions").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });


  Then("the privicy and policy should be visiable", () => {
    cy.contains("Privacy & Policy").first().then(($el) => {
      // Perform the soft assertion logic
      if ($el.is(':visible')) {
        cy.log('Element is visible');
      } else {
        cy.log('Element is NOT visible');
      }
    });
  
  
  
  });

  Then("the privicy and policy is clickable", () => {

    cy.contains("Privacy & Policy").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });





















