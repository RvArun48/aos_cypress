import { Given } from "cypress-cucumber-preprocessor/steps";




Given("I want to open to the application", () => {
  cy.visit(Cypress.env("urlb2b"));
  cy.log("Opened the application.");
});