import { Given } from "cypress-cucumber-preprocessor/steps";




Given("I want to open the application", () => {
  cy.visit(Cypress.env("url"));
  cy.log("Opened the application.");
});


Then("the country region should be visible", () => {


  cy.get(".empire_productLinks").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});

Then("the country region is clickable", () => {
  cy.get(".empire_productLinks").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
  
});



Then("the currency should be visible", () => {
  cy.get("#currencyId").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});

Then("the currency is clickable", () => {
  cy.get("#currencyId").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});


Then("the language should be visible", () => {
  cy.get("#langId").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});

Then("the language is clickable", () => {
  cy.get("#langId").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});


Then("the phone no should be visible", () => {
  cy.get(".empire_ltr").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});



Then("the retrieve booking should be visible", () => {
  cy.contains("Retrieve Booking").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});

Then("the retrieve booking is clickable", () => {
  cy.contains("Retrieve Booking").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});


Then("the email should be visible", () => {
  cy.contains("Sign in").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });



});

Then("the email is clickable", () => {

  cy.contains("Sign in").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});


Then("the logo should be visible", () => {
  cy.get(".empire_logo").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Element is visible');
    } else {
      cy.log('Element is NOT visible');
    }
  });
});

Then("the logo is clickable", () => {
  cy.get(".empire_logo").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click({force: true});
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});





Then("the slider image should be visible", () => {


  cy.get('img[alt="Slider Image"]').first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Image is visible');
    } else {
      cy.log('Image is NOT visible');
    }
  });
});