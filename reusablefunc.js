

export const  runRegistrationTest = (nameLoc, mobileLoc,  cityLoc, companyLoc, addressLoc, nameD, mobile, city, businessType, businessCategory, companyName, address) =>
{

  cy.get(nameLoc).type(nameD);
  cy.get(mobileLoc).type(mobile);
  cy.get(cityLoc).type(city);

  //Business Type
  cy.get('[label="Business Type *"]').click();
  cy.contains('.alert-radio-label', businessType).parent('.alert-button-inner').find('.alert-radio-icon')
  .click();
  cy.contains('.alert-button-inner', 'OK').click();

  //Business Category
  cy.get('[label="Business Categories *"]').click();
  cy.contains('.alert-radio-label', businessCategory).parent('.alert-button-inner').find('.alert-radio-icon')
    .click();
    cy.contains('.alert-button-inner', 'OK').click();

  //Company Name and Address input
  cy.get(companyLoc).type(companyName);
  cy.get(addressLoc).type(address);

  //register button
  cy.get('[style="text-align: center;"] > .md').click();

  //alert
  cy.get('.alert-head').then($alertHead => {
    if ($alertHead.find('[id^="alert-"][id$="-hdr"]').length) {
      const successAlertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]:contains("Success")');
      if (successAlertHdr.length) {
        // Handle success alert
        cy.get('[id^="alert-"][id$="-hdr"]:contains("Success")', { timeout: 10000 })
          .should('contain.text', 'Success');
        cy.get('[id^="alert-"][id$="-msg"]', { timeout: 10000 }).then($alertMsg => {
          const alertMessage = $alertMsg.text();
          cy.log(alertMessage);
          // isSuccess = true;
        });
      } else {
        const errorAlertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]:contains("Error")');
        if (errorAlertHdr.length) {
          // Handle error alert
          cy.get('[id^="alert-"][id$="-hdr"]:contains("Error")', { timeout: 10000 })
            .should('contain.text', 'Error');
          cy.get('[id^="alert-"][id$="-sub-hdr"]', { timeout: 10000 }).then($alertSubHdr => 
          {
            const alertMessage = $alertSubHdr.text();
            cy.log(alertMessage);
          });
        } else {
          cy.log('No alert found');
        }
      }
    } else {
      cy.log('No alert found');
    }

    })
}

export const runLoginTest = (usernameSelector, sendOtpButtonSelector, otpInputSelector, verifyOtpButtonSelector , username, otp) => 
{
    cy.wait(2000);

    // Enter mobile number
    cy.get(usernameSelector).type(username);

    // Click on the SEND OTP button
    cy.get(sendOtpButtonSelector).click();

    let isSuccess = false;

    Cypress.config('defaultCommandTimeout', 10000);

    // Handle alerts after sending OTP
    cy.get('.alert-head').then($alertHead => {
      if ($alertHead.find('[id^="alert-"][id$="-hdr"]').length) {
        const successAlertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]:contains("Success")');
        if (successAlertHdr.length) {
          // Handle success alert
          cy.get('[id^="alert-"][id$="-hdr"]:contains("Success")')
            .should('contain.text', 'Success');
          cy.get('[id^="alert-"][id$="-msg"]').then($alertMsg => {
            const alertMessage = $alertMsg.text();
            cy.log(alertMessage);             
             isSuccess = true;
          });
        } else {
          const errorAlertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]:contains("Error")');
          if (errorAlertHdr.length) {
            // Handle error alert
            cy.get('[id^="alert-"][id$="-hdr"]:contains("Error")')
              .should('contain.text', 'Error');
            cy.get('[id^="alert-"][id$="-sub-hdr"]').then($alertSubHdr => {
              const alertMessage = $alertSubHdr.text();
              cy.log(alertMessage);
            });
          } else {
            cy.log('No alert found');
          }
        }
      } else {
        cy.log('No alert found');
      }
    }).then(() => {
      // Conditional logic based on isSuccess flag
      if (isSuccess) {
        cy.get(otpInputSelector).type(otp);
        cy.get(verifyOtpButtonSelector).click();

        // Handle alerts after OTP verification
          cy.get('.alert-head').then($alertHead => {
          const alertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]');
          if (alertHdr.length) {
            if (alertHdr.text().includes("Success")) {
              cy.log("Success");
              const alertMsg = $alertHead.find('[id^="alert-"][id$="-msg"]').text();
              cy.log(alertMsg);

              // Click on menu option
            //  cy.get('.buttons-first-slot > .md').click();
            //  handleUserMenuChoice();

            } 
            else if (alertHdr.text().includes("Error")) {
              cy.log("Error");
              const alertSubHdr = $alertHead.find('[id^="alert-"][id$="-sub-hdr"]').text();
              cy.log(alertSubHdr);
            } else {
              cy.log('No alert found after OTP verification');
            }
          } else {
            cy.log('No alert found after OTP verification');
          }
        });
      } else {
        cy.log("Not a registered number");
      }
      
    });
    
  }

  export const goToMyConnection = () => {
    cy.get('.buttons-first-slot > .md').click();
    cy.get('ion-menu-toggle.md > [routerlink="/my-connection"]').click();
    cy.wait(2000);
  }

  export const receivedRequest = () =>
  {
    
    cy.wait(2000);
    cy.get("body").then(($body) => {
        if ($body.find("app-user ion-card.profile-card").length > 0) {
          cy.log("card is present");
          cy.get('ion-card ion-card-header ion-card-title').then(($titles) => {
            // Get the count of ion-card-title tags
            let count = 0;
            count = $titles.length;                       
            cy.log(`Received Request Count:${count}`);
                          
    })         
        } else {
          cy.log("card is not present");
        } 
    })
    
}

export const sentRequest = () =>
{
 
 cy.get(':nth-child(2) > .sc-ion-label-md-h').click({force:true});
 cy.wait(2000);

 cy.get("body").then(($body) => {
  if ($body.find("app-user ion-card.profile-card").length > 0) {
    cy.log("card is present");
    cy.get('ion-card ion-card-header ion-card-title').then(($titles) => 
      {
      // Get the count of ion-card-title tags
      let count = 0;
      count = $titles.length;                       
      cy.log(`Sent Request Count:${count}`);
                    
})         
  } else {
    cy.log("card is not present");
  } 
})
  }

  export const myConnections = () =>
  {
    // let isPresent = false;
    cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force:true});
    
    cy.get("body").then(($body) => 
    {
        if ($body.find("app-user ion-card.profile-card").length > 0) 
        {
          cy.log("card is present");
          cy.get('ion-card ion-card-header ion-card-title').then(($titles) => 
            {
            // Get the count of ion-card-title tags
            let count = 0;
            count = $titles.length;                       
            cy.log(`My Connections:${count}`);
            })                   
        } else {
          cy.log("No Connections!");
        } 
  
    });
  }

  export const accountMenu = () =>
  {
   cy.get('.buttons-first-slot > .md').click();
   cy.wait(2000);
   cy.get('[routerlink="/profile"]').click();
   cy.get('ion-button[routerlink="/profile-form"]').click({force:true});
   cy.wait(2000);
 }

 export const editDetails = (nameXpath, mobileXpath, cityXpath, companyXpath, addXpath, nameD, mobile, city, companyName, address) =>
 {
    // Using cy.xpath to find the element and store its value
    cy.xpath(nameXpath).invoke('val').as('nameUser');
    cy.xpath(mobileXpath).invoke('val').as('mobileUser');
    cy.xpath(cityXpath).invoke('val').as('cityUser');
    cy.xpath(companyXpath).invoke('val').as('compUser');
    cy.xpath(addXpath).invoke('val').as('addUser');
    
    // Now you can use the value stored in the alias 'nameUser'

    let detailsAreSame = true;

    cy.get('@nameUser').then((nameValue) => {  
      cy.log('Name User:', nameValue);    
      if (nameValue !== nameD) {
        detailsAreSame = false;
        cy.log('Name is not the same');
      } 
    });
    cy.get('@mobileUser').then((mobileValue) => {  
        cy.log('Mobile:', mobileValue); 
        if (mobileValue !== mobile) {
          detailsAreSame = false;
          cy.log('mobile number is not the same');
        }    
      });
      cy.get('@cityUser').then((cityValue) => {  
        cy.log('City:', cityValue);     
        if (cityValue !== city) {
          detailsAreSame = false;
          cy.log('City is not the same');
        }
      });

      cy.get('@compUser').then((compValue) => {  
        cy.log('Company:', compValue);    
        if (compValue !== companyName) {
          detailsAreSame = false;
          cy.log('Company is not the same');
        } 
      });
      cy.get('@addUser').then((addressValue) => {  
        cy.log('Address:', addressValue);     
        if (addressValue !== address) {
          detailsAreSame = false;
          cy.log('Address is not the same');
        }
        if (detailsAreSame) {
          cy.log('Details are the same');
          editContactDetails(inputData);
          
        } else {
          cy.log('Details are not the same');
        }
    
      });   

  //   cy.get('body').find('.alert-wrapper').should('exist').then(() => 
  //   {
  //     cy.log('.alert-wrapper is present');
      
  //     // Check if .alert-title contains "Error"
  //     cy.get('.alert-title').invoke('text').then((titleText) => {
  //       if (titleText.includes('Error')) {
  //         cy.log('.alert-title contains "Error"');
          
  //         // Extract text from .alert-sub-title
  //         cy.get('.alert-sub-title').invoke('text').then((errorMessage) => 
  //         {
  //           cy.log('Error message:', errorMessage);
            
  //         });
  //       } 
  //       else 
  //       {
  //         cy.log('.alert-title does not contain "Error"');
  //       }
  //   });
  // });
    
}

export const  editContactDetails = (contactLoc,  altConLoc, emailLoc, altEmailLoc, pinLoc, contact, alternateContact, email, alternateEmail, pincode) => 
{
  
  cy.get(contactLoc).type(contact);
   cy.get(emailLoc).type(email);
  cy.get(pinLoc).type(pincode);

  // Fill non-mandatory fields if data is provided
if (alternateContact) {
  cy.get(altConLoc).type(alternateContact);
}

if (alternateEmail) {
  cy.get(altEmailLoc).type(alternateEmail);
}


  cy.log("Details entered successfully!")
  // cy.contains('ion-button', 'Update Profile').click({force:true});
  // cy.get('ion-button.md.button.button-block.button-solid.ion-activatable.ion-focusable.hydrated').contains('Update Profile').click({force:true});
  // cy.get('body').find('.alert-wrapper').then(() => 
  //   {
  //     cy.log('.alert-wrapper is present');
      
  //     // Check if .alert-title contains "Error"
  //     cy.get('.alert-title').invoke('text').then((titleText) => {
  //       if (titleText.includes('Error')) {
  //         cy.log('.alert-title contains "Error"');
          
  //         // Extract text from .alert-sub-title
  //         cy.get('.alert-sub-title').invoke('text').then((errorMessage) => 
  //         {
  //           cy.log('Error message:', errorMessage);
            
  //         });
  //       } 
  //       else 
  //       {
  //         cy.log('.alert-title does not contain "Error"');
  //       }
  //   });
  // });

  // cy.get('ion-content').should('exist').then(($ionContent) => {
  //   if ($ionContent) {
  //     // Find and assert the first div with class profile-container
  //     cy.get($ionContent)
  //       .find('.profile-container')
  //       .should('exist');

  //     // Find and assert the second div with class additional-sections
  //     cy.get($ionContent)
  //       .find('.additional-sections')
  //       .should('exist');

  //     // Find and assert the third div with class additional-sections (assuming you meant another div with this class)
  //     cy.get($ionContent)
  //       .find('div.additional-sections') // This selects any div with class additional-sections
  //       .should('exist');
  //       cy.log("Details are present!");
  //   } else {
  //     cy.log('ion-content is not present');
  //   }
  // });
}

export const editCompanyDetails = (compSLoc, wdoLoc, specLoc, specConLoc, conSphereLoc, companySlogan, whatdo, specificGive,  connect, contactSphere) =>{
  if(companySlogan){
    cy.get(compSLoc).type(companySlogan);
  }
 
  if(whatdo){
    cy.get(wdoLoc).type(whatdo);
  }

  if(specificGive){
    cy.get(specLoc).type(specificGive);
  }

  if(connect){
    cy.get(specConLoc).type(connect);
  }

  if(contactSphere)
  {
    cy.get(conSphereLoc).type(contactSphere);
  }
  cy.get('ion-button.md.button.button-block.button-solid.ion-activatable.ion-focusable.hydrated').contains('Update Profile').click({force:true});
  cy.get('body').then(($body) => {
    if ($body.find('.alert-wrapper').length > 0) {
      cy.log('.alert-wrapper is present');

      // Check if .alert-title contains "Error"
      cy.get('.alert-title').invoke('text').then((titleText) => {
        if (titleText.includes('Error')) {
          cy.log('.alert-title contains "Error"');

          // Extract text from .alert-sub-title
          cy.get('.alert-sub-title').invoke('text').then((errorMessage) => {
            cy.log('Error message:', errorMessage);
          });
        } else {
          cy.log('.alert-title does not contain "Error"');
        }
      });
    } else {
      cy.log('.alert-wrapper is not present');
    }
  });

  cy.get('ion-content').should('exist').then(($ionContent) => {
    if ($ionContent) {
      // Find and assert the first div with class profile-container
      cy.get($ionContent).find('.profile-container').should('exist');

      // Find and assert the second div with class additional-sections
      cy.get($ionContent).find('.additional-sections').should('exist');

      // Find and assert the third div with class additional-sections (assuming you meant another div with this class)
      cy.get($ionContent)
        .find('div.additional-sections') // This selects any div with class additional-sections
        .should('exist');
        cy.log("Details are present!");
    } else {
      cy.log('ion-content is not present');
    }
  });
}

 export const logout = () =>
  {
    cy.get('.buttons-first-slot > .md').click();
    cy.get('ion-menu-toggle.md > :nth-child(4)').click();
    cy.get('button > span').contains('Logout').click();
  }