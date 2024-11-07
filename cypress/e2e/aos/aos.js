import { Given } from 'cypress-cucumber-preprocessor/steps';

let bookingData, adultData, childData, infantData, adultCount, childCount, infantCount, totalPassengersCount, tripType ,i=0;

const excelDateToString = (excelDate) => {
  const epoch = new Date(Date.UTC(1900, 0, 1));
  const date = new Date(epoch.setDate(epoch.getDate() + excelDate - 2));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

Given('I have the flight details from {string} with sheet {string} and index {int}', (filePath, sheetName, index) => {
  Cypress.env('dataIndex', index);

  cy.task('parseXlsxMultiSheet', { filePath, sheets: [sheetName] }).then((data) => {
    bookingData = data[sheetName]; // Data from Sheet1
    adultCount = bookingData[index]['Adults'];
    childCount = bookingData[index]['Children'];
    infantCount = bookingData[index]['Infants'];
    tripType = bookingData[index]['Key'];
    totalPassengersCount = adultCount + childCount + infantCount;
    
    Cypress.env('adultCount', adultCount);
    Cypress.env('childCount', childCount);
    Cypress.env('infantCount', infantCount);
    Cypress.env('totalPassengersCount', totalPassengersCount);
    Cypress.env('tripType', tripType);
    Cypress.env('bookingData',bookingData)

    cy.log('tripType:', tripType);
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
let params_ow = {
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

let params_rt = {
  dep1: '',       // Departure location for leg 1
  ret1: '',       // Return location for leg 1
  dtt1: '',       // Departure date for leg 1
  cl1: '',        // Cabin class for leg 1
  dep2: '',       // Departure location for leg 2 (return)
  ret2: '',       // Return location for leg 2 (if needed)
  dtt2: '',       // Departure date for leg 2
  cl2: '',        // Cabin class for leg 2
  mgcc: 'IN',     // Market country code
  triptype: '',   // Trip type (1 = one-way, 2 = round-trip)
  adult: '',      // Number of adult passengers
  child: '',      // Number of child passengers
  infant: '',     // Number of infant passengers
  direct: '',     // Direct flight option
  baggage: '',    // Baggage option
  pft: '',        // Placeholder for optional features
  key: 'IRT',     // Search type key (IRT for international round-trip)
  airlines: '',   // Airlines filter
  ref: 'false',   // Refundable option
  lc: 'EN',       // Language code
  ipc: 'false',   // IPC status (false for no IPC)
  currtime: Date.now() // Dynamic timestamp
};

let params_ms3 = {
  dep1: '', ret1: '', dtt1: '', cl1: '',
  dep2: '', ret2: '', dtt2: '', cl2: '',
  dep3: '', ret3: '', dtt3: '', cl3: '',
  mgcc: 'IN',
  triptype: '1',
  adult: '1',
  child: '0',
  infant: '0',
  direct: 'false',
  baggage: 'false',
  pft: '',
  key: 'MC',
  airlines: '',
  ref: 'false',
  lc: 'EN',
  currtime: Date.now()
};

let params_ms6 = {
  dep1: '', ret1: '', dtt1: '', cl1: '',
  dep2: '', ret2: '', dtt2: '', cl2: '',
  dep3: '', ret3: '', dtt3: '', cl3: '',
  dep4: '', ret4: '', dtt4: '', cl4: '',
  dep5: '', ret5: '', dtt5: '', cl5: '',
  dep6: '', ret6: '', dtt6: '', cl6: '',
  mgcc: 'IN',
  triptype: '',
  adult: '',
  child: '',
  infant: '',
  direct: '',
  baggage: '',
  pft: '',
  key: 'NMC',
  airlines: '',
  ref: 'false',
  lc: 'EN',
  currtime: Date.now()
};


Given('I have the departure location', () => {
  if (tripType === 'OW') {
    params_ow.dep1 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
  }
  
  if (tripType === 'IRT') {

    params_rt.dep1 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
  }

  if (tripType === 'MC') {

    params_ms3.dep1 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
   
  }
  if (tripType === 'NMC') {

    params_ms6.dep1 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
   
  }
});
Given('I have the departure return location', () => {
  
  
  if (tripType === 'IRT') {
    
    params_rt.dep2 = bookingData[Cypress.env('dataIndex')]['Return Location'];
  }
 
});

Given('I have the return location', () => {
  if (tripType === 'OW') {
    params_ow.ret1 = bookingData[Cypress.env('dataIndex')]['Return Location'];
  }
  if (tripType === 'IRT') {
    params_rt.ret1 = bookingData[Cypress.env('dataIndex')]['Return Location'];
  }
  if (tripType === 'MC') {

    params_ms3.ret1 = bookingData[Cypress.env('dataIndex')]['Return Location'];
   
  }
  if (tripType === 'NMC') {

    params_ms6.ret1 = bookingData[Cypress.env('dataIndex')]['Return Location'];
   
  }

});

Given('I have the return location two', () => {
  
  if (tripType === 'IRT') {
    params_rt.ret2 = bookingData[Cypress.env('dataIndex')]['Departure Location'];
  }
});






Given('I have the departure date', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date'];
  if (tripType === 'OW') {
    params_ow.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === 'IRT') {
    params_rt.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === 'MC') {
    params_ms3.dtt1 = excelDateToString(excelDate);
    
  }
  if (tripType === 'NMC') {
    params_ms6.dtt1 = excelDateToString(excelDate);
    
  }
  cy.log(`Fetched Departure Date: ${params_ow.dtt1 || params_rt.dtt1}`);
});



Given('I have the return date', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Return Date'];
  if (tripType === 'OW') {
    params_ow.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === 'IRT') {
    params_rt.dtt2 = excelDateToString(excelDate);
  }
  cy.log(`Fetched Return Date: ${params_ow.dtt1 || params_rt.dtt1}`);
});





Given('I have the cabin class', () => {
  if (tripType === 'OW') {
    params_ow.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
  }
  if (tripType === 'IRT') {
    params_rt.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
  }
  if (tripType === 'MC') {

    params_ms3.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
    
  }
  if (tripType === 'NMC') {

    params_ms6.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
    
  }
});
Given('I have the cabin return class', () => {
  if (tripType === 'OW') {
    params_ow.cl1 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
  }
  if (tripType === 'IRT') {
    params_rt.cl2 = bookingData[Cypress.env('dataIndex')]['Cabin Class'];
  }
});




Given('I have the departure location two', () => {
 
  if (tripType === 'MC') {

    params_ms3.dep2 = bookingData[Cypress.env('dataIndex')]['Departure Location 2'];
  }
  if (tripType === 'NMC') {

    params_ms6.dep2 = bookingData[Cypress.env('dataIndex')]['Departure Location 2'];
  }
});

Given('I have the departure location three', () => {
 
  if (tripType === 'MC') {

    params_ms3.dep3 = bookingData[Cypress.env('dataIndex')]['Departure Location 3'];
    
  }
  if (tripType === 'NMC') {

    params_ms6.dep3 = bookingData[Cypress.env('dataIndex')]['Departure Location 3'];
    
  }
});


Given('I have the return location twoo', () => {
  
  if (tripType === 'MC') {

    params_ms3.ret2 = bookingData[Cypress.env('dataIndex')]['Return Location 2'];
 
  }
  if (tripType === 'NMC') {

    params_ms6.ret2 = bookingData[Cypress.env('dataIndex')]['Return Location 2'];
 
  }

});

Given('I have the return location three', () => {
  
  if (tripType === 'MC') {

    params_ms3.ret3 = bookingData[Cypress.env('dataIndex')]['Return Location 3'];
    
  }
  if (tripType === 'NMC') {

    params_ms6.ret3 = bookingData[Cypress.env('dataIndex')]['Return Location 3'];
    
  }

});

Given('I have the departure date two', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 2'];
  
  if (tripType === 'MC') {
    params_ms3.dtt2 = excelDateToString(excelDate);
  }
  if (tripType === 'NMC') {
    params_ms6.dtt2 = excelDateToString(excelDate);
  }
 
});

// Given('I have the departure date two', () => {
//   const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 2'];
  
//   if (tripType === 'MC') {
//     params_ms3.dtt2 = excelDateToString(excelDate);
//   }
//   //cy.log(`Fetched Departure Date: ${params_ow.dtt1 || params_rt.dtt1}`);
// });

Given('I have the departure date three', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 3'];
  
  if (tripType === 'MC') {
    params_ms3.dtt3 = excelDateToString(excelDate);
  }

  if (tripType === 'NMC') {
    params_ms6.dtt3 = excelDateToString(excelDate);
  }
  
});




Given('I have the cabin class two', () => {
  
  if (tripType === 'MC') {

    params_ms3.cl2 = bookingData[Cypress.env('dataIndex')]['Cabin Class 2'];
   
  }
  if (tripType === 'NMC') {

    params_ms6.cl2 = bookingData[Cypress.env('dataIndex')]['Cabin Class 2'];
   
  }
});

Given('I have the cabin class three', () => {
  
  if (tripType === 'MC') {

    params_ms3.cl3 = bookingData[Cypress.env('dataIndex')]['Cabin Class 3'];
    
  }

  if (tripType === 'NMC') {

    params_ms6.cl3 = bookingData[Cypress.env('dataIndex')]['Cabin Class 3'];
    
  }
});







Given('I have the departure location four', () => {
 
  if (tripType === 'NMC') {

    params_ms6.dep4 = bookingData[Cypress.env('dataIndex')]['Departure Location 4'];
  }
 
});


Given('I have the return location four', () => {
  
  if (tripType === 'NMC') {

    params_ms6.ret4 = bookingData[Cypress.env('dataIndex')]['Return Location 4'];
    
  }
 
});

Given('I have the departure date four', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 4'];
  
  if (tripType === 'NMC') {
    params_ms6.dtt4 = excelDateToString(excelDate);
  }

 
  
});


Given('I have the cabin class four', () => {
  
  if (tripType === 'NMC') {

    params_ms6.cl4 = bookingData[Cypress.env('dataIndex')]['Cabin Class 4'];
    
  }
});




Given('I have the departure location five', () => {
 
  if (tripType === 'NMC') {

    params_ms6.dep5 = bookingData[Cypress.env('dataIndex')]['Departure Location 5'];
  }
 
});


Given('I have the return location five', () => {
  
  if (tripType === 'NMC') {

    params_ms6.ret5 = bookingData[Cypress.env('dataIndex')]['Return Location 5'];
    
  }
 
});

Given('I have the departure date five', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 5'];
  
  if (tripType === 'NMC') {
    params_ms6.dtt5 = excelDateToString(excelDate);
  }

 
  
});


Given('I have the cabin class five', () => {
  
  if (tripType === 'NMC') {

    params_ms6.cl5 = bookingData[Cypress.env('dataIndex')]['Cabin Class 5'];
    
  }
});


Given('I have the departure location six', () => {
 
  if (tripType === 'NMC') {

    params_ms6.dep6 = bookingData[Cypress.env('dataIndex')]['Departure Location 6'];
  }
 
});


Given('I have the return location six', () => {
  
  if (tripType === 'NMC') {

    params_ms6.ret6 = bookingData[Cypress.env('dataIndex')]['Return Location 6'];
    
  }
 
});

Given('I have the departure date six', () => {
  const excelDate = bookingData[Cypress.env('dataIndex')]['Departure Date 6'];
  
  if (tripType === 'NMC') {
    params_ms6.dtt6 = excelDateToString(excelDate);
  }

 
  
});


Given('I have the cabin class six', () => {
  
  if (tripType === 'NMC') {

    params_ms6.cl6 = bookingData[Cypress.env('dataIndex')]['Cabin Class 6'];
    
  }
});






Given('I have the market country code', () => {
  if (tripType === 'OW') {
    params_ow.mgcc = bookingData[Cypress.env('dataIndex')]['Market Country Code'];
  }
  if (tripType === 'IRT') {
    params_rt.mgcc = bookingData[Cypress.env('dataIndex')]['Market Country Code'];
  }
  if (tripType === 'MC') {
    params_ms3.mgcc = bookingData[Cypress.env('dataIndex')]['Market Country Code'];
   
  }
  if (tripType === 'NMC') {
    params_ms6.mgcc = bookingData[Cypress.env('dataIndex')]['Market Country Code'];
   
  }
});

Given('I have the trip type', () => {
  if (tripType === 'OW') {
    params_ow.triptype = bookingData[Cypress.env('dataIndex')]['Trip Type'];
  }
  if (tripType === 'IRT') {
    params_rt.triptype = bookingData[Cypress.env('dataIndex')]['Trip Type'];
  }
  if (tripType === 'MC') {
    params_ms3.triptype = bookingData[Cypress.env('dataIndex')]['Trip Type'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.triptype = bookingData[Cypress.env('dataIndex')]['Trip Type'];
    
  }
});

Given('I have the number of adults', () => {
  if (tripType === 'OW') {
    params_ow.adult = bookingData[Cypress.env('dataIndex')]['Adults'];
  }
  if (tripType === 'IRT') {
    params_rt.adult = bookingData[Cypress.env('dataIndex')]['Adults'];
  }
  if (tripType === 'MC') {
    params_ms3.adult = bookingData[Cypress.env('dataIndex')]['Adults'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.adult = bookingData[Cypress.env('dataIndex')]['Adults'];
    
  }
});

Given('I have the number of children', () => {
  if (tripType === 'OW') {
    params_ow.child = bookingData[Cypress.env('dataIndex')]['Children'];
  }
  if (tripType === 'IRT') {
    params_rt.child = bookingData[Cypress.env('dataIndex')]['Children'];
  }
  if (tripType === 'MC') {
    params_ms3.child = bookingData[Cypress.env('dataIndex')]['Children'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.child = bookingData[Cypress.env('dataIndex')]['Children'];
    
  }
});

Given('I have the number of infants', () => {
  if (tripType === 'OW') {
    params_ow.infant = bookingData[Cypress.env('dataIndex')]['Infants'];
  }
  if (tripType === 'IRT') {
    params_rt.infant = bookingData[Cypress.env('dataIndex')]['Infants'];
  }
  if (tripType === 'MC') {
    params_ms3.infant = bookingData[Cypress.env('dataIndex')]['Infants'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.infant = bookingData[Cypress.env('dataIndex')]['Infants'];
    
  }
});

Given('I have the direct flight option set to', () => {
  if (tripType === 'OW') {
    params_ow.direct = bookingData[Cypress.env('dataIndex')]['Direct Flight'];
  }
  if (tripType === 'IRT') {
    params_rt.direct = bookingData[Cypress.env('dataIndex')]['Direct Flight'];
  }
  if (tripType === 'MC') {
    params_ms3.direct = bookingData[Cypress.env('dataIndex')]['Direct Flight'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.direct = bookingData[Cypress.env('dataIndex')]['Direct Flight'];
    
  }
});

Given('I have the baggage option set to', () => {
  if (tripType === 'OW') {
    params_ow.baggage = bookingData[Cypress.env('dataIndex')]['Baggage'];
  }
  if (tripType === 'IRT') {
    params_rt.baggage = bookingData[Cypress.env('dataIndex')]['Baggage'];
  }
  if (tripType === 'MC') {
    params_ms3.baggage = bookingData[Cypress.env('dataIndex')]['Baggage'];
    
  }
  if (tripType === 'NMC') {
    params_ms6.baggage = bookingData[Cypress.env('dataIndex')]['Baggage'];
    
  }
});

Given('I have the refundable option set to', () => {
  if (tripType === 'OW') {
    params_ow.ref = bookingData[Cypress.env('dataIndex')]['Refundable'];
  }
  if (tripType === 'IRT') {
    params_rt.ref = bookingData[Cypress.env('dataIndex')]['Refundable'];
  }
  if (tripType === 'MC') {
    params_ms3.ref = bookingData[Cypress.env('dataIndex')]['Refundable'];
   
  }
  if (tripType === 'NMC') {
    params_ms6.ref = bookingData[Cypress.env('dataIndex')]['Refundable'];
   
  }
});

Given('I have the key parameter', () => {
  params.key = bookingData[Cypress.env('tripType')];
});


When('I generate the search URL', () => {
  let query;
  if(tripType === 'OW') {
     query = Object.entries(params_ow).map(([key, value]) => `${key}=${value}`).join('&');
  }
  if(tripType === 'IRT') {
    query = Object.entries(params_rt).map(([key, value]) => `${key}=${value}`).join('&');
  }
  if(tripType === 'MC') {
    query = Object.entries(params_ms3).map(([key, value]) => `${key}=${value}`).join('&');
   
  }

  if(tripType === 'NMC') {
    query = Object.entries(params_ms6).map(([key, value]) => `${key}=${value}`).join('&');
   
  }
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
  .type(rowData['PID Date']).contains(rowData['PID Date'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentIssueMonth']").eq(i).click()
  .should('be.visible')
  .type(rowData['PID Month']).contains(rowData['PID Month'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentIssueYear']").eq(i).click()
  .should('be.visible')
  .type(rowData['PID Year']).contains(rowData['PID Year'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryDay']").eq(i).click()
  .should('be.visible')
  .type(rowData['PED Date']).contains(rowData['PED Date'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryMonth']").eq(i).click()
  .should('be.visible')
  .type(rowData['PED Month']).contains(rowData['PED Month'])
  .should('be.visible')
  .click();

  cy.get("[formcontrolname='DocumentExpiryYear']").eq(i).click()
  .should('be.visible')
  .type(rowData['PED Year']).contains(rowData['PED Year'])
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

Then('I checking the origin and Destination as per search', () => {
  
  cy.get('.empireFlight_listing-card .empireFlight_airline-nameWrapper').each(($el, index, $list) => {
    // Extract the text of each matched element
    let expectedText = bookingData[Cypress.env('dataIndex')]['Departure Relevant Keyword'] +' to'+ bookingData[Cypress.env('dataIndex')]['Return Relevant Keyword'];

    cy.log('bookingData->'+bookingData)
   // cy.log('dataIndex->'+dataIndex)
    
    
    cy.log('expectedText->'+expectedText)
    // Assert the text of each element
    cy.wrap($el).invoke('text').then((text) => {
      cy.log('Actual Text: ' + text.trim()); // Log the actual text for debugging
      expect(text.trim()).to.equal(expectedText); // Compare actual and expected text
    });
  });
  
});

