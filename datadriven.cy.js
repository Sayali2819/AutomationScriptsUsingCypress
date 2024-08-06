describe('Data Driven Testing', () => {
    beforeEach(() => {
      // Handling uncaught exceptions to prevent the test from failing
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignore specific errors by checking the error message
        if (err.message.includes('Cannot read properties of undefined')) {
          // Returning false prevents Cypress from failing the test
          return false;
        }
        // Returning true allows Cypress to fail the test for other errors
        return true;
      });
    });
  
    it('Test', () => {
      cy.fixture("orangehrm2").then((data) => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  
        data.forEach((userdata) => {
          cy.get('input[name="username"]').type(userdata.username);
          cy.get('input[name="password"]').type(userdata.password);
          cy.get('button[type="submit"]').click();
  
          cy.url().then((url) => {
            if (url.includes('/dashboard')) {
              cy.log('Successful login');
              
              // Perform logout actions
              cy.get('.oxd-userdropdown-tab > .oxd-icon').click();
              cy.get('a[href="/web/index.php/auth/logout"]').click();
  
            } else {
              // Handling invalid credentials
              cy.get('p.oxd-alert-content-text').then(($p) => {
                if ($p.is(':visible')) {
                  const errorMessage = $p.text();
                  cy.log('Error Message: ', errorMessage);
                  // Additional assertions can be added here if needed
                } else {
                  cy.log('No invalid credentials message found');
                }
              });
            }
          });
        });
      });
    });
  });
  