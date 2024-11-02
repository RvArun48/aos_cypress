import { Given } from 'cypress-cucumber-preprocessor/steps';

let bookingData, adultData, childData, infantData, adultCount, childCount, infantCount, totalPassengersCount,i=0;

const excelDateToString = (excelDate) => {
  const epoch = new Date(Date.UTC(1900, 0, 1));
  const date = new Date(epoch.setDate(epoch.getDate() + excelDate - 2));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

Given('I have the flight details from {string} with sheet {string} and index {int}', (filePath, sheetName, index) => {
  Cypress.env('dataIndex', index);

  cy.task('parseXlsxMultiSheet', { filePath, sheets: [sheetName] }).then((data) => {
    bookingData = data[sheetName]; // Data from Sheet1
    adultCount = bookingData[index]['Adults'];
    childCount = bookingData[index]['Children'];
    infantCount = bookingData[index]['Infants'];
    totalPassengersCount = adultCount + childCount + infantCount;
    
    Cypress.env('adultCount', adultCount);
    Cypress.env('childCount', childCount);
    Cypress.env('infantCount', infantCount);
    Cypress.env('totalPassengersCount', totalPassengersCount);

    if (!bookingData[index]) {
      throw new Error(`Row with index ${index} does not exist in one or both sheets.`);
    }
    cy.log('Sheet1 Data:', JSON.stringify(bookingData[index]));
   // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
  });
});

Given('I setup the test data for adult passengers from {string}', (filePath) => {
  let sheetName = 'Adult';
  cy.task('parseXlsxMultiSheet', { filePath, sheets: [sheetName] }).then((data) => {
    adultData = data[sheetName];
    Cypress.env('adultData', adultData);
    if (Array.isArray(adultData)) {
      // Loop through each row if childData is an array
      adultData.forEach((rowData, index) => {
        cy.log(`adult Data Row ${index}:`, JSON.stringify(rowData));
      });
    } else if (adultData && typeof adultData === 'object') {
      // Handle a single row as an object
      cy.log('Single Row adult Data:', JSON.stringify(adultData));
    } else {
      cy.log('No data found in adult sheet');
    }

    cy.log('Adult Data:', JSON.stringify(adultData[0]));
   // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
  });
});

Given('I setup the test data for child passengers from {string}', (filePath) => {
  let sheetName = 'Child';
  cy.task('parseXlsxMultiSheet', { filePath, sheets: [sheetName] }).then((data) => {
    
    childData = data[sheetName];

    Cypress.env('childData', childData);

    // if (!childData[index]) {
    //   throw new Error(`Row with index ${index} does not exist in one or both sheets.`);
    // }
    cy.log('Child Data:', JSON.stringify(childData[0]));
   // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
  });
});

Given('I setup the test data for infant passengers from {string}', (filePath) => {
let sheetName = 'Infant';
  cy.task('parseXlsxMultiSheet', { filePath, sheets: [sheetName] }).then((data) => {
   
    infantData = data[sheetName];
    Cypress.env('infantData', infantData);
    

    // if (!infantData[index]) {
    //   throw new Error(`Row with index ${index} does not exist in one or both sheets.`);
    // }
    cy.log('Infant Data:', JSON.stringify(infantData[0]));
   // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
  });
});


// Define the base URL and default query parameters
let baseUrl = "https://ngtest.amadeusonlinesuite.com/flight/search?";
let params = {
  dep1: '',
  ret1: '',
  dtt1: '',
  cl1: '',
  mgcc: 'IN',
  triptype: '',
  adult: '',
  child: '',
  infant: '',
  direct: '',
  baggage: '',
  pft: '',
  key: 'OW',
  airlines: '',
  ref: 'false',
  lc: 'EN',
  ipc: 'false',
  currtime: Date.now() // dynamically sets the current timestamp
};

// Step definitions that utilize the data from the specified sheet and index
Given('I have the departure location', () => {
 
  params.dep1 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
});

Given('I have the return location', () => {
  params.ret1 = bookingData[Cypress.env('dataIndex')]['Return Location'];
});

Given('I have the departure date', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date'];
  params.dtt1 = excelDateToString(excelDate);
  cy.log(`Fetched Departure Date: ${params.dtt1}`);
});

Given('I have the cabin class', () => {
  params.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
});

Given('I have the market country code', () => {
  params.mgcc = bookingData[Cypress.env('dataIndex')]['Market Country Code'];
});

Given('I have the trip type', () => {
  params.triptype = bookingData[Cypress.env('dataIndex')]['Trip Type'];
});

Given('I have the number of adults', () => {
  params.adult = bookingData[Cypress.env('dataIndex')]['Adults'];
});

Given('I have the number of children', () => {
  params.child = bookingData[Cypress.env('dataIndex')]['Children'];
});

Given('I have the number of infants', () => {
  params.infant = bookingData[Cypress.env('dataIndex')]['Infants'];
});

Given('I have the direct flight option set to', () => {
  params.direct = bookingData[Cypress.env('dataIndex')]['Direct Flight'];
});

Given('I have the baggage option set to', () => {
  params.baggage = bookingData[Cypress.env('dataIndex')]['Baggage'];
});

// Given('I have enter the airline', () => {
//   params.airlines = testdata[Cypress.env('dataIndex')]['Perairline'];
// });

Given('I have the refundable option set to', () => {
  params.ref = bookingData[Cypress.env('dataIndex')]['Refundable'];
});

When('I generate the search URL', () => {
  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  cy.wrap(`${baseUrl}${query}`).as('generatedUrl');
});

Then('I should visit the generated URL', function() {
  cy.get('@generatedUrl').then((url) => {
    cy.visit(url);
  });
});


Then("I click on the flight details", () => {
  cy.contains('Flight details').eq(0).click(); 


});

  
Then("I click on the booknow", () => {
  cy.contains('Book Now').click(); 


});




Then("I need to add the traveller details for {string}", (passengerType) => {
 let dataSet;
 let dataLimit;
 if(passengerType === 'Adult') {
  dataSet = Cypress.env('adultData');
  dataLimit = Cypress.env('adultCount');
 } else if(passengerType === 'Child') {
  dataSet = Cypress.env('childData');
  dataLimit = Cypress.env('childCount');
 } else if(passengerType === 'Infant') {
  dataSet = Cypress.env('infantData');
  dataLimit = Cypress.env('infantCount');
 }

 
 dataSet.forEach((rowData, index) => {
  cy.log(`${passengerType} Data Row ${index}:`, JSON.stringify(rowData));

  if (index >= 0 && index < dataLimit) {
  // Access specific fields in rowData if needed
  // e.g., cy.log(`Child Name: ${rowData['Name']}`);
  cy.get("[formcontrolname='Title']").eq(i).click()
  .should('be.visible')
  .type(rowData['Title']),

  cy.get("[formcontrolname='FirstName']").eq(i).click()
  .should('be.visible')
  .type(rowData['First Name']),

  cy.get("[formcontrolname='LastName']").eq(i).click()
  .should('be.visible')
  .type(rowData['Last Name']),

  cy.get("[formcontrolname='BirthDate']").eq(i).click()
  .should('be.visible')
  .type(rowData['DOB Date']).contains(rowData['DOB Date'])
  .should('be.visible') // Ensure the option is visible
  .click();
  cy.get("[formcontrolname='BirthMonth']").eq(i).click()
  .should('be.visible')
  .type(rowData['DOB Month']).contains(rowData['DOB Month'])
  .should('be.visible') // Ensure the option is visible
  .click();

  cy.get("[formcontrolname='BirthYear']").eq(i).click()
  .should('be.visible')
  .type(rowData['DOB Year']).contains(rowData['DOB Year'])
  .should('be.visible') // Ensure the option is visible
  .click();




  
   cy.get("[formcontrolname='DocumentNumber']").eq(i).click()
  .should('be.visible')
  .type(rowData['Passport No']),

  cy.get("[formcontrolname='DocumentIssuingCountry']").eq(i).click()
  .should('be.visible')
  .type(rowData['Issuing Country']).contains(rowData['Issuing Country'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='Nationality']").eq(i).click()
  .should('be.visible')
  .type(rowData['Nationality']).contains(rowData['Nationality'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentIssueDay']").eq(i).click()
  .should('be.visible')
  .type('10').contains('10')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentIssueMonth']").eq(i).click()
  .should('be.visible')
  .type('January').contains('January')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentIssueYear']").eq(i).click()
  .should('be.visible')
  .type('2020').contains('2020')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryDay']").eq(i).click()
  .should('be.visible')
  .type('10').contains('10')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryMonth']").eq(i).click()
  .should('be.visible')
  .type('January').contains('January')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryYear']").eq(i).click()
  .should('be.visible')
  .type('2030').contains('2030')
  .should('be.visible')
  .click();


  if(i>=totalPassengersCount) {
    i=0;
    } else {
      i++;
    }

  }
});

 
});


Then("I need to add the passenger common details", () => {
  
  cy.get("[formcontrolname='EmailAddress']").click()
  .should('be.visible')
  .type('arunrv@gmail.com')

  cy.get("[formcontrolname='phne_code']").click()
  .should('be.visible')
  .type('+91').contains('+91')
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='MobileNo']").click()
  .should('be.visible')
  .type('9791990640')

});

Then("I need to click continue to payment", () => {
  
  cy.contains('Continue to payment').click(),{ timeout: 20000 };
  cy.get('.empireF_ancillaryWrap').contains('Continue').click();

  cy.contains('Payfort Test').click();

  cy.contains(' Proceed to Pay ').click();
  
  cy.origin('https://sbcheckout.payfort.com', () => {
    // Inside this block, we can interact with elements on sbcheckout.payfort.com
    cy.get('input[id="cardNoInput"]').type('4111111111111111', { force: true });
    cy.get('#expDateInput').type('12/25', { force: true });
    cy.get('#cvvInput').type('123', { force: true });
    cy.get('input[id="chNameInput"]').type('Arun', { force: true });
  });

});







 