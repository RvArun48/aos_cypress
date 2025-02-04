// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('parseXlsx', (filePath) => {
    return cy.task('parseXlsx', { filePath });
  });

  Cypress.Commands.add('logMessage', (level, message) => {
    cy.task('logMessage', { level, message });
  });
  

 
  Cypress.on('uncaught:exception', (err) => {
    // Ignore the error if it contains a specific message
    if (err.message.includes('License not found')) {
      return false; // Return false to prevent failing the test
    }
    // For other errors, let them fail the test
    return true;
  });



  Cypress.Commands.add("softAssert", (callback, message) => {
    cy.wrap(null).then(() => {
      try {
        callback();
      } catch (error) {
        Cypress.env("softErrors", Cypress.env("softErrors") );
        // Cypress.env("softErrors").push(`${message}: ${error.message}`);
      }
    });
  });
  
  Cypress.Commands.add("softAssertAll", () => {
    cy.wrap(null).then(() => {
      const errors = Cypress.env("softErrors") || [];
      Cypress.env("softErrors", []); // Clear errors after reporting
      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }
    });
  });
  
  