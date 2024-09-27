describe('Login Page Test', () => 
{

    beforeEach(() => {
        cy.visit('https://laundry.dibcs.in/login'); // Replace with the correct URL for your login page
      });

      it.only('should get loggedin with valid login credentials', () => 
        {
          // Enter valid login credentials
          cy.get('#ion-input-0').type('9999988888');
          cy.get('#ion-input-1').type('12345');
          
          // Click the login button
          cy.get('.login-button').click({force:true});
          orders();
          pastOrders();
          paymentPending();
        })
        
})
export function orders()
{
  let clientSearch = 'dar';
  let searchSelector = '.can-go-back>.fab-horizontal-end>.fab-buttons-container>:nth-child(1)';
  let orderSelector = '.can-go-back>.fab-horizontal-end>.fab-buttons-container>[routerlink="/new-order"]';
  let colSelector = 'app-orders ion-col .scrollable-table table tbody tr td';
  cy.get('.sc-ion-buttons-md').click({force:true});
  cy.wait(1000);
  cy.get('ion-item[routerlink="/orders"]').click({force:true});
  
  checkAndPerformActions(clientSearch,searchSelector,colSelector);
  orderBtn(orderSelector);

}

export function pastOrders()
{
  let clientSearch = 'MAYA';
  let searchSelector = '.no-scroll-content > .fab-horizontal-end > .ion-activatable ';
  let colSelector = "app-past-orders ion-col .scrollable-table table tbody tr td";
  cy.get('.sc-ion-buttons-md').click({force:true});
  cy.wait(1000);
  cy.get('ion-item[routerlink="/past-orders"]').click({force:true});

  checkAndPerformActions(clientSearch, searchSelector, colSelector);
}

export function paymentPending()
{
  let clientSearch = 'Dar';
  let searchSelector = 'app-payment-pending-order.ion-page>.no-scroll-content>.fab-horizontal-end>.ion-activatable';
  let colSelector = "app-payment-pending-order ion-col .scrollable-table table tbody tr td";
  cy.get('.sc-ion-buttons-md').click({force:true});
  cy.wait(1000);
  cy.get('ion-item[routerlink="/payment-pending-order"]').click({force:true});

  checkAndPerformActions(clientSearch, searchSelector, colSelector);
}

export function checkAndPerformActions(client, selector, colSelector) {

  cy.log(client);
  cy.get(selector).click();

  if (client) 
  {
    let clientFound = false; // Flag to track if the client is found

    // Only clientName has a value
    cy.get('ion-select[label="Client Name"]').click();

    // Wait for the ion-select popover to be visible
    cy.get('ion-select-popover').should('be.visible');

    // Loop through the ion-item elements to find and select the correct option
    cy.get('ion-select-popover>ion-list>ion-radio-group>ion-item').each(($item) =>
     {
        cy.wrap($item).find('ion-radio').invoke('text').then((text) => {
          const itemText = text.toLowerCase();
          cy.log("itemText: " + itemText);

          if (itemText.includes(client.toLowerCase())) 
          {
            // Click the item if the text matches the client
            cy.wrap($item).click();
            clientFound = true;
          }
        });
      // }
    }).then(() => 
     {
      if(clientFound)
      {
          cy.get('ion-button').contains('Search').click({ force: true });
          cy.log("Client Found!");
          checkTable(colSelector);

      }
      else 
      {
        cy.log(`Client ${client.toLowerCase()} not found`);
      }
    });
  }
}

export function checkTable(colSelector)
{
  cy.wait(2000); //Necessary
  cy.get(colSelector).invoke('text')
  .then((text) => 
  {
    // Check if the text matches "No orders available"
    if (text == "No orders available") 
    {
      cy.log(text);
    } else {
      cy.log("Client have orders!");
    }
  });
}

export function orderBtn(selector)
{
   cy.get(selector).click();
   cy.url().then((url) => 
    {
        cy.log("Current url: "+ url);
          if (url.includes("new-order")) 
          {
            cy.log("Navigated to new-order form");

          } else 
          {
            cy.log("Not navigated to new-order form");
          }
    })
}
