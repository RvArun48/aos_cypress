const cucumber = require('cypress-cucumber-preprocessor').default;
const { defineConfig } = require("cypress");
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;


module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  env: {
    url: "https://demoisland.preprod.amadeusonlinesuite.com/flight/search?"
    
  },
  e2e: {
    setupNodeEvents(on, config) {
      
      addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
       
      }));
      on('task', {

       
        logIssue(issue) {
          console.error(issue);
          return null;
        },

        logMessage({ level, message }) {
          const logDir = path.join(__dirname, 'logs');
          const logFile = path.join(logDir, 'test-log.txt');

          // Ensure the directory exists
          if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
          }

          // Generate IST timestamp using `Intl.DateTimeFormat`
          const istFormatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Kolkata', // Explicitly set IST timezone
            dateStyle: 'short',      // Format as DD/MM/YYYY
            timeStyle: 'medium',     // Format as HH:mm:ss
            hour12: false,           // Use 24-hour format
          });
          const formattedTimestamp = istFormatter.format(new Date());

          // Log format: [Timestamp in IST] [LEVEL]: Message
          const logEntry = `[${formattedTimestamp} IST] [${level.toUpperCase()}]: ${message}\n`;

          // Write the log entry
          fs.appendFileSync(logFile, logEntry, 'utf8');

          return null;
        },
      });

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
      
        
      

      return config;
    },
   
    specPattern: "cypress/e2e/*.feature",
    supportFile: 'cypress/support/index.js',
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
});



