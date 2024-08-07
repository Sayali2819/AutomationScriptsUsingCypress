describe("Handle Tabs approach1", ( () => {

    it('Approach1', () => {
        cy.visit('https://the-internet.herokuapp.com/windows');

        //It will open the new tab
        // cy.get('.example>a').click();

        //It will open the page in the same tab
        cy.get('.example>a').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new');
        cy.wait(2000);
        cy.go('back');  //Back to parent tab
    })

    it.only('Approach2', () => {
        //Visiting page
        cy.visit('https://the-internet.herokuapp.com/windows');

        //Extract the URL from the anchor tag's href attribute.
        cy.get('.example>a').then((e) => {
            let url = e.prop('href');
            cy.visit(url);  //Visiting the extracted url
            cy.url().should('include', 'https://the-internet.herokuapp.com/windows/new');
            cy.wait(2000);
            cy.go('back');  //Back to parent tab
        })
    })
}))