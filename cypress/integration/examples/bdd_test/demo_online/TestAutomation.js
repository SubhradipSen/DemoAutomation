import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import DemoBlazeHome from '../../../../pageobjects/DemoBlazeHome'
import DemoBlazeCart from '../../../../PageObjects/DemoBlazeCart'

var vaioPrice
var laptopName1
var laptopName2
var HomePage = new DemoBlazeHome()
var CartPage = new DemoBlazeCart()


Given('User Opens Demoblaze website', function () {
    //Launches the application under test. The url is defined in cypres.json as environment variable
    cy.visit(Cypress.env('DemoBlazeUrl'))
})

When('User Navigates through Product Categories Phone, Laptops and Monitors', function () {

    //Clicks on 'Phones' tab and validates the prsence of product Galaxy S6
    HomePage.getPhonesTab().click()
    HomePage.getSamsungGalaxyS6().should('be.visible')
    cy.log('List of Phones is successfully displayed')
    
    //Clicks on 'Laptops' tab and validates the prsence of product Sony Vaio i5
    HomePage.getLaptopsTab().click()
    HomePage.getSonyVaio().should('be.visible')
    cy.log('List of Laptops is successfully displayed')

    //Clicks on 'Monitor' tab and validates the prsence of product Apple Monoitor 24
    HomePage.getMonitorTab().click()
    HomePage.getAppleMonitor().should('be.visible')
    cy.log('List of Monitors is successfully displayed')
})

And('User Selects Laptops to Buy', function () {
    //Navigates to Laptops list and selects Sony Vaio i5 
    HomePage.getLaptopsTab().click()
    HomePage.getSonyVaio().click()
    
    //Validates that appropriate product detail page is displayed
    HomePage.getSonyVaio().should('be.visible')
    
    //Stores the laptop names in a variable for future validation purpose
    HomePage.productName().invoke('text').then(function (text) {
        laptopName1 = text
    })

    //Stores the price of Sony Vaio i5 in a variable for future validation of total price in Shopping Cart Page
    HomePage.productPrice().invoke('text').then(function (text) {
        var splitText = text.split(' *includes tax')
        vaioPrice = splitText[0]
        splitText = vaioPrice.split('$')
        vaioPrice = splitText[1]
        vaioPrice = vaioPrice.concat(' USD')
        cy.log(vaioPrice);
    })

    //Adds Sony Vaio i5 to shopping cart
    HomePage.getAddToCart().click()
    cy.log('Sony Vaio i5 is successfully added to shopping cart')

    //Navigates to Home Page and then to Laptops list and selects Dell i7 8GB 
    HomePage.getHome().click()
    HomePage.getLaptopsTab().click()
    HomePage.getDell().click()

     //Validates that appropriate product detail page is displayed
    HomePage.getDell().should('be.visible')
    
    //Stores the laptop names in a variable for future validation purpose
    HomePage.productName().invoke('text').then(function (text){
        laptopName2 = text
    })

    //Adds Dell i7 8GB to Shopping Cart
    HomePage.getAddToCart().click()
    cy.log('Dell i7 8GB is successfully added to shopping cart')
    
    //Navigates to shopping cart page
    CartPage.getCart().click()

})

Then('The selected Laptops are displayed on Shopping Cart', function () {
   //Verifies that both the laptops are visible on Shopping Cart page
    CartPage.getCartProducts().invoke('text').then(function (text){
        expect(text).to.contain(laptopName1)
        expect(text).to.contain(laptopName2)
        cy.log("The following products 'Sony Vaio i5' & 'Dell i7 8GB' are present on Shopping Cart page")
    })

})


When('User Removes One Item From Cart', function () {
    //Removes Dell i7 8GB Laptop from Shopping Cart
    HomePage.getDell().parent('tr').within(function () {
        cy.get('td').eq(3).contains('Delete').click()
    })

    //Verifies that Dell i7 8GB is no longer displayed in Shopping Cart. Also verifies Sony Vaio i5 is still present
    CartPage.getCartProducts().invoke('text').then(function (text) {
        expect(text).to.contain(laptopName1)
        expect(text).not.contain(laptopName2)
        cy.log("Dell i7 8GB is successfully removed from Shopping Cart. Only Sony Vaio i5 is present for purchase.")
    })

    //Verifies that the price displayed on Shopping Cart page after removal of Dell i7 8GB laptop matches with the proce of Sony Vaio i5 laptop
    CartPage.getTotalPrice().then(function (text) {
        var vaioPriceCart
        vaioPriceCart = text.concat(' USD')
        expect(vaioPriceCart).to.equal(vaioPrice)
        cy.log('Correct price of Sony Vaio i5 is displayed on Shopping Cart Page.')
    })

})

And('User Places an Order for The Remaining Item After Filling Out The Web Form', function () {

    //Clicks on Place Order button 
    CartPage.getPlaceOrder().click()
    
    //Fills up the web forn with personal and credit card details to complete the purchase process. Test Data is picked up from DataAutomation.json file
    CartPage.getCustomerName().click()
    CartPage.getCustomerName().type(this.data.BuyerName)
    CartPage.getCustomerCountry().click()
    CartPage.getCustomerCountry().type(this.data.CountryName)
    CartPage.getCustomerCity().click()
    CartPage.getCustomerCity().type(this.data.City)
    CartPage.getCustomerCard().click()
    CartPage.getCustomerCard().type(this.data.CreditCardNo)
    CartPage.getCardMonth().click()
    CartPage.getCardMonth().type(this.data.CCExpiryMonth)
    CartPage.getCardYear().click()
    CartPage.getCardYear().type(this.data.CCExpiryYear)
    
    //Clicks on Purchase button
    CartPage.getPurchase().click()

})

Then('Corresponding Order Placement will be Successful', () => {
    
    //Prints the Order ID and Price 
    CartPage.getPurchaseInformation().invoke('text').then((text) => {
        //Retrieves the entire string containg Laptop Price and Purchase order ID; then separates the purchase order id from the string
        var splitText = text.split('Card')
        var Text1 = splitText[0]
        var Text3 = Text1.split('Amount: ')
        const Price = Text3[1]
        const purchaseId = "Purchase Order".concat(Text3[0])
        cy.log(purchaseId);
        cy.log("Sony Vaio i5 price is " +vaioPrice);
        
        //verifies that the Price Value displayed for Sony Vaio i5 on Purchase Info message is correct
        expect(Price).to.be.equals(vaioPrice)

        CartPage.getPurchaseMessage().should('be.visible')
        cy.log("The following notification is displayed- Thank you for your purchase!")

        //Clicks on OK button
        CartPage.GetWindowOk().click()
    })


})
