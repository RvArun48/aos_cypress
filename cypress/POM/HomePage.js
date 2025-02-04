 class HomePage {



    getSource() {
      return cy.get('.empireF_searchForm > .dropdown-toggle');
  
    }
  
    getclickSource() {
      return cy.get('.empireF_searchForm > .fs_labelMenu > .empire_offcanvasWrapper > .empire_offcanvasBody > .dropdown-item');
  
    }
  
  
  
    getDestination() {
      return cy.get('#ToDropDown0');
    }
    getclickDestination() {
      return cy.get('div[aria-labelledby="ToDropDown"] .fs_menuItemContent').first();

      
    }
  


  getoneWayElementGroup() {
    return cy.get('#round-trip')
  }

  getroundTripElementGroup() {
    return cy.get('#round-trip')
  }

  getmultiCityElementGroup() {
    return cy.get('#custom-search')
  }

  getmultiCitySegmentElementGroup() {
    return cy.get('#multicity')
  }

  getResetAllFilter() {
    return cy.contains("Reset All Filters");
  }
  
  getPricingCalendarButton() {
    return cy.contains("Show pricing calendar");
  }

  getFareDetailsContainer() {
    return cy.get('.FFC-search-fare-details.ng-star-inserted');
  }

  getFareDetailInfo() {
    return cy.get(".FFC-search-fare-detail-info");
  }

  getFareDetailFooter() {
    return cy.get(".FFC-search-fare-detailFooter");
  }

  getSelectButton() {
    return cy.get( '.mdc-button__label:contains("Select")');
  }






  getHeader() {
    return cy.get(".empire_headerWrapper");
}

getFooter() {
    return cy.get(".empire_offcanvasWrapper");
}

getFlightSearchSection() {
    return cy.get("div.empireFlight_searchform-trips-tabs");
}

getEventHeading(headingText) {
    return cy.get('h1.event_heading').contains(headingText);
}

getGenericHeading(headingText) {
    return cy.get('h1').contains(headingText);
}

getFlightButton() {
    return cy.contains("Flights");
}

getHotelButton() {
  return cy.contains("Hotels");
}

getSportsButton() {
  return cy.contains("Sports"); // Assuming sports button uses similar class
}

getRoundTripTab() {
    return cy.get('div.mat-mdc-tab-labels').contains('span', 'Round Trip').closest('.mdc-tab');
}

getOneWayTab() {
    return cy.get('div.mat-mdc-tab-labels').contains('span', 'One Way').closest('.mdc-tab');
}

getMultiCity3SegmentTab() {
    return cy.get('div.mat-mdc-tab-labels')
        .find('span')
        .filter((index, el) => el.textContent.trim() === 'Multi City (3 Segment)')
        .closest('.mdc-tab');
}

getMultiCityTab() {
    return cy.get('div.mat-mdc-tab-labels')
        .find('span')
        .filter((index, el) => el.textContent.trim() === 'Multi City')
        .closest('.mdc-tab');
}

clickRoundTripTab() {
    this.getRoundTripTab().click();
}

clickOneWayTab() {
    this.getOneWayTab().click();
}

clickMultiCity3SegmentTab() {
    this.getMultiCity3SegmentTab().click({ multiple: true });
}

clickMultiCityTab() {
    this.getMultiCityTab().click({ multiple: true });
}

getOriginInput() {
    return cy.get('.empireFlight_origin input');
}

getDestinationInput() {
    return cy.get('.empireFlight_depart input');
}

getDepartureDate() {
    return cy.get('label.empireFlight_searchdate-form');
}

getReturnDate() {
    return cy.get('label.empireFlight_searchdate-to');
}

getMCOriginInput(index = 0) {
    return cy.get(`input#DropToOrigin${index}`);
}

getMCDestinationInput(index = 0) {
    return cy.get(`input#DropFromDepart${index}`);
}

getMCDateInput(index = 0) {
    return cy.get(`input#calenderDynamic${index}`);
}

getTravelerAndClassPanel() {
    return cy.get('.empireF_searchtravellerWrapper');
}

getAddMoreButton() {
    return cy.get('span.empireH_addMoreSearch');
}

validateInputs(length) {
    for (let i = 0; i < length; i++) {
        this.getMCDateInput(i).should('be.visible');
        this.getMCOriginInput(i).should('be.visible');
        this.getMCDestinationInput(i).should('be.visible');
    }
}

getAdvancedSearchButton() {
    return cy.get('a.AdvSearchOpt-btn');
}

getFlexibleDatesCheckbox() {
    return cy.get('#mat-mdc-checkbox-1');
}

getPreferredAirlineDropdown() {
    return cy.get('ng-select.empireF_AdvSearOpt');
}

getBaggageOnlyCheckbox() {
    return cy.get('#mat-mdc-checkbox-4');
}




  






 
   
  }
    export default  HomePage;
  
  
    