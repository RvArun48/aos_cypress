import { Given } from "cypress-cucumber-preprocessor/steps";
// import HomePage from "../../POM/HomePage"; 

// const homePage = new HomePage(); 






When("the flight search section should be visible", () => {
  
  cy.get(".empireF_searchWrap").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Flight search section is visible');
    } else {
      cy.log('Flight search section is Not visible');
    }
  });
});

Then("the advanced search button should be visible", () => {
  cy.get(".AdvSearchOpt-btn").first().then(($el) => {
    // Perform the soft assertion logic
    if ($el.is(':visible')) {
      cy.log('Advanced search  section is visible');
    } else {
      cy.log('Advanced search  section is Not visible');
    }
  });
});

When("I click the flight button", () => {
  cy.contains("Flights").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el);
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  

When("the flight button action is verified", () => {
  cy.contains("Flights").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
      cy.get('#one-way').should('contain', 'Round Trip');
      cy.log(' Flight button action is verified');

    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  
When("I click the hotel button", () => {
  cy.contains("Hotels").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el);
    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
});
  

When("the hotel button action is verified", () => {
  cy.contains("Hotels").first().then(($el) => {
    if ($el.is(':visible')) {
      cy.log('Element is visible and will be clicked');
      cy.wrap($el).click();
      cy.contains('Nationality').should('contain', 'Nationality');
      cy.log(' Hotel button action is verified');

    } else {
      cy.log('Element is NOT visible, skipping click');
    }
  });
  });


  When("I click the sports button", () => {
    cy.contains("Sports").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el);
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    
  
  When("the sports button action is verified", () => {
    cy.contains("Sports").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
        // cy.get('#EventDetail').should('contain', 'Search Your Favourite');
        cy.log(' Sports button action is verified');
  
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    


  When("I click the package button", () => {
    cy.contains("Packages").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el);
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
  });
    
  
  When("the package button action is verified", () => {
    cy.contains("Packages").first().then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Element is visible and will be clicked');
        cy.wrap($el).click();
        // cy.contains('Flying From').should('contain', 'Flying From');
        cy.log(' Packages button action is verified');
  
      } else {
        cy.log('Element is NOT visible, skipping click');
      }
    });
    });
  
    When("I switch to the Round Trip tab", () => {
        cy.get("#one-way").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el);
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      
    When("the Round Trip tab should be active", () => {
        cy.get("#one-way").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el).click();
      
            // Verify that the Round Trip tab is active
            cy.wrap($el)
              .should("have.class", "active") // Adjust based on your app's active class
              
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      


    
    When("I switch to the One Way tab", () => {
        cy.get("#round-trip").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el);
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      
    When("the One Way tab should be active", () => {
        cy.get("#round-trip").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el).click();
      
            // Verify that the Round Trip tab is active
            cy.wrap($el)
            .should("have.class", "active") // Adjust based on your app's active class
              
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      


     
    When("I switch to the Multi City 3 Segment tab", () => {
        cy.contains("Multi City (3 Segment) ").first().then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el);
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      
    When("the Multi City 3 Segment tab should be active", () => {
        cy.contains("Multi City (3 Segment)")
        .first()
        .then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el).click();
      
            // Verify that the Round Trip tab is active
            cy.wrap($el)
            .should("have.class", "active") // Adjust based on your app's active class
              
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
      });



      When("I switch to the Multi City tab", () => {
        cy.get("#multicity ").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el);
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });
      
    When("the Multi City tab should be active", () => {
        cy.get("#multicity ").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el).click();
      
            // Verify that the Round Trip tab is active
            cy.wrap($el)
              .should("have.class", "active") // Adjust based on your app's active class
              
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
      });



      When("the origin input should be visible", () => {
  
        cy.get("#FromDropDown0").first().then(($el) => {
          // Perform the soft assertion logic
          if ($el.is(':visible')) {
            cy.log(' origin input section is visible');
          } else {
            cy.log(' origin input section is Not visible');
          }
        });
      });


      When("the destination input should be visible", () => {
  
        cy.get("#ToDropDown0").first().then(($el) => {
          // Perform the soft assertion logic
          if ($el.is(':visible')) {
            cy.log(' destination input section is visible');
          } else {
            cy.log(' destination input section is Not visible');
          }
        });
      });

      When("the departure date input should be visible", () => {
  
        cy.contains("Departure").then(($el) => {
          // Perform the soft assertion logic
          if ($el.is(':visible')) {
            cy.log(' departure date input section is visible');
          } else {
            cy.log(' departure date input section is Not visible');
          }
        });
      }); 


      When("the return date input should be visible", () => {
  
        cy.contains("Return").first().then(($el) => {
          // Perform the soft assertion logic
          if ($el.is(':visible')) {
            cy.log(' return date input section is visible');
          } else {
            cy.log(' return date input section is Not visible');
          }
        });
      });

      
      When("the traveler and class panel should be visible", () => {
  
        cy.contains("Passengers and Class").first().then(($el) => {
          // Perform the soft assertion logic
          if ($el.is(':visible')) {
            cy.log('traveler and class panel  section is visible');
          } else {
            cy.log('traveler and class panel  section is Not visible');
          }
        });
      });
      When("I add a new segment", () => {
        cy.contains("Add Another City ").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el,{ force: true });
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });


  When("I click on the advanced search button", () => {
        cy.contains( "Advanced search options ").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el).click({ force: true });
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });
    });

    
    When("the advanced search options should be validate", () => {
        cy.contains( "Baggage only").then(($el) => {
          if ($el.is(':visible')) {
            cy.log('Element is visible and will be clicked');
            cy.wrap($el,{ force: true });
          } else {
            cy.log('Element is NOT visible, skipping click');
          }
        });

        cy.contains( "Direct Flights").then(($el) => {
            if ($el.is(':visible')) {
              cy.log('Element is visible and will be clicked');
              cy.wrap($el,{ force: true });
            } else {
              cy.log('Element is NOT visible, skipping click');
            }
        });
        
        cy.contains( "Refundable").then(($el) => {
            if ($el.is(':visible')) {
              cy.log('Element is visible and will be clicked');
              cy.wrap($el,{ force: true });
            } else {
              cy.log('Element is NOT visible, skipping click');
            }
          });
    });


