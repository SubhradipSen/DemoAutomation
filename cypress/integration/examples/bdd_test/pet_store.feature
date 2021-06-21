Feature: Pet Store Activities

    User wants to see all the available pets in  store, add a new pet to the store, update status of the 
    newly added pet and subsequently delete the pet from store.

    Scenario: Get Pet Information by status
    When User Makes GET API Call when Status is Available
    Then The Call Returns All Pets with Status Available
    

    Scenario: User Adds a New Pet to the Pet Store
    When User Invokes a POST API Call to Add New Pet to the Store
    Then Pet Information Gets Added to the Store Successfully

    Scenario: Update Status of a Pet 
    When User Invokes a PUT API Call to Update Pet Status 
    Then Pet Status Gets Updated Successfully

    Scenario: Delete the Newly Added Pet from Pet Store
    When User Invokes a DELETE API Call to Delete the Newly Added Pet
    Then Corresponding Pet Information Gets Deleted Successfully