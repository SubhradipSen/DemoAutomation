class DemoBlazeHome
{

    getPhonesTab()
    {
      return  cy.get('.list-group-item').contains('Phones')
    }
    
    getSamsungGalaxyS6()
    {
      return  cy.get('.hrefch').contains('Samsung galaxy s6')
    }

    getMonitorTab()
    {
      return  cy.get('.list-group-item').contains('Monitors')
    }

    getAppleMonitor()
    {
      cy.wait(1000)
      return  cy.get('.hrefch').contains('Apple monitor 24')
    }

    getLaptopsTab()
    {
      return  cy.get('.list-group-item').contains('Laptops')
    }

    getSonyVaio()
    {
      return  cy.contains('Sony vaio i5')
    }
    getDell()
    {
     return cy.contains('Dell i7 8gb')
    }
    getAddToCart()
    {
     return cy.get('.btn.btn-success.btn-lg').contains('Add to cart')
    }
    getHome()
    {
     return cy.get('.nav-link').contains('Home')
    }
    productName()
    {
     return cy.get('.name')
    }
    productPrice()
    {
     return cy.get('.price-container')
    }

}

export default DemoBlazeHome;