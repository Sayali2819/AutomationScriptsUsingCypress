describe('handle drop down', () => {

    it('dropdown with select', () => {
        cy.visit('https://www.zoho.com/commerce/free-demo.html');
        cy.get('#zcf_address_country').select('Indonesia').should('have.value', 'Indonesia');
    });

    it('dropdown without select', () => {
        cy.visit("https://www.dummyticket.com/dummy-ticket-for-visa-application/");
        
        // Click on the dropdown to make the search field visible
        cy.get('#select2-billing_country-container').click();
        
        // Wait for the search field to be visible and type in the search term
        cy.get('.select2-search__field').type('Iceland').type('{enter}');
        cy.get('#select2-billing_country-container').should('have.text', 'Iceland');
    });

    it('autosuggested drop down', () => {
        cy.visit('https://www.wikipedia.org/');
        cy.get('#searchInput').type('Delhi');
        cy.get('.suggestion-title').contains('Delhi University').click();
    })

    it('dynamic drop down', () => {
        cy.visit('https://www.google.com/');
        cy.get('textarea[title="Search"]').type('cypress automation');
        cy.wait(3000);
        //how many links are present
        cy.get('div.wM6W7d>span').should('have.length', 13);

        cy.get('div.wM6W7d>span').each(($el, index, $list)=>
        {
            if($el.text()== 'cypress automation tool')
            {
                cy.wrap($el).click();
            }               
        })
    })
});
