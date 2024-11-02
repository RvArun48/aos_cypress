const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  env: {
    url: "https://ngtest.amadeusonlinesuite.com/flight/search?",
    allureResultsPath: 'cypress_task/allure-results',
    allureReuseAfterSpec: true,
    "allure": true,
    viewportWidth: 1600,
  },
  e2e: {
    setupNodeEvents(on, config) {
      console.log('Allure results path:', config.env.allureResultsPath);
      console.log('Allure enabled:', config.env.allure);
      
      addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));
      on('file:preprocessor', cucumber());
      
      // Task to parse Excel with a specified sheet and index
      on('task', {
        parseXlsxWithSheet({ filePath, sheetName }) {
          const absolutePath = path.resolve(filePath);
          const file = fs.readFileSync(absolutePath);
          const workbook = xlsx.read(file, { type: 'buffer' });
          
          // Check if sheet exists
          if (!workbook.SheetNames.includes(sheetName)) {
            throw new Error(`Sheet "${sheetName}" not found in file "${filePath}"`);
          }
          
          // Convert sheet to JSON and return data
          const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
          return jsonData;
        },
        parseXlsxMultiSheet({ filePath }) {
          const absolutePath = path.resolve(filePath);
          const file = fs.readFileSync(absolutePath);
          const workbook = xlsx.read(file, { type: 'buffer' });
          
          // Convert all sheets to JSON
          const allSheetsData = {};
          workbook.SheetNames.forEach((sheetName) => {
            allSheetsData[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
          });
          return allSheetsData;
        },
        
      });
      
        
      allureWriter(on, config);
      return config;
    },
    specPattern: "cypress/e2e/*.feature",
    supportFile: 'cypress/support/index.js',
  },
});


