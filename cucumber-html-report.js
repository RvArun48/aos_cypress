const report = require('multiple-cucumber-html-reporter');
const executionStartTime = new Date().toLocaleString();
const fs = require('fs');
const path = require('path');
const cucumberHtmlReporter = require('cucumber-html-reporter');

report.generate({
	jsonDir: 'cypress/cucumber-json',
	reportPath: './reports/cucumber-htmlreport.html',
    screenshotsDirectory: 'cypress/screenshots', // Path of screenshots
	metadata:{
        browser: {
            name: 'chrome',
            version: '130'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '10'

        }
    },
    customData: {
        title: 'Cypress',
        data: [
            {label: 'Project Name', value: 'Aos'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            { label: 'Execution Start Time', value: executionStartTime },
            { label: 'Execution End Time', value: new Date().toLocaleString() }
            
       
        ]
    },
   
});
