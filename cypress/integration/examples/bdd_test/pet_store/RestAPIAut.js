import { When, Then } from "cypress-cucumber-preprocessor/steps";


let itemExternal;
let responseExternal;


When('User Makes GET API Call when Status is Available',function() {
 //Performs a GET API call with status as 'available'
    cy.server()
    cy.log(this.data.statusSold)
    cy.request(`${this.data.petStoreUrl}findByStatus?status=${this.data.statusAvailable}`).then((response) => {
    responseExternal = response;
    console.log(response.body);

  //Loops through each record set retrieved and verifies its status is 'available' and response status is 200 
      response.body.forEach((item) => {   
        itemExternal = item;         
        console.log(item);
        expect(item.status).to.be.equal(this.data.statusAvailable);
        expect(response.status).to.eq(200);
      })
  })
})

Then('The Call Returns All Pets with Status Available',function() {
   expect(itemExternal.status).to.be.equal(this.data.statusAvailable);
   expect(responseExternal.status).to.eq(200);
})



When('User Invokes a POST API Call to Add New Pet to the Store',function() {
    cy.server()

    //Performs POST operation to create a Pet at Petstore with an unique id and 'available' status
    cy.request('POST', this.data.petStoreUrl, 
    {
      "id": this.data.idValue,
      "category": 
      {
        "id": 123,
        "name": "string"
      },
      "name": "NameText",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 456,
          "name": "string"
        }
      ],
      "status": this.data.statusAvailable
     
    }).then((response) => { 
      console.log(response.body);

      //verifies the id displayed in response body matches with the unique pet id
      expect(response.body.id).to.be.equal(this.data.idValue);

      //Verifies that response status is 200
      expect(response.status).to.eq(200)
    })
})

Then('Pet Information Gets Added to the Store Successfully',function() {
    cy.server()

  //Performrs a GET request with newly created Pet ID to verify that the record has been created successfully
  cy.request(`${this.data.petStoreUrl}${this.data.idValue}`).then((response) => {
    responseExternal = response;
    console.log(response.body);
    expect(response.body.id).to.be.equal(this.data.idValue);
    expect(response.status).to.eq(200)
  })

})

When('User Invokes a PUT API Call to Update Pet Status',function() {
  cy.server()

  //Performs an update on the record created in the previous step by changing the pets's status from available to sold
  cy.request('PUT', this.data.petStoreUrl, 
  {
      "id": this.data.idValue,
      "category": {
        "id": 123,
        "name": "string"
      },
      "name": "NameText",
      "photoUrls": [
        "string"
      ],
      "tags": [
        {
          "id": 456,
          "name": "string"
        }
      ],
      "status": this.data.statusSold
  }
    )
    .then((response) => { 
      //console.log("inside then")
      console.log(response.body);
      expect(response.body.status).to.be.equal(this.data.statusSold);
      expect(response.status).to.be.equal(200)
     })
   
})

Then('Pet Status Gets Updated Successfully',function() {
  //Performrs a GET request with newly created Pet ID to verify that the pet's status has been successfully updated to sold
    cy.request(`${this.data.petStoreUrl}${this.data.idValue}`).then((response) => {
    console.log(response.body);
    expect(response.body.status).to.be.equal(this.data.statusSold);
    expect(response.status).to.be.equal(200)
  });  
})

When('User Invokes a DELETE API Call to Delete the Newly Added Pet',function() {
  cy.server()

  //Deletes the newly created pet from pet store
    cy.request('DELETE',`${this.data.petStoreUrl}${this.data.idValue}`).then((response) => {
    console.log(response.body);
    expect(response.body.code).to.be.equal(200);
  })
})

Then('Corresponding Pet Information Gets Deleted Successfully',function() {
  cy.server()

  //Performs a GET operation with the created pet id and verifies that the pet record is no longer present in the database 
  cy.request({url:`${this.data.petStoreUrl}${this.data.idValue}`,failOnStatusCode: false}).then((response) => {
  expect(response.body.message).to.be.equal('Pet not found');
  })  
})

