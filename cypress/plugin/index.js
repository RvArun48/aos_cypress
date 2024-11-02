const xlsx = require('node-xlsx').default;
const fs = require('fs');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on, config) => {
  //Allure Plugin Configuration
 

  // Excel Parsing Task
  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath));
          resolve(workSheetsFromFile);
        } catch (e) {
          reject(e);
        }
      });
    },
  });
  allureWriter(on, config);
  return config; // Return the updated config for both Allure and Excel support
};




