//Imports test data json file
beforeEach(function()
{
    cy.fixture('testData.json').then(function(data)
    {
        this.data=data
    })
})
