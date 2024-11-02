export class HomePage {



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






}
  export default HomePage;
  
    