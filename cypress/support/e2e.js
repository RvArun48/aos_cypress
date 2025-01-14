// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import './commands';

import 'cypress-real-events/support';

import softAssertions from 'cypress-soft-assertions';
softAssertions();


// cypress/support/e2e.js (or cypress/support/index.js)



// const installLogsCollector = require('cypress-log-to-output');
// installLogsCollector();

// installLogsCollector({
//     collectTypes: ['cy:command', 'cy:log', 'cy:warn', 'cy:error'],
//     filterLog: (log) => log.includes('custom'),
//   });
  

  Cypress.on('uncaught:exception', (err) => {
    // Ignore the "License not found" error
    if (err.message.includes('License not found')) {
      return false; // Prevent the error from failing the test
    }
    // Allow other exceptions to fail the test
  });
  

// Alternatively you can use CommonJS syntax:
// require('./commands')