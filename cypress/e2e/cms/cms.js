import { Given } from "cypress-cucumber-preprocessor/steps";
import "cypress-real-events/support";

      Given("I want to open the application", () => {
        cy.visit(Cypress.env("url"));
    cy.log("Opened the application.");
      });



      Given("I validate Top Destination", () => {
        cy.get(".tripIdea2_card.ng-star-inserted").each((currentPackage, index) => {
            // Hover over the card (CSS equivalent of Actions in Selenium)
            cy.wrap(currentPackage).realHover(); // Use the `cypress-real-events` plugin for hover.
    
            // Wait if necessary
            if (index % 4 === 0) {
                cy.wait(1000);
            }
    
            // Validate the location text is not empty
            cy.wrap(currentPackage)
                .find(".tripIdea2_locationText")
                .invoke("text")
                .should("not.be.empty")
                .then((locationText) => {
                    cy.log(`Validated Location: ${locationText}`);
                });
    
            // Validate the trip type is not empty
            cy.wrap(currentPackage)
                .find(".tripIdea2_cardTripType")
                .invoke("text")
                .should("not.be.empty")
                .then((tripTypeText) => {
                    cy.log(`Trip Type: ${tripTypeText}`);
                });
    
            // Validate the card location is not empty
            cy.wrap(currentPackage)
                .find(".tripIdea2_cardLoc")
                .invoke("text")
                .should("not.be.empty")
                .then((cardLocText) => {
                    cy.log(`Card Location: ${cardLocText}`);
                });
    
            // Validate the map icon and location text is not empty
            cy.wrap(currentPackage)
                .find(".material-icons + h4")
                .invoke("text")
                .should("not.be.empty")
                .then((mapIconText) => {
                    cy.log(`Map Icon Text: ${mapIconText}`);
                });
    
            // Validate the price text is not empty and convert to a number
            cy.wrap(currentPackage)
                .find(".tripIdea2_cardPrice")
                .invoke("text")
                .should("not.be.empty")
                .then((priceText) => {
                    const price = parseFloat(priceText.replace(/[^\d.]/g, "")); // Convert price string to number
                    expect(price).to.be.greaterThan(0, `Validating Price: ${priceText}`);
                    cy.log(`Validated Price: ${price}`);
                });
    
            // Log the results
            cy.wrap(currentPackage)
                .find(".tripIdea2_locationText")
                .invoke("text")
                .then((locationText) => {
                    cy.wrap(currentPackage)
                        .find(".tripIdea2_cardPrice")
                        .invoke("text")
                        .then((priceText) => {
                            cy.log(`Validating card for Location - ${locationText} with Price - ${priceText}`);
                        });
                });
        });
    });


    
    Given("I validate the package", () => {
      cy.get('.hybridContent').each((currentPackage, index) => {
        // Log package title
        cy.wrap(currentPackage)
            .find('h4')
            .invoke('text')
            .then((packageTitle) => {
                cy.log(`Package title: ${packageTitle}`);
            });

        // Hover over the price element (CSS equivalent of Actions in Selenium)
        cy.wrap(currentPackage)
            .find('.hybridCardFoot h3')  // Assuming this is the price element
            .realHover(); // Use the `cypress-real-events` plugin for hover.

        // Wait if necessary
        if (index % 4 === 0) {
            cy.wait(1000);
        }

        // Log event with screenshot (You would need to create a custom log function for Cypress)
        cy.log(`Validating cards for Package`);

        // Validating description (Check if the package title is not empty)
        cy.wrap(currentPackage)
            .find('h4')
            .invoke('text')
            .should('not.be.empty')
            .then((packageTitle) => {
                cy.log(`Package title validated: ${packageTitle}`);
            });

        // Checking Day and Night icons (Check SVG count in the duration container)
        cy.get('.hybridDuration svg')
        .should('not.be.empty')
            .then((svgCount) => {
                cy.log(`Day and Night icons count: ${svgCount.length}`);
            });

        // Validating hybridDesc element
        cy.wrap(currentPackage)
            .find('.hybridDesc.ng-star-inserted span:nth-child(2)')
            .invoke('text')
            .should('not.be.empty')
            .then((hybridDescText) => {
                cy.log(`Hybrid description validated: ${hybridDescText}`);
            });

        // Validating hybridHotAdd elements
        cy.wrap(currentPackage)
            .find('.hybridHotAdd')
            .should('not.be.empty')
            .then((hotAddCount) => {
                cy.log(`Hybrid Hot Add elements count: ${hotAddCount.length}`);
            });

        // Validating Amenities
        cy.wrap(currentPackage)
            .find('.hybridList.ng-star-inserted li')
            .each((amenity) => {
                cy.wrap(amenity)
                    .invoke('text')
                    .should('not.be.empty')
                    .then((amenityText) => {
                        cy.log(`Amenity: ${amenityText}`);
                    });
            });

        // Checking price
        cy.wrap(currentPackage)
            .find('.hybridCardFoot h3')
            .invoke('text')
            .should('not.be.empty')
            .then((priceText) => {
                const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Remove non-numeric characters
                cy.log(`Price validated: ${priceText}`);
                expect(price).to.be.greaterThan(0);
            });

        // Per person info validation
        cy.wrap(currentPackage)
            .find('.hybridCardFoot p')
            .invoke('text')
            .should('not.be.empty')
            .then((perPersonInfo) => {
                cy.log(`Per person info validated: ${perPersonInfo}`);
            });
    });
    });


    
    Given("I validate Popular Hotels", () => {
      cy.get('.popGridWrap .popCard.ng-star-inserted').each((currentPackage, index) => {
        // Log and validate location
        cy.wrap(currentPackage)
            .find('.location')
            .invoke('text')
            .should('not.be.empty')
            .then((locationText) => {
                cy.log(`Location: ${locationText}`);
            });

        // Hover over the package (CSS equivalent of Actions in Selenium)
        cy.wrap(currentPackage)
            .find('.rating.ng-star-inserted')
            .realHover(); // Use `cypress-real-events` plugin for hover action

        // Wait if necessary
        if (index % 4 === 0) {
            cy.wait(1000);
        }

        // Log event with screenshot (You would need to create a custom log function for Cypress)
        cy.wrap(currentPackage)
            .find('.location')
            .invoke('text')
            .then((locationText) => {
                cy.wrap(currentPackage)
                    .find('.price')
                    .invoke('text')
                    .then((priceText) => {
                        const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Remove non-numeric characters
                        const status = price > 0 ? 'INFO' : 'FAIL';
                        cy.log(`Validating cards for Destination - ${locationText} and Price - ${priceText}`);
                        cy.screenshot();
                    });
            });

        // Validating hotel name
        cy.wrap(currentPackage)
            .find('.hotelName')
            .invoke('text')
            .should('not.be.empty')
            .then((hotelName) => {
                cy.log(`Hotel Name: ${hotelName}`);
            });

        // Validating SVG count (rating stars)
        cy.wrap(currentPackage)
            .find('.rating.ng-star-inserted svg')
            .should('not.be.empty')
            .then((svgCount) => {
                cy.log(`Rating stars count: ${svgCount.length}`);
            });

        // Validating price
        cy.wrap(currentPackage)
            .find('.price')
            .invoke('text')
            .should('not.be.empty')
            .then((priceText) => {
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                cy.log(`Price validated: ${priceText}`);
                expect(price).to.be.greaterThan(0);
            });

        // Validating stay text (per person info)
        cy.wrap(currentPackage)
            .find('.stay')
            .invoke('text')
            .should('not.be.empty')
            .then((stayText) => {
                cy.log(`Stay information: ${stayText}`);
            });
    });
    });


    
    Given("I validate Hot Deals", () => {
      cy.get('hot-deals').then((hotDealsContainer) => {
        // Locate the hot deal elements inside the container
        cy.wrap(hotDealsContainer)
            .find('.hotDeal3_card.ng-star-inserted')
            .each((currentHotDeal, index) => {
                // Log the index to track the current hot deal
                cy.log(`Validating Hot Deal ${index + 1}`);

                // Hover over the current hot deal (using the cypress-real-events plugin)
                cy.wrap(currentHotDeal).realHover(); // Ensure you have the cypress-real-events plugin installed

                // Wait every 4th element (simulating your sleep)
                if (index % 4 === 0) {
                    cy.wait(1000);
                }

                // Validate the <p> element text inside .hotDeal3_content
                cy.wrap(currentHotDeal)
                    .find('.hotDeal3_content > p')
                    .invoke('text')
                    .should('not.be.empty')
                    .then((contentParagraphText) => {
                        cy.log(`Paragraph Text: ${contentParagraphText}`);
                    });

                // Validate the <h4> element text inside .hotDeal3_content
                cy.wrap(currentHotDeal)
                    .find('.hotDeal3_content > h4')
                    .invoke('text')
                    .should('not.be.empty')
                    .then((contentHeadingText) => {
                        cy.log(`Heading Text: ${contentHeadingText}`);
                    });

                // Log event with screenshot (You can customize this log function as needed)
                cy.wrap(currentHotDeal)
                    .find('.hotDeal3_content > h4')
                    .invoke('text')
                    .then((contentHeadingText) => {
                       
                        cy.log(`Validating hot deals - ${contentHeadingText}`);
                    });
            });
    });
    });
    
    Given("I validate Whats new", () => {
      cy.visit(Cypress.env("url"));
  cy.log("Opened the application.");
    });