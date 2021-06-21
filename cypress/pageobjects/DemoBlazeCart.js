class DemoBlazeCart {
    getCart() {
        return cy.contains('Cart')
    }
    getTotalPrice() {
        return cy.get('.panel-title').invoke('text')
    }
    getPlaceOrder() {
        return cy.contains('Place Order')
    }
    getCustomerName() {
        return cy.get('input[id="name"]')
    }
    getCustomerCountry() {
        return cy.get('input[id="country"]')
    }
    getCustomerCity() {
        return cy.get('input[id="city"]')
    }
    getCustomerCard() {
        return cy.get('input[id="card"]')
    }

    getCardMonth() {
        return cy.get('input[id="month"]')
    }
    getCardYear() {
        return cy.get('input[id="year"]')
    }
    getPurchase() {
        return cy.get('button[type="button"]').contains('Purchase')
    }
    getPurchaseMessage() {
        return cy.contains('Thank you for your purchase!')
    }
    GetWindowOk() {
        return cy.get('.confirm.btn.btn-lg.btn-primary').contains('OK')
    }
    getPurchaseInformation() {
        return cy.get('.lead.text-muted')
    }
    getCartProducts() {
        return cy.get('.success')
    }
}
export default DemoBlazeCart; 