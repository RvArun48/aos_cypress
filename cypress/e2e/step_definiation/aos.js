import { Given } from "cypress-cucumber-preprocessor/steps";
import "cypress-real-events/support";
import 'cypress-soft-assertions';


let bookingData,
  adultData,
  childData,
  infantData,
  adultCount,
  childCount,
  infantCount,
  totalPassengersCount,
  tripType,
  i = 0;

let issues = [];
const excelDateToString = (excelDate) => {
  const epoch = new Date(Date.UTC(1900, 0, 1));
  const date = new Date(epoch.setDate(epoch.getDate() + excelDate - 2));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
  return `${month}-${day}-${year}`;
};

Given(
  "I have the flight details from {string} with sheet {string} for test case ID {string}",
  (filePath, sheetName, testCaseId) => {
    let index = parseInt(testCaseId.replace(/\D/g, ""), 10) - 1;
    cy.log("index->" + index);
    Cypress.env("dataIndex", index);

    cy.task("parseXlsxMultiSheet", { filePath, sheets: [sheetName] }).then(
      (data) => {
        bookingData = data[sheetName]; // Data from Sheet1
        adultCount = bookingData[index]["Adults"];
        childCount = bookingData[index]["Children"];
        infantCount = bookingData[index]["Infants"];
        tripType = bookingData[index]["Key"];
        totalPassengersCount = adultCount + childCount + infantCount;

        Cypress.env("adultCount", adultCount);
        Cypress.env("childCount", childCount);
        Cypress.env("infantCount", infantCount);
        Cypress.env("totalPassengersCount", totalPassengersCount);
        Cypress.env("tripType", tripType);
        Cypress.env("bookingData", bookingData);

        cy.log("tripType:", tripType);
        if (!bookingData[index]) {
          throw new Error(
            `Row with index ${index} does not exist in one or both sheets.`
          );
        }
        cy.log("Sheet1 Data:", JSON.stringify(bookingData[index]));
        // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
      }
    );
  }
);

Given(
  "I setup the test data for adult passengers from {string}",
  (filePath) => {
    let sheetName = "Adult";
    cy.task("parseXlsxMultiSheet", { filePath, sheets: [sheetName] }).then(
      (data) => {
        adultData = data[sheetName];
        Cypress.env("adultData", adultData);
        if (Array.isArray(adultData)) {
          // Loop through each row if childData is an array
          adultData.forEach((rowData, index) => {
            cy.log(`adult Data Row ${index}:`, JSON.stringify(rowData));
          });
        } else if (adultData && typeof adultData === "object") {
          // Handle a single row as an object
          cy.log("Single Row adult Data:", JSON.stringify(adultData));
        } else {
          cy.log("No data found in adult sheet");
        }

        cy.log("Adult Data:", JSON.stringify(adultData[0]));
        // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
      }
    );
  }
);

Given(
  "I setup the test data for child passengers from {string}",
  (filePath) => {
    let sheetName = "Child";
    cy.task("parseXlsxMultiSheet", { filePath, sheets: [sheetName] }).then(
      (data) => {
        childData = data[sheetName];

        Cypress.env("childData", childData);

        // if (!childData[index]) {
        //   throw new Error(`Row with index ${index} does not exist in one or both sheets.`);
        // }
        cy.log("Child Data:", JSON.stringify(childData[0]));
        // cy.log('Sheet2 Data:', JSON.stringify(sheet2Data[index]));
      }
    );
  }
);

Given(
  "I setup the test data for infant passengers from {string}",
  (filePath) => {
    let sheetName = "Infant";
    cy.task("parseXlsxMultiSheet", { filePath, sheets: [sheetName] }).then(
      (data) => {
        infantData = data[sheetName];
        Cypress.env("infantData", infantData);

        cy.log("Infant Data:", JSON.stringify(infantData[0]));
      }
    );
  }
);

Given("I setup the test data for card details from {string}", (filePath) => {});

// Define the base URL and default query parameters
let baseUrl = Cypress.env("url");
let params_ow = {
  dep1: "",
  ret1: "",
  dtt1: "",
  cl1: "",
  mgcc: "IN",
  triptype: "",
  adult: "",
  child: "",
  infant: "",
  direct: "",
  baggage: "",
  pft: "",
  key: "OW",
  airlines: "",
  ref: "false",
  lc: "EN",
  ipc: "false",
  currtime: Date.now(), // dynamically sets the current timestamp
};

let params_rt = {
  dep1: "", // Departure location for leg 1
  ret1: "", // Return location for leg 1
  dtt1: "", // Departure date for leg 1
  cl1: "", // Cabin class for leg 1
  dep2: "", // Departure location for leg 2 (return)
  ret2: "", // Return location for leg 2 (if needed)
  dtt2: "", // Departure date for leg 2
  cl2: "", // Cabin class for leg 2
  mgcc: "IN", // Market country code
  triptype: "", // Trip type (1 = one-way, 2 = round-trip)
  adult: "", // Number of adult passengers
  child: "", // Number of child passengers
  infant: "", // Number of infant passengers
  direct: "", // Direct flight option
  baggage: "", // Baggage option
  pft: "", // Placeholder for optional features
  key: "IRT", // Search type key (IRT for international round-trip)
  airlines: "", // Airlines filter
  ref: "false", // Refundable option
  lc: "EN", // Language code
  ipc: "false", // IPC status (false for no IPC)
  currtime: Date.now(), // Dynamic timestamp
};

let params_ms3 = {
  dep1: "",
  ret1: "",
  dtt1: "",
  cl1: "",
  dep2: "",
  ret2: "",
  dtt2: "",
  cl2: "",
  dep3: "",
  ret3: "",
  dtt3: "",
  cl3: "",
  mgcc: "IN",
  triptype: "1",
  adult: "1",
  child: "0",
  infant: "0",
  direct: "false",
  baggage: "false",
  pft: "",
  key: "MC",
  airlines: "",
  ref: "false",
  lc: "EN",
  currtime: Date.now(),
};

let params_ms6 = {
  dep1: "",
  ret1: "",
  dtt1: "",
  cl1: "",
  dep2: "",
  ret2: "",
  dtt2: "",
  cl2: "",
  dep3: "",
  ret3: "",
  dtt3: "",
  cl3: "",
  dep4: "",
  ret4: "",
  dtt4: "",
  cl4: "",
  dep5: "",
  ret5: "",
  dtt5: "",
  cl5: "",
  dep6: "",
  ret6: "",
  dtt6: "",
  cl6: "",
  mgcc: "IN",
  triptype: "",
  adult: "",
  child: "",
  infant: "",
  direct: "",
  baggage: "",
  pft: "",
  key: "NMC",
  airlines: "",
  ref: "false",
  lc: "EN",
  currtime: Date.now(),
};

Given("I have the departure location", () => {
  if (tripType === "OW") {
    params_ow.dep1 =
      bookingData[Cypress.env("dataIndex")]["Departure Location"];
    cy.logMessage("info", "I have the departure location as " + params_ow.dep1);
  }

  if (tripType === "IRT") {
    params_rt.dep1 =
      bookingData[Cypress.env("dataIndex")]["Departure Location"];
  }

  if (tripType === "MC") {
    params_ms3.dep1 =
      bookingData[Cypress.env("dataIndex")]["Departure Location"];
  }
  if (tripType === "NMC") {
    params_ms6.dep1 =
      bookingData[Cypress.env("dataIndex")]["Departure Location"];
  }
});
Given("I have the departure return location", () => {
  if (tripType === "IRT") {
    params_rt.dep2 = bookingData[Cypress.env("dataIndex")]["Return Location"];
  }
});

Given("I have the return location", () => {
  if (tripType === "OW") {
    params_ow.ret1 = bookingData[Cypress.env("dataIndex")]["Return Location"];
    cy.logMessage("info", "I have the return location " + params_ow.ret1);
  }
  if (tripType === "IRT") {
    params_rt.ret1 = bookingData[Cypress.env("dataIndex")]["Return Location"];
  }
  if (tripType === "MC") {
    params_ms3.ret1 = bookingData[Cypress.env("dataIndex")]["Return Location"];
  }
  if (tripType === "NMC") {
    params_ms6.ret1 = bookingData[Cypress.env("dataIndex")]["Return Location"];
  }
});

Given("I have the return location two", () => {
  if (tripType === "IRT") {
    params_rt.ret2 =
      bookingData[Cypress.env("dataIndex")]["Departure Location"];
  }
});

Given("I have the departure date", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date"];
  if (tripType === "OW") {
    params_ow.dtt1 = excelDateToString(excelDate);
    cy.logMessage("info", "I have the departure date " + params_ow.dtt1);
  }
  if (tripType === "IRT") {
    params_rt.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === "MC") {
    params_ms3.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === "NMC") {
    params_ms6.dtt1 = excelDateToString(excelDate);
  }
  cy.log(`Fetched Departure Date: ${params_ow.dtt1 || params_rt.dtt1}`);
});

Given("I have the return date", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Return Date"];
  if (tripType === "OW") {
    params_ow.dtt1 = excelDateToString(excelDate);
  }
  if (tripType === "IRT") {
    params_rt.dtt2 = excelDateToString(excelDate);
  }
  cy.log(`Fetched Return Date: ${params_ow.dtt1 || params_rt.dtt1}`);
});

Given("I have the cabin class", () => {
  if (tripType === "OW") {
    params_ow.cl1 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
    cy.logMessage("info", "I have the cabin class " + params_ow.cl1);
  }
  if (tripType === "IRT") {
    params_rt.cl1 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
  }
  if (tripType === "MC") {
    params_ms3.cl1 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
  }
  if (tripType === "NMC") {
    params_ms6.cl1 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
  }
});
Given("I have the cabin return class", () => {
  if (tripType === "OW") {
    params_ow.cl1 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
  }
  if (tripType === "IRT") {
    params_rt.cl2 = bookingData[Cypress.env("dataIndex")]["Cabin Class"];
  }
});

Given("I have the departure location two", () => {
  if (tripType === "MC") {
    params_ms3.dep2 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 2"];
  }
  if (tripType === "NMC") {
    params_ms6.dep2 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 2"];
  }
});

Given("I have the departure location three", () => {
  if (tripType === "MC") {
    params_ms3.dep3 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 3"];
  }
  if (tripType === "NMC") {
    params_ms6.dep3 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 3"];
  }
});

Given("I have the return location twoo", () => {
  if (tripType === "MC") {
    params_ms3.ret2 =
      bookingData[Cypress.env("dataIndex")]["Return Location 2"];
  }
  if (tripType === "NMC") {
    params_ms6.ret2 =
      bookingData[Cypress.env("dataIndex")]["Return Location 2"];
  }
});

Given("I have the return location three", () => {
  if (tripType === "MC") {
    params_ms3.ret3 =
      bookingData[Cypress.env("dataIndex")]["Return Location 3"];
  }
  if (tripType === "NMC") {
    params_ms6.ret3 =
      bookingData[Cypress.env("dataIndex")]["Return Location 3"];
  }
});

Given("I have the departure date two", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date 2"];

  if (tripType === "MC") {
    params_ms3.dtt2 = excelDateToString(excelDate);
  }
  if (tripType === "NMC") {
    params_ms6.dtt2 = excelDateToString(excelDate);
  }
});

Given("I have the departure date three", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date 3"];

  if (tripType === "MC") {
    params_ms3.dtt3 = excelDateToString(excelDate);
  }

  if (tripType === "NMC") {
    params_ms6.dtt3 = excelDateToString(excelDate);
  }
});

Given("I have the cabin class two", () => {
  if (tripType === "MC") {
    params_ms3.cl2 = bookingData[Cypress.env("dataIndex")]["Cabin Class 2"];
  }
  if (tripType === "NMC") {
    params_ms6.cl2 = bookingData[Cypress.env("dataIndex")]["Cabin Class 2"];
  }
});

Given("I have the cabin class three", () => {
  if (tripType === "MC") {
    params_ms3.cl3 = bookingData[Cypress.env("dataIndex")]["Cabin Class 3"];
  }

  if (tripType === "NMC") {
    params_ms6.cl3 = bookingData[Cypress.env("dataIndex")]["Cabin Class 3"];
  }
});

Given("I have the departure location four", () => {
  if (tripType === "NMC") {
    params_ms6.dep4 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 4"];
  }
});

Given("I have the return location four", () => {
  if (tripType === "NMC") {
    params_ms6.ret4 =
      bookingData[Cypress.env("dataIndex")]["Return Location 4"];
  }
});

Given("I have the departure date four", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date 4"];

  if (tripType === "NMC") {
    params_ms6.dtt4 = excelDateToString(excelDate);
  }
});

Given("I have the cabin class four", () => {
  if (tripType === "NMC") {
    params_ms6.cl4 = bookingData[Cypress.env("dataIndex")]["Cabin Class 4"];
  }
});

Given("I have the departure location five", () => {
  if (tripType === "NMC") {
    params_ms6.dep5 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 5"];
  }
});

Given("I have the return location five", () => {
  if (tripType === "NMC") {
    params_ms6.ret5 =
      bookingData[Cypress.env("dataIndex")]["Return Location 5"];
  }
});

Given("I have the departure date five", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date 5"];

  if (tripType === "NMC") {
    params_ms6.dtt5 = excelDateToString(excelDate);
  }
});

Given("I have the cabin class five", () => {
  if (tripType === "NMC") {
    params_ms6.cl5 = bookingData[Cypress.env("dataIndex")]["Cabin Class 5"];
  }
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





Given("I have the departure location six", () => {
  if (tripType === "NMC") {
    params_ms6.dep6 =
      bookingData[Cypress.env("dataIndex")]["Departure Location 6"];
  }
});

Given("I have the return location six", () => {
  if (tripType === "NMC") {
    params_ms6.ret6 =
      bookingData[Cypress.env("dataIndex")]["Return Location 6"];
  }
});

Given("I have the departure date six", () => {
  const excelDate = bookingData[Cypress.env("dataIndex")]["Departure Date 6"];

  if (tripType === "NMC") {
    params_ms6.dtt6 = excelDateToString(excelDate);
  }
});

Given("I have the cabin class six", () => {
  if (tripType === "NMC") {
    params_ms6.cl6 = bookingData[Cypress.env("dataIndex")]["Cabin Class 6"];
  }
});

Given("I have the market country code", () => {
  if (tripType === "OW") {
    params_ow.mgcc =
      bookingData[Cypress.env("dataIndex")]["Market Country Code"];
  }
  if (tripType === "IRT") {
    params_rt.mgcc =
      bookingData[Cypress.env("dataIndex")]["Market Country Code"];
  }
  if (tripType === "MC") {
    params_ms3.mgcc =
      bookingData[Cypress.env("dataIndex")]["Market Country Code"];
  }
  if (tripType === "NMC") {
    params_ms6.mgcc =
      bookingData[Cypress.env("dataIndex")]["Market Country Code"];
  }
});

Given("I have enter the airline", () => {
  const preferredAirline =
    bookingData[Cypress.env("dataIndex")]["Preferred Airline"];

  if (preferredAirline) {
    // Check if airline is available
    if (tripType === "OW") {
      params_ow.airlines = preferredAirline;
      cy.logMessage("info", "I have entered the airline " + params_ow.airlines);
    } else if (tripType === "IRT") {
      params_rt.airlines = preferredAirline;
    } else if (tripType === "MC") {
      params_ms3.airlines = preferredAirline;
    } else if (tripType === "NMC") {
      params_ms6.airlines = preferredAirline;
    }
  } else {
    cy.logMessage("info", "No airline available, skipping...");
  }
});

Given("I have the trip type", () => {
  if (tripType === "OW") {
    params_ow.triptype = bookingData[Cypress.env("dataIndex")]["Trip Type"];
  }
  if (tripType === "IRT") {
    params_rt.triptype = bookingData[Cypress.env("dataIndex")]["Trip Type"];
  }
  if (tripType === "MC") {
    params_ms3.triptype = bookingData[Cypress.env("dataIndex")]["Trip Type"];
  }
  if (tripType === "NMC") {
    params_ms6.triptype = bookingData[Cypress.env("dataIndex")]["Trip Type"];
  }
});

Given("I have the number of adults", () => {
  if (tripType === "OW") {
    params_ow.adult = bookingData[Cypress.env("dataIndex")]["Adults"];
    cy.logMessage("info", "I have the number of adults " + params_ow.adult);
  }
  if (tripType === "IRT") {
    params_rt.adult = bookingData[Cypress.env("dataIndex")]["Adults"];
  }
  if (tripType === "MC") {
    params_ms3.adult = bookingData[Cypress.env("dataIndex")]["Adults"];
  }
  if (tripType === "NMC") {
    params_ms6.adult = bookingData[Cypress.env("dataIndex")]["Adults"];
  }
});

Given("I have the number of children", () => {
  if (tripType === "OW") {
    params_ow.child = bookingData[Cypress.env("dataIndex")]["Children"];
    cy.logMessage("info", "I have the number of children " + params_ow.child);
  }
  if (tripType === "IRT") {
    params_rt.child = bookingData[Cypress.env("dataIndex")]["Children"];
  }
  if (tripType === "MC") {
    params_ms3.child = bookingData[Cypress.env("dataIndex")]["Children"];
  }
  if (tripType === "NMC") {
    params_ms6.child = bookingData[Cypress.env("dataIndex")]["Children"];
  }
});

Given("I have the number of infants", () => {
  if (tripType === "OW") {
    params_ow.infant = bookingData[Cypress.env("dataIndex")]["Infants"];
    cy.logMessage("info", "I have the number of infand " + params_ow.infant);
  }
  if (tripType === "IRT") {
    params_rt.infant = bookingData[Cypress.env("dataIndex")]["Infants"];
  }
  if (tripType === "MC") {
    params_ms3.infant = bookingData[Cypress.env("dataIndex")]["Infants"];
  }
  if (tripType === "NMC") {
    params_ms6.infant = bookingData[Cypress.env("dataIndex")]["Infants"];
  }
});

Given("I have the direct flight option set to", () => {
  if (tripType === "OW") {
    params_ow.direct = bookingData[Cypress.env("dataIndex")]["Direct Flight"];
    cy.logMessage(
      "info",
      "I have the direct flight option set to " + params_ow.direct
    );
  }
  if (tripType === "IRT") {
    params_rt.direct = bookingData[Cypress.env("dataIndex")]["Direct Flight"];
  }
  if (tripType === "MC") {
    params_ms3.direct = bookingData[Cypress.env("dataIndex")]["Direct Flight"];
  }
  if (tripType === "NMC") {
    params_ms6.direct = bookingData[Cypress.env("dataIndex")]["Direct Flight"];
  }
});

Given("I have the baggage option set to", () => {
  if (tripType === "OW") {
    params_ow.baggage = bookingData[Cypress.env("dataIndex")]["Baggage"];
    cy.logMessage(
      "info",
      "I have the baggage option set to " + params_ow.baggage
    );
  }
  if (tripType === "IRT") {
    params_rt.baggage = bookingData[Cypress.env("dataIndex")]["Baggage"];
  }
  if (tripType === "MC") {
    params_ms3.baggage = bookingData[Cypress.env("dataIndex")]["Baggage"];
  }
  if (tripType === "NMC") {
    params_ms6.baggage = bookingData[Cypress.env("dataIndex")]["Baggage"];
  }
});

Given("I have the refundable option set to", () => {
  if (tripType === "OW") {
    params_ow.ref = bookingData[Cypress.env("dataIndex")]["Refundable"];
    cy.logMessage(
      "info",
      "I have the refundable option set to " + params_ow.ref
    );
  }
  if (tripType === "IRT") {
    params_rt.ref = bookingData[Cypress.env("dataIndex")]["Refundable"];
  }
  if (tripType === "MC") {
    params_ms3.ref = bookingData[Cypress.env("dataIndex")]["Refundable"];
  }
  if (tripType === "NMC") {
    params_ms6.ref = bookingData[Cypress.env("dataIndex")]["Refundable"];
  }
});

Given("I have the key parameter", () => {
  params.key = bookingData[Cypress.env("tripType")];
});

When("I generate the search URL", () => {
  let query;
  if (tripType === "OW") {
    query = Object.entries(params_ow)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
  if (tripType === "IRT") {
    query = Object.entries(params_rt)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
  if (tripType === "MC") {
    query = Object.entries(params_ms3)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  if (tripType === "NMC") {
    query = Object.entries(params_ms6)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }
  cy.wrap(`${baseUrl}${query}`).as("generatedUrl");
});

Then("I should visit the generated URL", function () {
  cy.get("@generatedUrl").then((url) => {
    cy.visit(url);
   
  });
});

Then("I click on the flight details", () => {
  cy.contains("Flight details").should("be.visible");

  cy.get(".empireFlight_details-text") // Shortened selector for flight details
    .should("have.length.greaterThan", 0) // Ensure there are flight details available
    .then(($flightDetails) => {
      // Log the number of flight details to the console for debugging
      cy.log(`Found ${$flightDetails.length} flight details`);

      // Generate a random index based on the number of available flight details
      const randomIndex = Math.floor(Math.random() * $flightDetails.length);

      // Log the selected random index
      cy.log(`Selected flight detail index: ${randomIndex}`);

      // Click the random flight detail
      cy.wrap($flightDetails[randomIndex]).click();

      // Optionally, you can add a wait for the details to load or for a new page to appear
      cy.wait(1000); // Adjust based on your loading times, or use .should('be.visible') on a new element
    });
  
    cy.get('body').then(($body) => {
      if ($body.find("Continue").length) { // Check if the element exists
        cy.contains('Continue') // Find the element with text "Continue"
          .should('be.visible') // Ensure the element is visible
          .click(); // Click the element
      } else {
        cy.log('Popup does not appear. Skipping this step.');
      }
    });
    

});

Then("I click on the booknow", () => {
  cy.contains("Book Now").click();
});

Then("I need to add the traveller details for {string}", (passengerType) => {
  let dataSet;
  let dataLimit;
 

  if (passengerType === "Adult") {
    dataSet = Cypress.env("adultData");
    dataLimit = Cypress.env("adultCount");
  } else if (passengerType === "Child") {
    dataSet = Cypress.env("childData");
    dataLimit = Cypress.env("childCount");
  } else if (passengerType === "Infant") {
    dataSet = Cypress.env("infantData");
    dataLimit = Cypress.env("infantCount");
  }
 
  dataSet.forEach((rowData, index) => {
    cy.log(`${passengerType} Data Row ${index}:`, JSON.stringify(rowData));

    if (index >= 0 && index < dataLimit) {
      // Access specific fields in rowData if needed
      // e.g., cy.log(`Child Name: ${rowData['Name']}`);
      cy
        .get("[formcontrolname='Title']")
        .eq(i)
        .click()
        .should("be.visible")
        .type(rowData["Title"]),
        cy.logMessage(
          "info",
          "I enter the passenger title " + rowData["Title"]
        );

      cy
        .get("[formcontrolname='FirstName']")
        .eq(i)
        .click()
        .should("be.visible")
        .type(rowData["First Name"]),
        cy
          .get("[formcontrolname='LastName']")
          .eq(i)
          .click()
          .should("be.visible")
          .type(rowData["Last Name"]),
        cy
          .get("[formcontrolname='BirthDate']")
          .eq(i)
          .click()
          .should("be.visible")
          .type(rowData["DOB Date"])
          .contains(rowData["DOB Date"])
          .should("be.visible") // Ensure the option is visible
          .click();
      cy.get("[formcontrolname='BirthMonth']")
        .eq(i)
        .click()
        .should("be.visible")
        .type(rowData["DOB Month"])
        .contains(rowData["DOB Month"])
        .should("be.visible") // Ensure the option is visible
        .click();
      

        cy.get("[formcontrolname='BirthYear']")
        .eq(i)
        .click()
        .should("be.visible")
        .type(rowData["DOB Year"])
        .contains(rowData["DOB Year"])
        .should("be.visible") // Ensure the option is visible
        .click();
        
        // cy.get("[formcontrolname='BirthYeear']", { timeout: 0 }).eq(i).then(($el) => {
        //   if ($el.length > 0 && Cypress.$($el).is(':visible')) {
        //     cy.wrap($el).click().type(rowData["DOB Year"]);
        //     cy.contains(rowData["DOB Year"]).should("be.visible").click();
        //   } else {
        //     cy.log("BirthYear field is not available, skipping...");
        //   }
        // });
      
      
      

      // cy.get('body').then(($body) => {
      //   if ($body.find("[formcontrolname='BirthYear']").length > 0) {
      //     cy.log('BirthYear is present, filling in the details.');
          
      //     cy.get("[formcontrolname='BirthYear']")
      //       .eq(i) // Target the correct element for this iteration
      //       .should('be.visible') // Ensure the element is visible
      //       .click()
      //       .type(rowData["DOB Year"]) // Type the DOB Year into the field
      //       .contains(rowData["DOB Year"]) // Ensure the value is present in the dropdown
      //       .should("be.visible") // Ensure the option is visible
      //       .click(); // Select the option
      //   } else {
      //     cy.log('BirthYear is not present. Skipping this step.');
      //   }
      // });

      
      
       

     
     





      // cy.get('body').then(($body) => {
      //   if ($body.find(":contains('Document Type')").length > 0) {
      //     cy.log('Passport Information is present, filling in the details.');

      //     const documentType = rowData['Document type'];
      //     cy.contains(documentType).click({ force: true });
      
        // if (documentType === 'Passport Information') {
          

          cy.get("[formcontrolname='DocumentNumber']")
            .eq(i)
            .should('be.visible') // Ensures the element is visible
            .click()
            .type(rowData["Passport No"])
            .should("be.visible") // Ensure the option is visible
            .click();
      
          cy.get("[formcontrolname='Nationality']")
          .eq(i)
            .should('be.visible') // Ensures the element is visible
            .click()
            .type(rowData["Nationality"])
            .contains(rowData["Nationality"])
            .should("be.visible") // Ensure the option is visible
            .click();
          
          
              cy.get("[formcontrolname='DocumentIssuingCountry']")
              .eq(i)
              .should('be.visible') // Ensures the element is visible
              .click()
                .type(rowData["Issuing Country"])
                .contains(rowData["Issuing Country"])
                .should("be.visible") // Ensure the option is visible
                .click();
          
          
          
                cy.get("[formcontrolname='DocumentIssueDay']")
                .eq(i)
                .should('be.visible') // Ensures the element is visible
                  .click()
                  
                  .type(rowData["PID Date"])
                  .contains(rowData["PID Date"])
                  .should("be.visible") // Ensure the option is visible
                  .click();
          
                  cy.get("[formcontrolname='DocumentIssueMonth']")
                  .eq(i)
                  .should('be.visible') // Ensures the element is visible
                  .click()
                    .type(rowData["PID Month"])
                    .contains(rowData["PID Month"])
                    .should("be.visible") // Ensure the option is visible
                    .click();
          
                    cy.get("[formcontrolname='DocumentIssueYear']")
                    .eq(i)
                    .should('be.visible') // Ensures the element is visible
                    .click()
                      .type(rowData["PID Year"])
                      .contains(rowData["PID Year"])
                      .should("be.visible") // Ensure the option is visible
                      .click();
          
          
          
          
          
          
          
          
                      cy.get("[formcontrolname='DocumentExpiryDay']")
                      .eq(i)
                      .should('be.visible') // Ensures the element is visible
                        .click()
                        
                        .type(rowData["PED Date"])
                        .contains(rowData["PED Date"])
                        .should("be.visible") // Ensure the option is visible
                        .click();
                
                        cy.get("[formcontrolname='DocumentExpiryMonth']")
                        .eq(i)
                        .should('be.visible') // Ensures the element is visible
                        .click()
                          .type(rowData["PED Month"])
                          .contains(rowData["PED Month"])
                          .should("be.visible") // Ensure the option is visible
                          .click();
                
                          cy.get("[formcontrolname='DocumentExpiryYear']")
                          .eq(i)
                          .should('be.visible') // Ensures the element is visible
                          .click()
                            .type(rowData["PED Year"])
                            .contains(rowData["PED Year"])
                            .should("be.visible") // Ensure the option is visible
                            .click();
          
          
          

         
        // } else if (documentType === 'National ID (Only for GCC Nationals)') {
      //     // Fill Local ID details
         
      //   }
      //  else if (documentType === ' Iqama ID(Saudi Residence for Foreigners)') {
      //   // Fill Local ID details
       
      //   }
      // else if (documentType === 'Local ID') {
      //   cy.get('body').then(($body) => {
      //     if ($body.find("[formcontrolname='FormofIdentityNumber']").length > 0) {
      //       cy.log('FormofIdentityNumber is present, filling in the details.');
        
      //       cy.get("[formcontrolname='FormofIdentityNumber']")
      //         .eq(i)
      //         .should('be.visible') // Ensures the element is visible before interacting
      //         .click()
      //         .type(rowData["Passport No"]);
      //     } else {
      //       cy.log('FormofIdentityNumber is not present. Skipping this step.');
      //     }

      //   });
    //     }
      
    //   }
    // });
      
      
      
      
      
      
      
      

      if (i == totalPassengersCount - 1) {
        i = 0;
        cy.log("inside if");
      } else {
        cy.log("inside else");
        i++;
      }
     }
  });
 });

    


Then("I need to add the passenger common details", () => {
  cy.get("[formcontrolname='EmailAddress']")
    .click()
    .should("be.visible")
    .type("arunrv@gmail.com");

  cy.get("[formcontrolname='phne_code']")
    .click()
    .should("be.visible")
    .type("+91")
    .contains("+91")
    .should("be.visible")
    .click();

  cy.get("[formcontrolname='MobileNo']")
    .click()
    .should("be.visible")
    .type("9791990640");
});

Then("I need to click continue to payment", () => {
  cy.contains("Payfort Test").click();

  cy.contains(" Proceed to Pay ").click();

  cy.origin("https://sbcheckout.payfort.com", () => {
    // Inside this block, we can interact with elements on sbcheckout.payfort.com
    cy.get('input[id="cardNoInput"]').type("4005550000000001", { force: true });
    cy.get("#expDateInput").type("05/25", { force: true });

    cy.get("#cvvInput").type("123", { force: true });

    cy.get('input[id="chNameInput"]').type("Arun", { force: true });

    cy.get("#submitBtn")
      .invoke("css", "display", "none") // Hide the element
      .click({ force: true });
    // Hide the element

    cy.url().then((confirmationUrl) => {
      cy.log("Confirmation URL:", confirmationUrl);
    });
  });
});

Then("I need to validate confirmation page", () => {
  cy.wait(20000);

  // Define possible booking statuses
  const bookingStatuses = [
    "Your booking is Confirmed",
    "Your booking is Pending",
    "Your booking is On hold",
  ];

  // Check for any of the booking statuses
  cy.get(".empireFlight_confirmBookingStatus")
    .should("be.visible") // Ensure the booking status is visible
    .then(($el) => {
      const bookingStatus = $el.text().trim(); // Extract the booking status text
      cy.log(`Detected Booking Status: ${bookingStatus}`);

      // Check if the detected booking status matches any expected status
      if (bookingStatuses.some((status) => bookingStatus.includes(status))) {
        cy.log(`Ticket booking status is: ${bookingStatus}`);
        // Optionally take a screenshot for verification
        cy.screenshot(`Ticket Booking Status - ${bookingStatus}`);
      } else {
        // Log and screenshot for unexpected booking statuses
        cy.log("Ticket booking is unsuccessful");
        cy.screenshot("Ticket Booking - Unsuccessful");
        throw new Error(`Unexpected booking status: ${bookingStatus}`);
      }
    });
  cy.logMessage("info", "Ticket Booking Status - ${bookingStatus}");

  cy.get(".empireFlight_confirmPaytxt > :nth-child(1) > span")
    .invoke("text")
    .should("not.be.empty")
    .then((tripId) => {
      cy.log("Trip Id : " + tripId);
    });
  
    cy.get('body').then(($body) => {
      if ($body.find(".empireFlight_confirmPnr").length > 0) {
        cy.log('Pnr Status');
    
  cy.get(".empireFlight_confirmPnr")
  .invoke("text")
  .should("not.be.empty")
  .then((pnr) => {
    cy.log("PNR : " + pnr);
  });
       
      } else {
        cy.log('Pnr Status is not present. Skipping this step.');
      }
    });










  

});

Then("I checking the origin and Destination as per search", () => {
 
  cy.get(".empireFlight_listing-card .empireFlight_airline-nameWrapper").each(
    ($el, index) => {
      // Extract the expected text
      let expectedText =
        bookingData[Cypress.env("dataIndex")]["Departure Relevant Keyword"] +
        " to"+
        bookingData[Cypress.env("dataIndex")]["Return Relevant Keyword"];
  
      cy.log("bookingData->" + JSON.stringify(bookingData));
      cy.log("expectedText->" + expectedText);
  
      // Wrap the element and assert its text softly
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          const actualText = text.trim();
          cy.log("Actual Text: " + actualText); // Log the actual text for debugging
  
          // Perform soft assertion
          cy.softAssert(() => {
            expect(actualText).to.equal(expectedText);
          }, `Assertion failed at index ${index}: Expected "${expectedText}", but found "${actualText}"`);
        });
    }
  ).then(() => {
    // Ensure all soft assertions are logged at the end
    cy.softAssertAll();
  });
  
  });


Then("I need to validate the time", () => {
  cy.get(".empireFlight_FlightTime")
    .first()
    .invoke("text") // Get the initial flight time
    .as("initialFlightTime"); // Store it in a variable

  // Ensure the dropdown is visible and click on it
  cy.get("#dropdownTime")
    .should("be.visible") // Ensure the dropdown is visible before clicking
    .click();

  cy.get("span.ngx-slider-pointer")
    .first() // Selects the first slider handle
    .invoke("attr", "style", "left: 30%")
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true })
    .trigger("mousemove", { clientX: 500, force: true }) // Adjust as needed
    .trigger("mouseup", { force: true });

  // Optionally click to confirm the slider position change

  // Adjust the right slider (second slider)
  cy.get("span.ngx-slider-pointer")
    .eq(1)
    .invoke("attr", "style", "left: 80%") // Set the position of the right slider
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true }); // Click to simulate slider movement

  // Optionally, wait to ensure the UI has time to update (if animations or async operations are involved)
  cy.wait(500);
  
  
  
  cy.get('body').then(($body) => {
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {

      // Capture the updated flight time
      cy.get(".empireFlight_FlightTime")
        .first()
        .invoke("text")
        .as("updatedFlightTime"); // Store the updated flight time

      // Compare the initial and updated flight times
      cy.get("@initialFlightTime").then((initialTime) => {
        cy.get("@updatedFlightTime").then((updatedTime) => {
          // Log the initial and updated times for debugging
          cy.log(`Initial Flight Time: ${initialTime}`);
          cy.log(`Updated Flight Time: ${updatedTime}`);

          // Validate that the flight time has changed (assuming the time is dynamic)
          expect(initialTime).to.equal(updatedTime); // Ensure the time has changed

          // Validate the updated time format (it should be in the "HH:MM" format)
          expect(updatedTime).to.match(/^\d{2}:\d{2}$/); // Matches "10:45"
        });
      });
      // Use Cypress.$() to check for the presence of the element
    }
  });
});

Then("I need to validate the stop", () => {
  const selectedStopType = bookingData[Cypress.env("dataIndex")]["Stop"];

// Check and click "Reset All Filters" before proceeding
cy.get('body').then(($body) => {
  if ($body.find("button:contains('Reset All Filters')").length > 0) {
    cy.contains("Reset All Filters").should('be.visible').click({ force: true });
    cy.log('Reset All Filters button clicked.');
  } else {
    cy.log("Reset All Filters button not found, proceeding.");
  }
});

if (selectedStopType) {
  // Open the stop type dropdown
  cy.get("#dropdownStops").should("be.visible").click();

  cy.get(".empireFlight_filterlist-dropdown-items")
    .contains(selectedStopType)
    .click({ force: true });

  cy.wait(2000); // Wait for flight results to update

  // Check if any flight cards are displayed
  cy.get('body').then(($body) => {
    if ($body.find(".empireFlight_cardbox").length === 0) {
      // No flights found, reset filters
      cy.log(`No flights found for ${selectedStopType}, resetting filters.`);
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
    } else {
      // Validate flight results based on the selected stop type
      cy.get(".empireFlight_cardbox").each(($card) => {
        if (selectedStopType === "Non Stop") {
          cy.wrap($card)
            .find(".empireF_directionTxt")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.eq("Direct"); // Assert that the flight direction is "Direct"
              cy.log("Non Stop flight validated: " + text.trim());
            });
        } else if (selectedStopType === "1 Stop") {
          cy.wrap($card)
            .find(".empireFlight_stop > span")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.include("1 Stop via"); // Assert that the flight contains "1 Stop via"
              cy.log("1 Stop flight validated: " + text.trim());
            });
        } else if (selectedStopType === "2 Stops") {
          cy.wrap($card)
            .find(".empireFlight_stopvia.ng-star-inserted")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.include("2 Stop via"); // Assert that the flight contains "2 Stop via"
              cy.log("2 Stops flight validated: " + text.trim());
            });
        }
      });
    }
  });
} else {
  cy.log("No stop type selected, skipping validation.");
}
});


Then("I need to validate sortby filter", () => {
  cy.get(".empireF_sortby-price").click();
  cy.contains("Price - Low To High").click({ force: true });

  cy.get(".empireFlight_amount").then(($prices) => {
    const prices = [];

    // Extract prices as numbers and push them into the array
    $prices.each((index, price) => {
      const priceText = Cypress.$(price)
        .text()
        .replace(/[^\d.]/g, ""); // Remove 'AED ' prefix
      prices.push(parseFloat(priceText));
    });

    // Make sure the prices are in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log("Sorted Prices:", sortedPrices);
  });

  cy.get(".empireF_sortby-price").click();
  cy.contains("Price - High To Low").click({ force: true });

  cy.get(".empireFlight_amount").then(($prices) => {
    const prices = [];

    // Extract prices as numbers and push them into the array
    $prices.each((index, price) => {
      const priceText = Cypress.$(price)
        .text()
        .replace(/[^\d.]/g, ""); // Remove 'AED ' prefix
      prices.push(parseFloat(priceText));
    });

    // Make sure the prices are in ascending order
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log("Sorted Prices:", sortedPrices);
  });

  cy.get(".empireF_sortby-price").click(); // Click the sort by price button
  cy.contains("Depart - Duration Shortest").click({ force: true }); // Click the 'Depart - Duration Shortest' option

  // Wait for the durations to update after sorting
  cy.wait(1000); // Adjust the wait time as necessary for your application

  cy.get(".empireFlight_time")
    .filter(":visible")
    .then(($durations) => {
      const durationsInMinutes = [];

      // Extract durations, convert to minutes, and push into the array
      $durations.each((index, duration) => {
        const durationText = Cypress.$(duration).text(); // Get the duration text (e.g., "6h 25m")

        // Log the extracted duration text before converting to minutes
        cy.log(`Duration ${index + 1}: ${durationText}`);

        // Extract hours and minutes using regex
        const match = durationText.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
          const hours = parseInt(match[1], 10) || 0; // Default to 0 if no hours
          const minutes = parseInt(match[2], 10) || 0; // Default to 0 if no minutes
          const totalMinutes = hours * 60 + minutes;

          // Log the converted time in minutes
          cy.log(`Converted Time (in minutes) ${index + 1}: ${totalMinutes}`);

          durationsInMinutes.push(totalMinutes);
        }
      });

      // Log the original durations for debugging
      cy.log("Original Durations (in minutes):", durationsInMinutes);

      // Sort the durations in ascending order
      const sortedDurations = [...durationsInMinutes].sort((a, b) => a - b);

      // Log the sorted durations for debugging
      cy.log("Sorted Durations (in minutes):", sortedDurations);

      // Verify the sorting by comparing the actual list with the sorted one
      expect(durationsInMinutes).to.deep.equal(
        sortedDurations,
        "Durations are not sorted correctly"
      );
    });

  /////////////////////////////////////////////////////////////////

  cy.get(".empireF_sortby-price").click();
  cy.contains("Depart - Time Earliest").click({ force: true });
  cy.get(".empireFlight_FlightTime")
    .not(".empireFlight_additionalTimeList")
    .filter(":visible")
    .then(($times) => {
      const timesInMinutes = [];

      $times.each((index, time) => {
        const timeText = Cypress.$(time).text().trim(); // Get the time text (e.g., "01:20")

        // Split the time string to extract hours and minutes
        const [hours, minutes] = timeText.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes; // Convert to minutes from midnight
        timesInMinutes.push(totalMinutes);
      });

      // Log the extracted departure times for debugging
      cy.log("Extracted Times (in minutes from midnight):", timesInMinutes);

      // Create a sorted copy of the times array
      const sortedTimes = [...timesInMinutes].sort((a, b) => a - b);

      // Log the sorted times for comparison
      cy.log("Expected Sorted Times (in minutes from midnight):", sortedTimes);

      // Assert that the original list is in ascending order
      expect(timesInMinutes).to.deep.equal(sortedTimes);
    });
});

Then("I need to validate the price", () => {
  // Ensure the price filter is visible and click if necessary
  cy.get("#dropdownPrice").should("be.visible").click(); // Open the dropdown if it’s a dropdown slider

  cy.get(".empireFlight_amountWrapper > h2") // Adjust selector for the price elements on the flight cards
    .invoke("text")
    .as("initialPrices");
  cy.get("@initialPrices").then((initialPrices) => {
    cy.log("Initial Prices: ${initialPrices}");

    // Adjust the left (minimum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(2)
      .first()
      .invoke("attr", "style", "left: 30%")

      //     .click({ force: true }) // Selects the first slider handle (for min price)
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 300, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });

    // Adjust the right (maximum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(3)
      .invoke("attr", "style", "left: 60%")
      // Selects the second slider handle (for max price)
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 700, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });

    // Wait for UI to update after slider adjustment
    cy.wait(500);


    cy.get('body').then(($body) => {
      // Check if the "Reset All Filters" button exists
      if ($body.find("button:contains('Reset All Filters')").length > 0) {
        // Ensure the button is visible and then click
        cy.contains("Reset All Filters").should('be.visible').click({ force: true });
        cy.log('Reset All Filters button clicked.');
  } else {
    cy.get(".empireFlight_amountWrapper > h2") // Adjust selector for the price elements on the flight cards
      .invoke("text")
      .as("updatedPrices");

    cy.get("@updatedPrices").then((updatedPrices) => {
      cy.log("Updated Prices: ${updatedPrices}");

      // Convert prices into an array for comparison (assuming a comma-separated format)
      const initialPriceArray = initialPrices
        .split(",")
        .map((price) =>
          parseFloat(price.replace(/AED\s*/, "").replace(",", ""))
        );
      const updatedPriceArray = updatedPrices
        .split(",")
        .map((price) =>
          parseFloat(price.replace(/AED\s*/, "").replace(",", ""))
        );

      // Check that at least one price has changed
      const hasChanged = initialPriceArray.some(
        (price, index) => price !== updatedPriceArray[index]
      );
      expect(hasChanged).to.be.true; // Ensure at least one price is updated
    });


  }
});

});
});


Then("I need to validate fare option", () => {
  cy.contains("Cheapest").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amountWrapper > h2")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
  cy.contains("Fastest").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .eq(1)
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amountWrapper > h2")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
  cy.contains("Best Value").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .eq(2)
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amountWrapper > h2")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
});

Then("I need to validate price calendar", () => {
  cy.contains("Show pricing calendar").click({ force: true });
  cy.get(".FFC-search-fare-details.ng-star-inserted").scrollIntoView();
  cy.get(".FFC-search-fare-details.ng-star-inserted")
    .should("have.length.greaterThan", 1) // Ensure there are fare options present
    .then(($elements) => {
      // Get the total number of elements
      const totalElements = $elements.length;

      // Generate a random index to select one element
      const randomIndex = Math.floor(Math.random() * totalElements);

      // Get the randomly selected element
      const randomElement = $elements.eq(randomIndex);

      // Log which element was selected
      // cy.log('Randomly selected element at index:' ${randomIndex});

      // Check the initial display property
      cy.wrap(randomElement).then(($el) => {
        const displayValue = $el.css("display");

        // If the element is already hidden, make it visible
        if (displayValue === "none") {
          cy.wrap($el).invoke("css", "display", "block");
        }

        // Perform hover action on the randomly selected element
        cy.wrap($el).realHover();

        // Additional assertions to ensure it became visible
        cy.wrap($el)
          .should("be.visible")
          .within(() => {
            cy.get(".FFC-search-fare-detail-info")
              .should("be.visible")
              .and("contain.text", "Departure");

            cy.get(".FFC-search-fare-detailFooter")
              .should("be.visible")
              .and("contain.text", "AED");
          });

        cy.wrap($el).trigger("mouseout");

        cy.wrap($el).invoke("css", "display", "none");

        cy.log("Mouse hover effect hidden");
      });

      cy.get('.mdc-button__label:contains("Select")')
        .should("be.visible")
        .then(($flights) => {
          const randomFlightIndex = Math.floor(Math.random() * $flights.length);

          cy.wrap($flights[randomFlightIndex]).click({ force: true });
          cy.log("Random flight option selected");
        });
    });
});

Then("I need to validate flight card", () => {
  // Set the limit for the number of flight cards to iterate over
  const flightLimit = 1; // Adjust this limit as needed

  // Loop through each flight card up to the defined limit
  for (let i = 0; i < flightLimit; i++) {
    cy.get(".empireFlight_mobBoxShow").eq(i).as("flightCard");

    cy.log(`----- Validating Flight Card #${i + 1} -----`);

    // Check if the airline logo is loaded
    cy.get("@flightCard").find('img[alt="Airline Logo"]').should("be.visible");

    // Validate flight names are present
    cy.get("@flightCard")
      .find(".empireFlight_FlightNames")
      .invoke("text")
      .should("not.be.empty")
      .then((flightName) => {
        cy.log("Flight Name: " + flightName);
      });

      cy.get('body').then(($body) => {
        if ($body.find(".LCC_Wrapper.ng-star-inserted").length > 0) {
     
          cy.get('@flightCard').find('.LCC_Wrapper.ng-star-inserted').then(($lcc) => {
            if ($lcc.length > 0) {
              cy.wrap($lcc).invoke('text').should('not.be.empty').then((text) => {
                cy.log('LCC: ' + text);
              });
            }
          });
        
        } else {
          cy.log('LCC Wrapper check is not present. Skipping this step.');
        }
      });

    // Validate flight start time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime")
      .invoke("text")
      .should("not.be.empty")
      .then((startTime) => {
        cy.log("Flight Start Time: " + startTime);
      });

    // Validate from and to locations
    cy.get("@flightCard")
      .find(".empireFlight_airline-nameWrapper")
      .invoke("text")
      .should("not.be.empty")
      .then((route) => {
        cy.log("From and To: " + route);
      });

    // Validate flight date
    cy.get("@flightCard")
      .find(".empireFlight_airline-date")
      .invoke("text")
      .should("not.be.empty")

      .then((date) => {
        cy.log("Date: " + date);
      });

    // Optional stop details
    // cy.get('@flightCard').find('.empireFlight_stopvia.empireF_directionTxt.ng-star-inserted').then(($stop) => {
    //   if ($stop.length > 0) {
    //     cy.wrap($stop).invoke('text').should('not.be.empty').then((stopText) => {
    //       cy.log('Stop: ' + stopText);
    //     });
    //   }
    // });

    // Validate flight code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode")
      .invoke("text")
      .should("not.be.empty")
      .then((code) => {
        cy.log("Source: " + code);
      });

    // Validate time
    cy.get("@flightCard")
      .find(".empireFlight_time.include")
      .invoke("text")
      .should("not.be.empty")
      .then((time) => {
        cy.log("Time: " + time);
      });

    // Validate baggage details
    cy.get("@flightCard")
      .find(".empireFlight_time.include.ng-star-inserted")
      .then(($baggage) => {
        if ($baggage.length > 0) {
          cy.wrap($baggage)
            .invoke("text")
            .should("not.be.empty")
            .then((baggage) => {
              cy.log("Baggage Details: " + baggage);
            });
        }
      });

    // Validate passenger class
    cy.get("@flightCard")
      .find(".empireFlight_Rbd.include.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((classType) => {
        cy.log("Passenger Class: " + classType);
      });

    // Optional seat availability
    // cy.get("@flightCard")
    //   .find(".empireFlight_seatsleft.ng-star-inserted")
    //   .then(($seats) => {
    //     if ($seats.length > 0) {
    //       cy.wrap($seats)
    //         .invoke("text")
    //         .should("not.be.empty")
    //         .then((seats) => {
    //           cy.log("Available seat: " + seats);
    //         });
    //     }
    //   });

    // Validate currency and amount
    cy.get("@flightCard")
      .find(".empireFlight_amount.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((amount) => {
        cy.log("Currency and Amount: " + amount);
      });

    // Validate installments
    cy.get("@flightCard")
      .find(".empireF_installmentwrap.ng-star-inserted")
      .then(($installments) => {
        if ($installments.length > 0) {
          cy.wrap($installments)
            .invoke("text")
            .should("not.be.empty")
            .then((installments) => {
              cy.log("Installments: " + installments);
            });
        }
      });

    // Validate end time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime.empireFlight_additionalTimeList")
      .invoke("text")
      .should("not.be.empty")
      .then((endTime) => {
        cy.log("End Time: " + endTime);
      });

      cy.get('body').then(($body) => {
        if ($body.find(".empireFlight_FlightCode.empireFlight_DepartCode").length > 0) {
     
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode.empireFlight_DepartCode")
      .invoke("text")
      .should("not.be.empty")
      .then((destination) => {
        cy.log("Destination: " + destination);
  
          
    });
  } else {
    cy.log('Fare option is not present. Skipping this step.');
  }
});


    cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
  }
});
Then("I click on the flight details multicity", () => {
  cy.contains("Flight details").should("be.visible").click({ force: true });
});

Then("I need to validate Refundable Option", () => {
  const refundFilter = String(
    bookingData[Cypress.env("dataIndex")]["RefundableOption"]
  );
  cy.get("#dropdownRefundable").should("be.visible").click();
  cy.get(".dropdown-menu.show")
    .contains(bookingData[Cypress.env("dataIndex")]["RefundableOption"])
    .click({ force: true });
  cy.wait(2000);
  cy.get(".empireFlight_listing-footer").each(($card) => {
    cy.wrap($card)
      .find(".empireFlight_refund-text.ref")
      .invoke("text")
      .then((text) => {
        const cleanedText = text.replace(/\u00A0/g, "").trim(); // Remove non-breaking spaces and trim
        cy.log(`Extracted refund text: "${cleanedText}"`);
        expect(cleanedText).to.equal(refundFilter); // Compare cleaned text with refundFilter
      });
  });
});

Then("I need to Validate Airlines", () => {
  cy.get("#dropdownAirlines").should("be.visible").click();

  const airline = bookingData[Cypress.env("dataIndex")]["Airlines"];
  
  if (airline) { // Check if airline is defined and not null/undefined
    cy.get(".dropdown-menu.show")
      .contains(airline) // Ensure airline is a string, number, or regex
      .click({ force: true });
  } else {
    cy.log("Airline is not defined, skipping the step.");
  }
  
  cy.get('body').then(($body) => {
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {
      cy.wait(2000);
      const selectedAirlines = bookingData[Cypress.env("dataIndex")]["Airlines"];
      
      // Only proceed if selectedAirlines is defined
      if (selectedAirlines) {
        cy.get(".empireFlight_cardbox").each(($card) => {
          cy.wrap($card)
            .find(".empireFlight_FlightNames")
            .invoke("text") // Get the text content
            .then((text) => {
              // Check if the selected airline is present in the text
              expect(text.trim()).to.include(selectedAirlines);
              cy.log(`Validated airline: ${selectedAirlines} is present in the flight card.`);
            });
        });
      } else {
        cy.log("Selected airline is not defined, skipping validation.");
      }
    } // Close the else block
  }); // Close the cy.get('body').then blockthen blockock
}); // Close the cy.get('body').then block


Then("I need to validate Duration", () => {
  cy.get("#dropdownDuration")
    .should("be.visible") // Ensure the dropdown is visible before clicking
    .click();

  Cypress.Promise.try(() => {
    // Adjust the left slider
    cy.get("span.ngx-slider-pointer")
      .eq(4)
      .invoke("attr", "style", "left: 30%")
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 500, force: true })
      .trigger("mouseup", { force: true });

    // Adjust the right slider
    cy.get("span.ngx-slider-pointer")
      .eq(5)
      .invoke("attr", "style", "left: 80%")
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true });

    cy.wait(500);

    cy.get('body').then(($body) => {
      // Check if the "Reset All Filters" button exists
      if ($body.find("button:contains('Reset All Filters')").length > 0) {
        // Ensure the button is visible and then click
        cy.contains("Reset All Filters").should('be.visible').click({ force: true });
        cy.log('Reset All Filters button clicked.');
      } else {
        // Save updated and initial flight durations
        cy.get(".empireFlight_time.include")
          .first()
          .invoke("text")
          .as("updatedFlightDuration");

        cy.get(".empireFlight_time")
          .should("be.visible")
          .first()
          .invoke("text")
          .as("initialFlightDuration");

        // Compare the initial and updated flight times
        cy.get("@initialFlightDuration").then((initialFlightDuration) => {
          cy.get("@updatedFlightDuration").then((updatedFlightDuration) => {
            cy.log(`Initial Flight Time: ${initialFlightDuration}`);
            cy.log(`Updated Flight Time: ${updatedFlightDuration}`);

            expect(initialFlightDuration).to.equal(updatedFlightDuration);
          });
        });
      }
    })
  });
});



Then("I need to validate flight card muticity", () => {
  const flightLimit = 1; // Set the limit for validation

  // Reusable function to validate flight card details
  const validateFlightCard = (index) => {
    cy.get(".empireFlight_MclistingBox").eq(index).as("flightCard");

    cy.log(`----- Validating Flight Card #${index + 1} -----`);

    // Validate airline logo
    cy.get("@flightCard").find('img[alt="Airline Logo"]').should("be.visible");

    // Validate flight names
    cy.get("@flightCard")
      .find(".empireFlight_FlightNames")
      .invoke("text")
      .should("not.be.empty")
      .then((flightName) => cy.log("Flight Name: " + flightName));

    // Validate flight start time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime")
      .invoke("text")
      .should("not.be.empty")
      .then((startTime) => cy.log("Start Time: " + startTime));

    // Validate flight code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode")
      .invoke("text")
      .should("not.be.empty")
      .then((code) => cy.log("Source: " + code));

    // Validate time
    cy.get("@flightCard")
      .find(".empireFlight_time.include")
      .invoke("text")
      .should("not.be.empty")
      .then((time) => cy.log("Time: " + time));

    // Validate baggage details
    cy.get("@flightCard")
      .find(".empireFlight_time.include.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((baggage) => cy.log("Baggage Details: " + baggage));

    // Validate passenger class
    cy.get("@flightCard")
      .find(".empireFlight_Rbd.include.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((classType) => cy.log("Passenger Class: " + classType));

    // Validate currency and amount
    cy.get("@flightCard")
      .find(".empireFlight_amount")
      .invoke("text")
      .should("not.be.empty")
      .then((amount) => cy.log("Currency and Amount: " + amount));

    // Validate end time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime.empireFlight_additionalTimeList")
      .invoke("text")
      .should("not.be.empty")
      .then((endTime) => cy.log("End Time: " + endTime));

    // Validate destination code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode.empireFlight_DepartCode")
      .invoke("text")
      .should("not.be.empty")
      .then((destination) => cy.log("Destination: " + destination));

    // Validate fare option
    cy.get("@flightCard")
      .find(".FareTypeBox.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((fareOption) => cy.log("Fare Option: " + fareOption));

    cy.log(`----- Completed Validation for Flight Card #${index + 1} -----`);
  };

  // Validate cards in each multicity tab
  const tabs = [
    ".empireF_McTabs > :nth-child(1)",
    ".empireF_McTabs > :nth-child(2)",
    ".empireF_McTabs > :nth-child(3)",
  ];

  tabs.forEach((tab, tabIndex) => {
    cy.get(tab).click({ force: true });
    for (let i = 0; i < flightLimit; i++) {
      validateFlightCard(i);
    }
  });
});

Then("I need to validate price calendar roundtrip", () => {
  cy.contains("Show pricing calendar").click({ force: true });

  cy.get(".empireF_srchFareDetail.ng-star-inserted")
    .should("exist") // Ensures the element exists in the DOM

    .should("have.length.greaterThan", 1) // Ensure there are fare options present
    .then(($elements) => {
      // Get the total number of elements
      const totalElements = $elements.length;

      // Generate a random index to select one element
      const randomIndex = Math.floor(Math.random() * totalElements);

      // Get the randomly selected element
      const randomElement = $elements.eq(randomIndex);

      // Log which element was selected
      cy.log(`Randomly selected element at index: ${randomIndex}`);

      // Check the initial display property
      cy.wrap(randomElement).then(($el) => {
        const displayValue = $el.css("display");

        // If the element is already hidden, make it visible
        if (displayValue === "none") {
          cy.wrap($el).invoke("css", "display", "block");
        }

        // Perform hover action on the randomly selected element
        cy.wrap($el).realHover();

        // Additional assertions to ensure it became visible
        cy.wrap($el)
          .should("be.visible")
          .within(() => {
            cy.get(".empireF_srchFareDetaInfo")
              .should("be.visible")
              .and("contain.text", "Departure");

            cy.get(".empireF_srchFareDetaFoot")
              .should("be.visible")
              .and("contain.text", "AED");
          });

        cy.wrap($el).trigger("mouseout");

        cy.wrap($el).invoke("css", "display", "none");

        cy.log("Mouse hover effect hidden");
      });

      cy.get('.mdc-button__label:contains("Select")')
        .should("be.visible")
        .then(($flights) => {
          const randomFlightIndex = Math.floor(Math.random() * $flights.length);

          cy.wrap($flights[randomFlightIndex]).click({ force: true });
          cy.log("Random flight option selected");
        });
    });
  // Use Cypress.$() to check for the presence of the element
  const resetFilterButton = Cypress.$("button:contains('Reset All Filters')");

  if (resetFilterButton.length > 0) {
    // If the button exists, check if it is visible
    cy.contains("Reset All Filters").then(($el) => {
      if ($el.is(":visible")) {
        cy.wrap($el).click({ force: true });
        cy.log("Reset All Filter button clicked.");
      } else {
        cy.log("Reset All Filter button exists but is not visible.");
      }
    });
  } else {
    cy.log("Reset All Filter button not found. Skipping this step.");
  }
});
Then("I need to validate flight card roundtrip", () => {
  const flightLimit = 1;

  for (let i = 0; i < flightLimit; i++) {
    cy.get(".empireFlight_main-content").eq(i).as("flightCard");

    cy.log(`----- Validating Flight Card #${i + 1} -----`);

    // Check if the airline logo is loaded
    cy.get("@flightCard").find('img[alt="Airline Logo"]').should("be.visible");

    // Validate flight names are present
    cy.get("@flightCard")
      .find(".empireFlight_FlightNames")
      .invoke("text")
      .should("not.be.empty")
      .then((flightName) => {
        cy.log("Flight Name: " + flightName);
      });
    cy.get("@flightCard")
      .find(".empireFlight_CityName")
      .invoke("text")
      .should("not.be.empty")
      .then((route) => {
        cy.log("From and To: " + route);
      });

    // Validate flight date
    cy.get("@flightCard")
      .find(".empireFlight_airline-date")
      .invoke("text")
      .should("not.be.empty")

      .then((date) => {
        cy.log("Date: " + date);
      });

    // Optional LCC Wrapper check

     cy.get('body').then(($body) => {
        if ($body.find(".LCC_Wrapper.ng-star-inserted").length > 0) {
     
          cy.get('@flightCard').find('.LCC_Wrapper.ng-star-inserted').then(($lcc) => {
            if ($lcc.length > 0) {
              cy.wrap($lcc).invoke('text').should('not.be.empty').then((text) => {
                cy.log('LCC: ' + text);
              });
            }
          });
        
        } else {
          cy.log('LCC Wrapper check is not present. Skipping this step.');
        }
      });

  

    // Validate flight start time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime")
      .invoke("text")
      .should("not.be.empty")
      .then((startTime) => {
        cy.log("Flight Start Time: " + startTime);
      });

    // Optional stop details
    // cy.get('@flightCard').find('.empireFlight_stopvia.empireF_directionTxt.ng-star-inserted').then(($stop) => {
    //   if ($stop.length > 0) {
    //     cy.wrap($stop).invoke('text').should('not.be.empty').then((stopText) => {
    //       cy.log('Stop: ' + stopText);
    //     });
    //   }
    // });

    // Validate flight code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode")
      .invoke("text")
      .should("not.be.empty")
      .then((code) => {
        cy.log("Source: " + code);
      });

    // Validate time
    cy.get("@flightCard")
      .find(".empireFlight_time.include")
      .invoke("text")
      .should("not.be.empty")
      .then((time) => {
        cy.log("Time: " + time);
      });

    // Validate baggage details
    cy.get("@flightCard")
      .find(".empireFlight_time.include.ng-star-inserted")
      .then(($baggage) => {
        if ($baggage.length > 0) {
          cy.wrap($baggage)
            .invoke("text")
            .should("not.be.empty")
            .then((baggage) => {
              cy.log("Baggage Details: " + baggage);
            });
        }
      });

    // Validate passenger class
    cy.get("@flightCard")
      .find(".empireFlight_Rbd.include.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((classType) => {
        cy.log("Passenger Class: " + classType);
      });

    cy.get("@flightCard")
      .find(".empireFlight_FlightTime.empireFlight_additionalTimeList")
      .invoke("text")
      .should("not.be.empty")
      .then((endTime) => {
        cy.log("End Time: " + endTime);
      });

    // Validate destination code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode.empireFlight_DepartCode")
      .invoke("text")
      .should("not.be.empty")
      .then((destination) => {
        cy.log("Destination: " + destination);
      });

    // Validate fare option
    cy.get('body').then(($body) => {
      if ($body.find(".FareTypeBox.ng-star-inserted").length > 0) {
      

        cy.get("@flightCard")
      .find(".FareTypeBox.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((fareOption) => {
        cy.log("Fare Option: " + fareOption);
      });
      
      } else {
        cy.log('fare option is not present. Skipping this step.');
      }
    });



 

    cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
  }

  //   for (let i = 0; i < flightLimit; i++) {
  //     cy.get('.empireFlight-roundTripPriceHead').eq(i).as('flightCardd');

  //     cy.log(`----- Validating Flight Card #${i + 1} -----`);
  //   cy.get('@flightCardd').find('.empireFlight_seatsleft ng-star-inserted').then(($seats) => {
  //     if ($seats.length > 0) {
  //       cy.wrap($seats).invoke('text').should('not.be.empty').then((seats) => {
  //         cy.log('Available seat: ' + seats);
  //       });
  //     }
  //   });

  //   // Validate currency and amount
  //   cy.get('@flightCardd')
  //     .find('.empireFlight_amount.ng-star-inserted')
  //     .invoke('text')
  //     .should('not.be.empty')
  //     .then((amount) => {
  //       cy.log('Currency and Amount: ' + amount);
  //     });

  //   // Validate installments
  //   cy.get('@flightCardd').find('.empireF_installmentwrap.ng-star-inserted').then(($installments) => {
  //     if ($installments.length > 0) {
  //       cy.wrap($installments).invoke('text').should('not.be.empty').then((installments) => {
  //         cy.log('Installments: ' + installments);
  //       });
  //     }
  //   });

  //   cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
});

Then("I need to validate the time roundtrip", () => {
  cy.get(".empireFlight_FlightTime")
    .eq(2)
    .invoke("text") // Get the initial flight time
    .as("initialFlightTime"); // Store it in a variable

  // Ensure the dropdown is visible and click on it
  // cy.get("#dropdownTime")
  //   .should("be.visible") // Ensure the dropdown is visible before clicking
  //   .click();

  cy.get("span.ngx-slider-pointer")
    .eq(2) // Selects the first slider handle
    .invoke("attr", "style", "left: 30%")
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true })
    .trigger("mousemove", { clientX: 500, force: true }) // Adjust as needed
    .trigger("mouseup", { force: true });

  // Optionally click to confirm the slider position change

  // Adjust the right slider (second slider)
  cy.get("span.ngx-slider-pointer")
    .eq(3)
    .invoke("attr", "style", "left: 80%") // Set the position of the right slider
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true }); // Click to simulate slider movement

  
  cy.wait(500); 

  cy.get('body').then(($body) => {
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {


  // Capture the updated flight time
  cy.get(".empireFlight_FlightTime")
    .eq(2)
    .invoke("text")
    .as("updatedFlightTime"); // Store the updated flight time

  // Compare the initial and updated flight times
  cy.get("@initialFlightTime").then((initialTime) => {
    cy.get("@updatedFlightTime").then((updatedTime) => {
      // Log the initial and updated times for debugging
      cy.log(`Initial Flight Time: ${initialTime}`);
      cy.log(`Updated Flight Time: ${updatedTime}`);

      // Validate that the flight time has changed (assuming the time is dynamic)
      expect(initialTime).to.equal(updatedTime); // Ensure the time has changed

      // Validate the updated time format (it should be in the "HH:MM" format)
      expect(updatedTime).to.match(/^\d{2}:\d{2}$/); // Matches "10:45"
    });
  });
 
 
}
});
});

Then("I need to validate the price roundtrip", () => {
  // Ensure the price filter is visible and click if necessary
  cy.get("#dropdownPrice").should("be.visible").click(); // Open the dropdown if it’s a dropdown slider

  cy.get(".empireFlight_amountWrapper > h2") // Adjust selector for the price elements on the flight cards
    .invoke("text")
    .as("initialPrices");
  
  cy.get("@initialPrices").then((initialPrices) => {
    cy.log(`Initial Prices: ${initialPrices}`);
  
    // Adjust the left (minimum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(4)
      .first()
      .invoke("attr", "style", "left: 30%")
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 300, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });
  
    // Adjust the right (maximum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(5)
      .invoke("attr", "style", "left: 60%")
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 700, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });
  
    // Wait for UI to update after slider adjustment
    cy.wait(500);
  
    cy.get("body").then(($body) => {
      // Check if the "Reset All Filters" button exists
      if ($body.find("button:contains('Reset All Filters')").length > 0) {
        // Ensure the button is visible and then click
        cy.contains("Reset All Filters").should("be.visible").click({ force: true });
        cy.log("Reset All Filters button clicked.");
      } else {
        cy.get(".empireFlight_amountWrapper > h2") // Adjust selector for the price elements on the flight cards
          .invoke("text")
          .as("updatedPrices");
  
        cy.get("@updatedPrices").then((updatedPrices) => {
          cy.log(`Updated Prices: ${updatedPrices}`);
  
          // Convert prices into an array for comparison (assuming a comma-separated format)
          const initialPriceArray = initialPrices
            .split(",")
            .map((price) => parseFloat(price.replace(/AED\s*/, "").replace(",", "")));
          const updatedPriceArray = updatedPrices
            .split(",")
            .map((price) => parseFloat(price.replace(/AED\s*/, "").replace(",", "")));
  
          // Check that at least one price has changed
          const hasChanged = initialPriceArray.some(
            (price, index) => price !== updatedPriceArray[index]
          );
          expect(hasChanged).to.be.true; // Ensure at least one price is updated
        });
      }
    });
  });
});


Then("I need to validate Duration roundtrip", () => {
  cy.get("#dropdownDuration")
    .should("be.visible") // Ensure the dropdown is visible before clicking
    .click();

  cy.get("span.ngx-slider-pointer")
    .eq(6) // Selects the first slider handle
    .invoke("attr", "style", "left: 30%")
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true })
    .trigger("mousemove", { clientX: 500, force: true }) // Adjust as needed
    .trigger("mouseup", { force: true });

  // Optionally click to confirm the slider position change

  // Adjust the right slider (second slider)
  cy.get("span.ngx-slider-pointer")
    .eq(7)
    .invoke("attr", "style", "left: 80%") // Set the position of the right slider
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true });

  cy.wait(500);
  cy.get('body').then(($body) => {
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {

      cy.get(".empireFlight_time.include")
        .first()
        .invoke("text")
        .as("updatedFlightDuration");

      cy.get(".empireFlight_time")
        .should("be.visible")
        .first()
        .invoke("text")
        .as("initialFlightDuration");

      // Compare the initial and updated flight times
      cy.get("@initialFlightDuration").then((initialFlightDuration) => {
        cy.get("@updatedFlightDuration").then((updatedFlightDuration) => {
          // Log the initial and updated times for debugging
          // cy.log(Initial Flight Time: ${initialTime});
          // cy.log(Updated Flight Time: ${updatedTime});

          expect(initialFlightDuration).to.equal(updatedFlightDuration); // Ensure the time has changed
        });
      });
    }
  });


  cy.get("span.ngx-slider-pointer")
    .eq(8) // Selects the first slider handle
    .invoke("attr", "style", "left: 30%")
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true })
    .trigger("mousemove", { clientX: 500, force: true }) // Adjust as needed
    .trigger("mouseup", { force: true });

  // Optionally click to confirm the slider position change

  // Adjust the right slider (second slider)
  cy.get("span.ngx-slider-pointer")
    .eq(9)
    .invoke("attr", "style", "left: 80%") // Set the position of the right slider
    .trigger("mousedown", { which: 1, force: true })
    .click({ force: true });

  cy.wait(500);
  cy.get('body').then(($body) => {
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {


  cy.get(".empireFlight_time.include")
    .first()
    .invoke("text")
    .as("updatedFlightDuration");

  cy.get(".empireFlight_time")
    .should("be.visible")
    .first()
    .invoke("text")
    .as("initialFlightDuration");

  // Compare the initial and updated flight times
  cy.get("@initialFlightDuration").then((initialFlightDuration) => {
    cy.get("@updatedFlightDuration").then((updatedFlightDuration) => {
      // Log the initial and updated times for debugging
      // cy.log(Initial Flight Time: ${initialTime});
      // cy.log(Updated Flight Time: ${updatedTime});

      expect(initialFlightDuration).to.equal(updatedFlightDuration); // Ensure the time has changed
    });
  });
  // Use Cypress.$() to check for the presence of the element
    }
  });
});

Then("I need to validate sortby filter roundtrip", () => {
  cy.get(".empireF_sortby-price").click();
  cy.contains("Price - Low To High").click({ force: true });

  cy.get(".empireFlight_amount.ng-star-inserted").then(($prices) => {
    const prices = [];

    // Extract prices as numbers and push them into the array
    $prices.each((index, price) => {
      const priceText = Cypress.$(price)
        .text()
        .replace(/[^\d.]/g, ""); // Remove 'AED ' prefix
      prices.push(parseFloat(priceText));
    });

    // Make sure the prices are in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log("Sorted Prices:", sortedPrices);
  });

  cy.get(".empireF_sortby-price").click();
  cy.contains("Price - High To Low").click({ force: true });

  cy.get(".empireFlight_amount.ng-star-inserted").then(($prices) => {
    const prices = [];

    // Extract prices as numbers and push them into the array
    $prices.each((index, price) => {
      const priceText = Cypress.$(price)
        .text()
        .replace(/[^\d.]/g, ""); // Remove 'AED ' prefix
      prices.push(parseFloat(priceText));
    });

    // Make sure the prices are in ascending order
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).to.deep.equal(sortedPrices);
    cy.log("Sorted Prices:", sortedPrices);

    cy.get(".empireF_sortby-price").click(); // Click the sort by price button
    cy.contains("Depart - Duration Shortest").click({ force: true }); // Select the sort option
    cy.wait(1000); // Wait for sorting to reflect (adjust time as needed)
    cy.get(".empireFlight_listing-body.ng-star-inserted")
      .not(".empireFlight_listing-body.DiviCardDash.ng-star-inserted")
      .each(($card) => {
        //change
        cy.wrap($card)
          .find(".empireFlight_time.include")
          .then((elements) => {
            // Extract text content from the elements
            const durations = [...elements].map((el) => el.innerText.trim());

            // Parse durations into comparable format (e.g., minutes)
            const durationsInMinutes = durations.map((duration) => {
              const [hours, minutes] = duration
                .split("h")
                .map((part) => parseInt(part, 10) || 0);
              return hours * 60 + minutes; // Convert to minutes
            });

            // Verify that the durations are sorted in ascending order
            const sortedDurations = [...durationsInMinutes].sort(
              (a, b) => a - b
            );
            expect(durationsInMinutes).to.deep.equal(sortedDurations);
          });
      });
    cy.get(".empireF_sortby-price").click(); // Click the sort by price button
    cy.contains("Return - Duration Shortest").click({ force: true }); // Select the sort option
    cy.wait(1000);
    cy.get(".empireFlight_listing-body.DiviCardDash.ng-star-inserted").each(
      ($card) => {
        //change
        cy.wrap($card)
          .find(".empireFlight_time.include")
          .then((elements) => {
            // Extract text content from the elements
            const durations = [...elements].map((el) => el.innerText.trim());

            // Parse durations into comparable format (e.g., minutes)
            const durationsInMinutes = durations.map((duration) => {
              const [hours, minutes] = duration
                .split("h")
                .map((part) => parseInt(part, 10) || 0);
              return hours * 60 + minutes; // Convert to minutes
            });

            // Verify that the durations are sorted in ascending order
            const sortedDurations = [...durationsInMinutes].sort(
              (a, b) => a - b
            );
            expect(durationsInMinutes).to.deep.equal(sortedDurations);
          });
      }
    );
  });
});

Then("I need to validate the price multicity", () => {
  // Ensure the price filter is visible and click if necessary
  cy.get("#dropdownPrice").should("be.visible").click(); // Open the dropdown if it’s a dropdown slider

  cy.get(".empireFlight_amount") // Adjust selector for the price elements on the flight cards
    .invoke("text")
    .as("initialPrices");
  cy.get("@initialPrices").then((initialPrices) => {
    cy.log("Initial Prices: ${initialPrices}");

    // Adjust the left (minimum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(2)
      .first()
      .invoke("attr", "style", "left: 10%")

      //     .click({ force: true }) // Selects the first slider handle (for min price)
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 300, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });

    // Adjust the right (maximum) price slider
    cy.get("span.ngx-slider-pointer")
      .eq(3)
      .invoke("attr", "style", "left: 80%")
      // Selects the second slider handle (for max price)
      .trigger("mousedown", { which: 1, force: true })
      .click({ force: true })
      .trigger("mousemove", { clientX: 700, force: true }) // Adjust the clientX value as needed to set the price
      .trigger("mouseup", { force: true });

    // Wait for UI to update after slider adjustment
    cy.wait(500);

    cy.get(".empireFlight_amount") // Adjust selector for the price elements on the flight cards
      .invoke("text")
      .as("updatedPrices");

    cy.get("@updatedPrices").then((updatedPrices) => {
      cy.log("Updated Prices: ${updatedPrices}");

      // Convert prices into an array for comparison (assuming a comma-separated format)
      const initialPriceArray = initialPrices
        .split(",")
        .map((price) =>
          parseFloat(price.replace(/AED\s*/, "").replace(",", ""))
        );
      const updatedPriceArray = updatedPrices
        .split(",")
        .map((price) =>
          parseFloat(price.replace(/AED\s*/, "").replace(",", ""))
        );

      // Check that at least one price has changed
      const hasChanged = initialPriceArray.some(
        (price, index) => price !== updatedPriceArray[index]
      );
      expect(hasChanged).to.be.true; // Ensure at least one price is updated
    });
  });
  // Use Cypress.$() to check for the presence of the element
  const resetFilterButton = Cypress.$("button:contains('Reset All Filters')");

  if (resetFilterButton.length > 0) {
    // If the button exists, check if it is visible
    cy.contains("Reset All Filters").then(($el) => {
      if ($el.is(":visible")) {
        cy.wrap($el).click({ force: true });
        cy.log("Reset All Filter button clicked.");
      } else {
        cy.log("Reset All Filter button exists but is not visible.");
      }
    });
  } else {
    cy.log("Reset All Filter button not found. Skipping this step.");
  }
});

Then("I need to validate the stop multicity", () => {
  cy.get("#dropdownStops")
    .should("be.visible") // Ensure the dropdown is visible before clicking
    .click();

  cy.get(".empireFlight_filterlist-dropdown-items")
    .contains(bookingData[Cypress.env("dataIndex")]["Stop"])
    .click({ force: true }); // Apply the selected filter

  // Apply the selected filter

  cy.wait(2000);
  const selectedStopType = bookingData[Cypress.env("dataIndex")]["Stop"];

  // Based on the selected stop type, validate the flight results
  if (selectedStopType === "Non Stop") {
    cy.get(".empireFlight_MclistingBox").each(($card) => {
      cy.wrap($card)
        .find(".empireF_directionTxt")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.eq("Direct"); // Assert that the flight direction is "Direct"
          cy.log("Non Stop flight validated: " + text.trim());
        });
    });
  } else if (selectedStopType === "1 Stop") {
    cy.get(".empireFlight_MclistingBox").each(($card) => {
      cy.wrap($card)
        .find(".empireFlight_stop > span")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.include("1 Stop via"); // Assert that the flight contains "1 Stop via"
          cy.log("1 Stop flight validated: " + text.trim());
        });
    });
  } else if (selectedStopType === "2 Stops") {
    cy.get(".empireFlight_MclistingBox").each(($card) => {
      cy.wrap($card)
        .find(".empireFlight_stopvia.ng-star-inserted")
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.include("2 Stop via"); // Assert that the flight contains "2 Stop via"
          cy.log("2 Stops flight validated: " + text.trim());
        });
    });
  } else {
    // Handle unexpected filter selections gracefully
    cy.log(`Unexpected stop filter selection: ${selectedStopType}`);
  }
});

Then("I need to Validate Airlines multicity", () => {
  cy.get("#dropdownAirlines").should("be.visible").click();

  cy.get(".dropdown-menu.show")
    .contains(bookingData[Cypress.env("dataIndex")]["Airlines"])
    .click({ force: true });
  cy.wait(2000);
  const selectedAirlines = bookingData[Cypress.env("dataIndex")]["Airlines"];
  cy.get(".empireFlight_MclistingBox").each(($card) => {
    cy.wrap($card)
      .find(".empireFlight_FlightNames")
      .invoke("text") // Get the text content
      .then((text) => {
        // Check if the selected airline is present in the text
        expect(text.trim()).to.include(selectedAirlines);
        cy.log(
          `Validated airline: ${selectedAirlines} is present in the flight card.`
        );
      });
  });
});
Then("I need to validate fare option multicity", () => {
  cy.contains("Cheapest").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amount")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
  cy.contains("Fastest").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .eq(1)
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amount")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
  cy.contains("Best Value").click({ force: true });
  cy.get(".empireFlight_SortByOption")
    .eq(2)
    .invoke("text")
    .then((price1Text) => {
      const price1 = parseFloat(price1Text.replace(/[^0-9.-]+/g, "")).toFixed(
        0
      );

      cy.get(".empireFlight_amount")
        .invoke("text")
        .then((price2Text) => {
          const price2 = parseFloat(
            price2Text.replace(/[^0-9.-]+/g, "")
          ).toFixed(0);

          expect(price1).to.equal(price2);
        });
    });
});

Then("I need to validate the stop roundtrip", () => {
  const selectedStopType = bookingData[Cypress.env("dataIndex")]["Stop"];

// Check and click "Reset All Filters" before proceeding
cy.get('body').then(($body) => {
  if ($body.find("button:contains('Reset All Filters')").length > 0) {
    cy.contains("Reset All Filters").should('be.visible').click({ force: true });
    cy.log('Reset All Filters button clicked.');
  } else {
    cy.log("Reset All Filters button not found, proceeding.");
  }
});

if (selectedStopType) {
  // Open the stop type dropdown
  cy.get("#dropdownStops")
    .should("be.visible") // Ensure the dropdown is visible before clicking
    .click();

  // Apply the selected filter
  cy.get(".empireFlight_filterlist-dropdown-items")
    .contains(selectedStopType)
    .click({ force: true });

  cy.wait(2000); // Wait for flight results to update

  // Check if any flight cards are displayed
  cy.get('body').then(($body) => {
    if ($body.find(".empireFlight_listing-body.ng-star-inserted").length === 0) {
      // No flights found, reset filters
      cy.log(`No flights found for ${selectedStopType}, resetting filters.`);
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
    } else {
      // Validate flight results based on the selected stop type
      cy.get(".empireFlight_listing-body.ng-star-inserted").each(($card) => {
        if (selectedStopType === "Non Stop") {
          cy.wrap($card)
            .find(".empireFlight_stop")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.eq("Direct"); // Assert that the flight direction is "Direct"
              cy.log("Non Stop flight validated: " + text.trim());
            });
        } else if (selectedStopType === "1 Stop") {
          cy.wrap($card)
            .find(".empireFlight_stop")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.include("1 Stop via"); // Assert that the flight contains "1 Stop via"
              cy.log("1 Stop flight validated: " + text.trim());
            });
        } else if (selectedStopType === "2 Stops") {
          cy.wrap($card)
            .find(".empireFlight_stop")
            .invoke("text")
            .then((text) => {
              expect(text.trim()).to.include("2 Stop via"); // Assert that the flight contains "2 Stop via"
              cy.log("2 Stops flight validated: " + text.trim());
            });
        }
      });
    }
  });
} else {
  cy.log("No stop type selected, skipping validation.");
}
});
Then("I need to Validate airlines roundtrip", () => {
  cy.get("#dropdownAirlines").should("be.visible").click();

  cy.get("#dropdownAirlines").should("be.visible").click();

  cy.get('body').then(($body) => {
  
    // Check if the "Reset All Filters" button exists
    if ($body.find("button:contains('Reset All Filters')").length > 0) {
      // Ensure the button is visible and then click
      cy.contains("Reset All Filters").should('be.visible').click({ force: true });
      cy.log('Reset All Filters button clicked.');
    } else {
      
      const airline = bookingData[Cypress.env("dataIndex")]["Airlines"];
      
      if (airline) { // Ensure airline is defined before proceeding
        cy.get(".dropdown-menu.show")
          .contains(airline)
          .click({ force: true });
      } else {
        cy.log("Airline is not defined, skipping the step.");
      }
  
      cy.wait(2000);
      const selectedAirlines = bookingData[Cypress.env("dataIndex")]["Airlines"];
      
      if (selectedAirlines) {
        cy.get(".empireFlight_listing-body.ng-star-inserted").each(($card) => {
          cy.wrap($card)
            .find(".empireFlight_FlightNames")
            .invoke("text") // Get the text content
            .then((text) => {
              // Check if the selected airline is present in the text
              expect(text.trim()).to.include(selectedAirlines);
              cy.log(`Validated airline: ${selectedAirlines} is present in the flight card.`);
            });
        });
      } else {
        cy.log("Selected airline is not defined, skipping validation.");
      }
    }
  });
  
});
Then("I need to validate flight Summary", () => {
  // Set the limit for the number of flight cards to iterate over

  cy.get(".empireF_CommonBody").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireF_CommonBody").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate airline logo visibility
      cy.get("@flightCard")
        .find(".empireF_BSImg")
        .should("be.visible")
        .then(() => cy.log("Airline logo is visible"));

      // Validate flight start time
      cy.get("@flightCard")
        .find(".empireF_FlightTime")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((startTime) => {
              cy.log(
                `Flight Start Time and End time ${index + 1}: ${startTime}`
              );
            });
        });

      // Validate route (From and To)
      cy.get("@flightCard")
        .find(".empireF_BSTitle > h4 > :nth-child(1)")
        .invoke("text")
        .should("not.be.empty")
        .then((route) => {
          cy.log("From and To: " + route);
        });

      // Validate flight date
      cy.get("@flightCard")
        .find("h4 > div")
        .invoke("text")
        .should("not.be.empty")
        .then((date) => {
          cy.log("Date: " + date);
        });

      // Validate optional stop details
      cy.get("@flightCard")
        .find(".empireF_BSStops")
        .then(($stop) => {
          if ($stop.length > 0) {
            cy.wrap($stop)
              .invoke("text")
              .should("not.be.empty")
              .then((stopText) => {
                cy.log("Stop: " + stopText);
              });
          } else {
            cy.log("Stop: No stop details available");
          }
        });

      // Validate flight code
      cy.get("@flightCard")
        .find(".empireFlight_FlightCode")
        .invoke("text")
        .should("not.be.empty")
        .then((code) => {
          cy.log("Flight Code: " + code);
        });

      // Validate passenger class type
      cy.get("@flightCard")
        .find(".empireF_FFLinkWrapper")
        .invoke("text")
        .should("not.be.empty")
        .then((classType) => {
          cy.log("Passenger Class: " + classType);
        });

      // Validate currency and amount
      cy.get("@flightCard")
        .find(".empireF_amountWrapper > h4.ng-star-inserted")
        .invoke("text")
        .should("not.be.empty")
        .then((amount) => {
          cy.log("Currency and Amount: " + amount);
        });

      // Validate destination code
      cy.get("@flightCard")
        .find(".empireFlight_FlightCode")
        .invoke("text")
        .should("not.be.empty")
        .then((destination) => {
          cy.log("Source and Destination : " + destination);
        });

      cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
    }
  });

  cy.get(".empireF_BSBody > .empireF_BShead > .btn-secondary").click({
    force: true,
  });
  cy.contains("Total Duration:").then((element) => {
    if (element && element.is(":visible")) {
      // Element is visible
      cy.wrap(element).should("be.visible");
    } else {
      // Element is not visible
      cy.log("Element not visible or does not exist");
    }
  });
  cy.get(".empireFlight_DetailsClose > .material-icons").click();

  cy.get(":nth-child(3) > .empireF_BShead > .btn-secondary").click();

  cy.get(".empireFlight_FullFareRuledesc").should("exist");

  cy.get(".empireFlight_DetailsClose > .material-icons").click();
});






Then("I click on payment continue", () => {




  cy.get('body').then(($body) => {
    if ($body.find("Continue to Add-Ons").length > 0) {

      cy.contains("Continue to Add-Ons").click(), { timeout: 20000 };
      
    } else {
      cy.log('Add-ons not available');
    }
  });


  cy.contains("Continue to payment").click(), { timeout: 20000 };


  cy.get('body').then(($body) => {
    if ($body.find(".empireF_ancillaryWrap").length > 0) {

      cy.get(".empireF_ancillaryWrap").contains("Continue").click({ force: true });
      
    } else {
      cy.log('Add-ons not available');
    }
  });

 
});

Then("I need to validate flight Summary payment page", () => {
  // Set the limit for the number of flight cards to iterate over

  cy.get(".empireF_CommonBody").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireF_CommonBody").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate airline logo visibility
      cy.get("@flightCard").find('img[alt="flight book"]').should("be.visible");

      // Validate flight start time
      cy.get("@flightCard")
        .find(".empireF_FlightTime")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((startTime) => {
              cy.log(
                `Flight Start Time and End time ${index + 1}: ${startTime}`
              );
            });
        });

      // Validate route (From and To)
      cy.get("@flightCard")
        .find(".empireF_BSTitle > h4 > :nth-child(1)")
        .invoke("text")
        .should("not.be.empty")
        .then((route) => {
          cy.log("From and To: " + route);
        });

      // Validate flight date
      cy.get("@flightCard")
        .find("h4 > div")
        .invoke("text")
        .should("not.be.empty")
        .then((date) => {
          cy.log("Date: " + date);
        });

      // Validate optional stop details
      cy.get("@flightCard")
        .find(".empireF_BSStops")
        .then(($stop) => {
          if ($stop.length > 0) {
            cy.wrap($stop)
              .invoke("text")
              .should("not.be.empty")
              .then((stopText) => {
                cy.log("Stop: " + stopText);
              });
          } else {
            cy.log("Stop: No stop details available");
          }
        });

      // Validate passenger class type
      cy.get("@flightCard")
        .find(".empireF_FFLinkWrapper")
        .invoke("text")
        .should("not.be.empty")
        .then((classType) => {
          cy.log("Passenger Class: " + classType);
        });

      // Validate currency and amount

      cy.get("@flightCard")
        .find(".empireF_umrahwarp > h4")
        .invoke("text")
        .should("not.be.empty")
        .then((amount) => {
          cy.log("Currency and Amount: " + amount);
        });

      // Validate destination code
      cy.get("@flightCard")
        .find(".empireF_FlightCode")
        .invoke("text")
        .should("not.be.empty")
        .then((destination) => {
          cy.log("Source and Destination : " + destination);
        });

      cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
    }
  });

  cy.get(".empireF_BSBody > .empireF_BShead > .btn-secondary").click({
    force: true,
  });
  cy.contains("Total Duration:").then((element) => {
    if (element && element.is(":visible")) {
      // Element is visible
      cy.wrap(element).should("be.visible");
    } else {
      // Element is not visible
      cy.log("Element not visible or does not exist");
    }
  });
  cy.get(".empireFlight_DetailsClose > .material-icons").click();

  cy.get(":nth-child(3) > .empireF_BShead > .btn-secondary").click();

  cy.get(".empireFlight_FullFareRuledesc").should("exist");

  cy.get(".empireFlight_DetailsClose > .material-icons").click();

  cy.get('button:contains("Proceed to Pay")')
    .invoke("text")
    .then((proceedToPayText) => {
      // Extract the amount from "Proceed to Pay" button text
      const proceedToPayAmount = parseFloat(
        proceedToPayText.match(/AED\s([\d,]+)/)[1].replace(",", "")
      );

      // Selector for "Total" amount
      cy.get(".empireF_umrahwarp")
        .invoke("text")
        .then((totalAmountText) => {
          // Extract the amount from "Total" text
          const totalAmount = parseFloat(
            totalAmountText.match(/AED\s([\d,]+)/)[1].replace(",", "")
          );

          // Validate that the amounts are equal
          expect(proceedToPayAmount).to.eq(totalAmount);
        });
    });
});

Then("I click on the fare breakup", () => {
 
  cy.get('span.mdc-tab__content').contains('Fare Breakup')
    .click({ force: true });
});

Then("I need to validate fare breakup", () => {
  function validateElementText(selector, label) {
    cy.get("body").then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector)
          .should("have.length.above", 0)
          .then(($el) => {
            const text = $el.text().trim();
            expect(text).to.have.length.above(0);
            cy.log(`${label}: ${text}`);
          });
      } else {
        cy.log(`Element with selector "${selector}" is not visible.`);
      }
    });
  }

  validateElementText(
    ".empireF_fareBreakGrid .fareBreakHead th:nth-child(1)",
    "Summary"
  );
  validateElementText(
    '.empireF_fareBreakGrid h4:contains("Base Fare")',
    "Base Fare"
  );
  validateElementText(
    '.empireF_fareBreakGrid h4:contains("Fee & Tax")',
    "Fee & Tax"
  );
  // validateElementText('.empireF_fareBreakGrid h4:contains("VAT")', 'VAT');
  validateElementText(
    '.empireF_fareBreakGrid h4:contains("No. Of Pax")',
    "No. Of Pax"
  );
  validateElementText(
    '.empireF_fareBreakGrid h4:contains("Total Fare")',
    "Total Fare"
  );
  validateElementText(
    '.empireF_fareBreakGrid h4:contains("Total Per Pax")',
    "Total Per Pax"
  );

  // Validate individual rows if they exist
  validateElementText(".empireF_fareBreakGrid td:nth-child(2)", "Base Fare");
  validateElementText(".empireF_fareBreakGrid td:nth-child(3)", "Fee & Tax");
  validateElementText(
    ".empireF_fareBreakGrid td:nth-child(4)",
    "Transaction Fee"
  );
  validateElementText(".empireF_fareBreakGrid td:nth-child(5)", "Discount");
  // validateElementText('.empireF_fareBreakGrid td:nth-child(5)', 'VAT');
  validateElementText(".empireF_fareBreakGrid td:nth-child(6)", "No. Of Pax");
  validateElementText(
    ".empireF_fareBreakGrid td:nth-child(7)",
    "Total Per Pax"
  );
  validateElementText(".empireF_fareBreakGrid td:nth-child(8)", "Total Fare");
});

Then("I click on the baggage", () => {
  cy.get('span.mdc-tab__content').contains( 'Baggage ')
  .should('be.visible')
  .click({ force: true });


});

Then("I need to validate baggage", () => {
  cy.get(".empireFlight_confirmBagTable").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireFlight_confirmBagTable").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate flight start time
      cy.get("@flightCard")
        .find(".empireFlight_confirmBagTableData")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((CheckIn) => {
              cy.log(`CheckIn and Cabin ${index + 1}: ${CheckIn}`);
            });
        });
    }
  });
  cy.log(`----- Completed Validation for Baggege Card #${i + 1} -----`);
});

Then("I need to validate baggage confirmation page", () => {
  cy.get(".empireFlight_confirmTripBaggageId").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireFlight_confirmTripBaggageId").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate flight start time
      cy.get("@flightCard")
        .find("div > h4")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((From) => {
              cy.log(`From and To ${index + 1}: ${From}`);
            });
        });
      cy.get("@flightCard")
        .find(".empireFlight_confirmBagTableData")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((CheckIn) => {
              cy.log(`CheckIn and Cabin ${index + 1}: ${CheckIn}`);
            });
        });
    }
  });
  cy.log(`----- Completed Validation for Baggege Card #${i + 1} -----`);
});

Then("I need to validate booking Summary", () => {
  // Set the limit for the number of flight cards to iterate over

  cy.get(".empireFlight_ItBody").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireFlight_ItBody").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate airline logo visibility
      cy.get("@flightCard")
        .find('img[alt="Airline Logo"]')
        .should("be.visible");

      // Validate flight start time
      cy.get("@flightCard")
        .find(".empireFlight_ItTime")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((startTime) => {
              cy.log(`Time and Destination ${index + 1}: ${startTime}`);
            });
        });

      // Validate route (From and To)

      // Validate flight date
      cy.get("@flightCard")
        .find(".empireFlight_ItFlightFromDet > .empireFlight_ItDate")
        .invoke("text")
        .should("not.be.empty")
        .then((date) => {
          cy.log("Date: " + date);
        });

      cy.get("@flightCard")
        .find(".empireFlight_ItAirflight")
        .invoke("text")
        .should("not.be.empty")
        .then((flightName) => {
          cy.log("Flight Name: " + flightName);
        });

      // Validate currency and amount

      // Validate destination code
      cy.get(".empireFlight_ItFlightInfoTitle")
        .invoke("text")
        .should("not.be.empty")
        .then((destination) => {
          cy.log("Source and Destination : " + destination);
        });

      cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
    }
  });
});
Then("I need to validate traveller details", () => {
  // Set the limit for the number of flight cards to iterate over

  cy.get(".empireFlight_confirmPnrDetail").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireFlight_confirmPnrDetail").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate flight start time
      cy.get("@flightCard")
        .find("ng-star-inserted > td:nth-child(1)")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((name) => {
              cy.log(`Name ${index + 1}: ${name}`);
            });
        });

      cy.get("@flightCard")
        .find(".ng-star-inserted > td:nth-child(2)")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((sector) => {
              cy.log(`Sector ${index + 1}: ${sector}`);
            });
        });

      cy.get("@flightCard")
        .find(".ng-star-inserted > td:nth-child(3)")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((pnr) => {
              cy.log(`PNR No ${index + 1}: ${pnr}`);
            });
        });

      cy.get("@flightCard")
        .find(".ng-star-inserted > td:nth-child(4)")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((airline) => {
              cy.log(`Airline PNR ${index + 1}: ${airline}`);
            });
        });

      cy.get("@flightCard")
        .find(".ng-star-inserted > td:nth-child(5)")
        .each(($el, index) => {
          // Check if index is greater than 0
          if (index > 2) {
            cy.wrap($el)
              .invoke("text")
              .then((ticket) => {
                cy.log(`Ticket No ${index + 1}: ${ticket}`);
              });
          }
        });

      cy.get("@flightCard")
        .find(".ng-star-inserted > td:nth-child(6)")
        .should("not.be.empty")
        .each(($el, index) => {
          cy.wrap($el)
            .invoke("text")
            .then((status) => {
              cy.log(`Status ${index + 1}: ${status}`);
            });
        });

      cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
    }
  });
});




Then("I have the promo code", () => {
  cy.get('body').then(($body) => {
        if ($body.find(".empireF_promoInputForm > input").length > 0) {
          cy.log('FormofIdentityNumber is present, filling in the details.');
          let originalTotal;

          cy.get('.empireF_amountWrapper >h4') // Replace with the actual selector for the total amount
            .invoke('text')
            .then((text) => {
              originalTotal = parseFloat(text.replace(/[^\d.-]/g, ''));

          cy.get(".empireF_promoInputForm > input")
            .should('be.visible') // Ensures the element is visible before interacting
            .click()
            .type('KWD100');
            cy.contains("Apply")
            .should('be.visible') // Ensures the element is visible before interacting
              .click()

              cy.wait(5000);
              cy.get('.empireF_amountWrapper >h4') // Replace with the actual selector for the total amount
      .invoke('text')
      .then((newText) => {
        const newTotal = parseFloat(newText.replace(/[^\d.-]/g, '')); // Extract the new total value
        expect(newTotal).to.be.lessThan(originalTotal);
        expect(newTotal).to.not.equal(0)// Assert the new total is less than the original total
      });
  }); 


          
        } else {
          cy.log('FormofIdentityNumber is not present. Skipping this step.');
        }

      });
});


Then("I click on the flight ltinerary", () => {
  cy.get('span.mdc-tab__content').contains('Flight Itinerary')
  .should('be.visible')
  .click({ force: true });
});


Then("I need to validate flight ltinerary", () => {

  cy.get(".empireFlight_ItMobWrapper > div").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".empireFlight_ItMobWrapper > div").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate airline logo visibility
      cy.get("@flightCard").find('.empireFlight_ItFlightLogo >img').should("be.visible");

      // Validate flight start time
      cy.get("@flightCard")
      .find(".empireFlight_ItAirflight")
      .invoke("text")
      .should("not.be.empty")
      .then((flightName) => {
        cy.log("Flight Name: " + flightName);
      });

    // Optional LCC Wrapper check
    // cy.get('@flightCard').find('.LCC_Wrapper.ng-star-inserted').then(($lcc) => {
    //   if ($lcc.length > 0) {
    //     cy.wrap($lcc).invoke('text').should('not.be.empty').then((text) => {
    //       cy.log('LCC: ' + text);
    //     });
    //   }
    // });

    // Validate flight start time
    cy.get("@flightCard")
      .find(".empireFlight_ItFlightFromDet > h4 > span")
      .invoke("text")
      .should("not.be.empty")
      .then((startTime) => {
        cy.log("Flight Start Time: " + startTime);
      });

    // Validate from and to locations
    cy.get("@flightCard")
      .find(".empireF_ItineraryTabTitle")
      .invoke("text")
      .should("not.be.empty")
      .then((route) => {
        cy.log("From and To: " + route);
      });

   

    // Optional stop details
    // cy.get('@flightCard').find('.empireFlight_stopvia.empireF_directionTxt.ng-star-inserted').then(($stop) => {
    //   if ($stop.length > 0) {
    //     cy.wrap($stop).invoke('text').should('not.be.empty').then((stopText) => {
    //       cy.log('Stop: ' + stopText);
    //     });
    //   }
    // });

    // Validate flight code
    cy.get("@flightCard")
      .find(".empireFlight_ItFlightFromDet > h4 ")
      .invoke("text")
      .should("not.be.empty")
      .then((code) => {
        cy.log("Source: " + code);
      });

    // Validate time
    cy.get("@flightCard")
      .find(".empireFlight_ItFlighTime")
      .invoke("text")
      .should("not.be.empty")
      .then((time) => {
        cy.log("Time: " + time);
      });

    // Validate baggage details
  

    // Validate passenger class
    cy.get("@flightCard")
      .find(".empireFlight_RbdContent")
      .invoke("text")
      .should("not.be.empty")
      .then((classType) => {
        cy.log("Passenger Class: " + classType);
      });

    // Optional seat availability
    // cy.get("@flightCard")
    //   .find(".empireFlight_seatsleft.ng-star-inserted")
    //   .then(($seats) => {
    //     if ($seats.length > 0) {
    //       cy.wrap($seats)
    //         .invoke("text")
    //         .should("not.be.empty")
    //         .then((seats) => {
    //           cy.log("Available seat: " + seats);
    //         });
    //     }
    //   });

   

   
   
    // Validate destination code
    cy.get("@flightCard")
      .find(".empireFlight_ItTime")
      .invoke("text")
      .should("not.be.empty")
      .then((destination) => {
        cy.log("Destination: " + destination);
      });

    // Validate fare option
   

      cy.log(`----- Completed Validation for Flight Card #${i + 1} -----`);
    }

  })
})


Then("I need to validate flight details", () => {
  

  cy.get(".fareOptionCardMobile > .empireFlight_fareOptCardsHead > .FareoptionselectedFlight").then(($flightCards) => {
    const totalCards = $flightCards.length; // Total available flight cards

    cy.log(`Total flight cards available: ${totalCards}`);

    // Loop through each available flight card
    for (let i = 0; i < totalCards; i++) {
      cy.get(".fareOptionCardMobile > .empireFlight_fareOptCardsHead > .FareoptionselectedFlight").eq(i).as("flightCard");

      cy.log(`----- Validating Flight Card #${i + 1} -----`);

      // Validate airline logo visibility
      cy.get("@flightCard").find('img[alt="Airline Logo"]').should("be.visible");

      // Validate flight start time
      cy.get("@flightCard")
      .find(".empireFlight_FlightNames")
      .invoke("text")
      .should("not.be.empty")
      .then((flightName) => {
        cy.log("Flight Name: " + flightName);
      });

    // Optional LCC Wrapper check
    // cy.get('@flightCard').find('.LCC_Wrapper.ng-star-inserted').then(($lcc) => {
    //   if ($lcc.length > 0) {
    //     cy.wrap($lcc).invoke('text').should('not.be.empty').then((text) => {
    //       cy.log('LCC: ' + text);
    //     });
    //   }
    // });

    // Validate flight start time
    cy.get("@flightCard")
      .find(".empireFlight_FlightTime")
      .invoke("text")
      .should("not.be.empty")
      .then((startTime) => {
        cy.log("Flight Start Time: " + startTime);
      });

 


    // Validate flight code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode")
      .invoke("text")
      .should("not.be.empty")
      .then((code) => {
        cy.log("Source: " + code);
      });

    // Validate time
    cy.get("@flightCard")
      .find(".empireFlight_time.include")
      .invoke("text")
      .should("not.be.empty")
      .then((time) => {
        cy.log("Time: " + time);
      });

    // Validate baggage details
    cy.get("@flightCard")
      .find(".empireFlight_time.include.ng-star-inserted")
      .then(($baggage) => {
        if ($baggage.length > 0) {
          cy.wrap($baggage)
            .invoke("text")
            .should("not.be.empty")
            .then((baggage) => {
              cy.log("Baggage Details: " + baggage);
            });
        }
      });

    // Validate passenger class
  



  

    // Validate destination code
    cy.get("@flightCard")
      .find(".empireFlight_FlightCode.empireFlight_DepartCode")
      .invoke("text")
      .should("not.be.empty")
      .then((destination) => {
        cy.log("Destination: " + destination);
      });

    // Validate fare option
    cy.get("@flightCard")
      .find(".FareTypeBox.ng-star-inserted")
      .invoke("text")
      .should("not.be.empty")
      .then((fareOption) => {
        cy.log("Fare Option: " + fareOption);
      });

   

      cy.log(`----- Completed Validation for Flight Card #${i + 0} -----`);
    }

  })
})


Then("I need to validate fare option card", () => {
  cy.get(".empireF_multiCardGrid > div")
  .filter(":visible") // Filter only visible elements
  .should("have.length.gt", 0) // Ensure at least one visible element exists
  .then(($options) => {
    const visibleOptions = $options.length;
    cy.log(`Visible options count: ${visibleOptions}`);

    if (visibleOptions > 0) {
      const randomIndex = Math.floor(Math.random() * visibleOptions);
      cy.log(`Random Index: ${randomIndex}`);

      // Debug: Log the text or attributes of the selected element
      const selectedOption = $options.eq(randomIndex);
      cy.log(`Selected Option Text: ${selectedOption.text().trim()}`);

      // Click the selected option
      cy.wrap(selectedOption).click({ force: true });
      cy.log(`Selected Flight Option #${randomIndex + 1}`);
    } else {
      cy.log("No visible fare option cards available. Skipping this step.");
    }
  });
  });

  

  



