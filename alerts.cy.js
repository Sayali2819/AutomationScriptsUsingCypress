describe('Alerts', () => {

    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    })

    it('Js alert', () => {

        cy.contains('button', 'Click for JS Alert').click();

        //validating the text present in the alert window
        cy.on('window:alert',(t)=> {
            expect(t).to.contains('I am a JS Alert');
        })

        //alert window automatically closed by cypress
        cy.get('#result').should('have.text', 'You successfully clicked an alert');

    })

    it('Confirmation Alert - Clicking Ok', () => {
    
        cy.get('button[onclick="jsConfirm()"]').click();
        cy.on('window:confirm',(msg)=> 
        {
            expect(msg).to.contains('I am a JS Confirm');
        })

        cy.get('#result').should('have.text', 'You clicked: Ok');
    })

    it('Confirmation Alert - Clicking Cancel', () => {
    
        cy.get('button[onclick="jsConfirm()"]').click();
        cy.on('window:confirm',(msg)=> 
        {
            expect(msg).to.contains('I am a JS Confirm');
        })

        //Event to click on confirm 
        cy.on('window:confirm', () => false);
        cy.get('#result').should('have.text', 'You clicked: Cancel');
       
    })

    it('Prompt Alert', () => {
        cy.window().then((win) => {
            cy.stub(win,'prompt').returns('welcome');           
        })
        cy.get('button[onclick="jsPrompt()"]').click();
    })

    it.only('Authenticated Alert', () => {

        //approach 1
        // cy.visit('https://the-internet.herokuapp.com/basic_auth',{auth: {username: 'admin', password: 'admin'}});
        // cy.get('.example').should('have.contain', "Congratulations!");

        //approach 2
         cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth');
         cy.get('.example').should('have.contain', "Congratulations!");

    })

})













