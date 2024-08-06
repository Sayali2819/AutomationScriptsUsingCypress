describe("Check UI Elements", () => {

    beforeEach(() => {
        cy.visit("https://testautomationpractice.blogspot.com/");
    });

    it("Checking Radio buttons", () => {
        // Checks the visibility of elements
        cy.get("#female").should('be.visible');
        cy.get("#male").should('be.visible');

        // Selecting radio button
        cy.get("#male").check().should('be.checked');
        cy.get("#female").should('not.be.checked');
    });

    it("Checking check box", () => {

        //Check the visibility of elements
        cy.get("#wednesday").should('be.visible');
        cy.get("#saturday").should('be.visible');
        cy.get("#friday").should('be.visible');

         // Selecting check boxes
         cy.get("#tuesday").check().should('be.checked');
         cy.get("#saturday").check().should('be.checked');
         cy.get("#wednesday").check().should('be.checked');

         //Unselecting the selected check box
         cy.get("#saturday").uncheck().should('not.be.checked');

        //Selecting all the check boxes
        cy.get('input[type="checkbox"]').check().should('be.checked');

        //Unselecting all the check boxes
        cy.get('input[type="checkbox"]').uncheck().should('not.be.checked');

        //Select first check box
        cy.get('input[type="checkbox"]').first().check();
        
        //Select last check box
        cy.get('input[type="checkbox"]').last().check(); 
    });

});
