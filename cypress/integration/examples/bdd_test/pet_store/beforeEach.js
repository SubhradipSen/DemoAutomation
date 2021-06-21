//Imports test data json file
beforeEach(function()
{
    cy.fixture('petStoreData.json').then(function(data)
    {
        this.data=data
    })
})
