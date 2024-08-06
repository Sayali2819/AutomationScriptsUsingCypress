import { generateRandomString, generateRandomLetters, generateRandomDigitString, generateRandomEmail } from './genrandVal'

describe("Positive Sequence", () => {
    // DefiC:\Sayali\bbgScript\cypress\e2ene locators and data for registration
    const nameLoc = "#ion-input-0";
    const mobileLoc = "#ion-input-1";
    const cityLoc = "#ion-input-2";
    const companyLoc = "#ion-input-3";
    const addressLoc = "#ion-textarea-0";

    const nameD = generateRandomLetters(7);
    const mobile = generateRandomDigitString(10);
    const city = generateRandomLetters(9);
    const businessType = "Joint venture";
    const businessCategory = "Finance";
    const companyName = generateRandomString(8);
    const address = generateRandomString(30);

    // // Define data for login
    const otp = "12345"; // Replace with the actual OTP or a mechanism to fetch it

    beforeEach(() => {
        cy.visit('https://bbg.dibcs.in');
        cy.wait(2000);
    });

    it("should handle the positive sequence", () => {
        runRegistrationTest();
        });

        // Define runRegistrationTest function
function runRegistrationTest() {
    // cy.visit("https://bbg.dibcs.in");

    // let isRegistered = false;
  
    // Type into fields after ensuring they are enabled
    cy.get(nameLoc).type(nameD);
    cy.get(mobileLoc).type(mobile);
    cy.get(cityLoc).type(city);

    // Business Type
    cy.get('[label="Business Type *"]').click();
    cy.contains('.alert-radio-label', businessType).parent('.alert-button-inner').find('.alert-radio-icon').click();
    cy.contains('.alert-button-inner', 'OK').click();

    // Business Category
    cy.get('[label="Business Categories *"]').click();
    cy.contains('.alert-radio-label', businessCategory).parent('.alert-button-inner').find('.alert-radio-icon').click();
    cy.contains('.alert-button-inner', 'OK').click();

    // Company Name and Address input
    cy.get(companyLoc).type(companyName);
    cy.get(addressLoc).type(address);

    // Register button
    cy.get('[style="text-align: center;"] > .md').click();

    // Handle alerts
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
           
            cy.wait(2000);
            runLoginTest();
            
          });
        } else {
          const errorAlertHdr = $alertHead.find('[id^="alert-"][id$="-hdr"]:contains("Error")');
          if (errorAlertHdr.length) {
            // Handle error alert
            cy.get('[id^="alert-"][id$="-hdr"]:contains("Error")', { timeout: 10000 })
              .should('contain.text', 'Error');
            cy.get('[id^="alert-"][id$="-sub-hdr"]', { timeout: 10000 }).then($alertSubHdr => {
              const alertMessage = $alertSubHdr.text();
              cy.log(alertMessage);
              cy.wait(2000);
              
            });
          } else {
            cy.log('No alert found');
          }
        }
      } else {
        cy.log('No alert found');
      }
      
    });
  }


  function goToDashboard() {
    cy.get('.buttons-first-slot > .md').click();
    cy.wait(2000);
    cy.get('[routerlink="/dashboard"]').click();
    cy.wait(2000); // Adjust the wait time as needed for the page to load

    cy.get('body').then($body => {
        if ($body.find('.user-name').length > 0) {
          // Loop through all elements with the class 'user-name' and log their text content
          cy.get('.user-name').each($el => {
            const userName = $el.text();
            cy.log(`Approved User: ${userName}`);
           
          })
        } else {
          // Assert failure if no approved users are found
          cy.log('No approved users found').then(() => {
            throw new Error('No approved users found');
          })
        }
        
      });
    
   }  

   // Define runLoginTest function
   function runLoginTest() {
    
    // Locators and data for login
    const usernameSelector = "#ion-input-4";
    const sendOtpButtonSelector = 'ion-button:contains("send otp")';
    const otpInputSelector = "#ion-input-5"; // Adjust the selector based on the actual OTP input field
    const verifyOtpButtonSelector = 'ion-button:contains(" OTP Verification")'; // Adjust the selector based on the actual OTP verification button

    const otp = "12345"; // Replace with the actual OTP or a mechanism to fetch it

    // Enter mobile number
    cy.get(usernameSelector).type(mobile);

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
            cy.wait(2000);
            goToDashboard();
             accountMenu();

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

  function editDetails(){


     //Locators
    const nameXpath = '/html/body/app-root/ion-app/ion-router-outlet/app-profile-form/ion-content/ion-list/ion-item-group[1]/ion-grid/ion-row/ion-col[1]/ion-input/label/div[3]/input';
    const mobileXpath = '/html/body/app-root/ion-app/ion-router-outlet/app-profile-form/ion-content/ion-list/ion-item-group[1]/ion-grid/ion-row/ion-col[2]/ion-input/label/div[3]/input';
    const cityXpath = '/html/body/app-root/ion-app/ion-router-outlet/app-profile-form/ion-content/ion-list/ion-item-group[1]/ion-grid/ion-row/ion-col[3]/ion-input/label/div[3]/input';
    const companyXpath = '/html/body/app-root/ion-app/ion-router-outlet/app-profile-form/ion-content/ion-list/ion-item-group[2]/ion-grid/ion-row/ion-col[3]/ion-input/label/div[3]/input';
    const addXpath = '/html/body/app-root/ion-app/ion-router-outlet/app-profile-form/ion-content/ion-list/ion-item-group[1]/ion-grid/ion-row/ion-col[4]/ion-textarea/label/div[3]/textarea';

    // Using cy.xpath to find the element and store its value
    cy.xpath(nameXpath).invoke('val').as('nameUser');
    cy.xpath(mobileXpath).invoke('val').as('mobileUser');
    cy.xpath(cityXpath).invoke('val').as('cityUser');
    // cy.xpath(businessTypeXpath).invoke('val').as('typeUser');
    // cy.xpath(businessCatXpath).invoke('val').as('mobileUser');
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

      // cy.get('ion-select[name="bussines_type"]') // Select the ion-select element by its name attribute
      // .click(); // Click to open the dropdown
    
    // Wait for the dropdown to open and radio buttons to be visible
  //   cy.get('.alert-radio-icon', { timeout: 10000 }) // Adjust timeout as needed
  // .should('be.visible') // Ensure the elements are visible
  // .then(() => {
  //   // Find the selected radio button based on the structure
  //   cy.get('.alert-radio-icon > .alert-radio-inner') // Selects only those alert-radio-inner elements that are direct children of alert-radio-icon
  //     .closest('.alert-button-inner')
  //     .find('.alert-radio-label')
  //     .then(($selectedElement) => {
  //       const selectedText = $selectedElement.text().trim();
  //       cy.log(`Selected radio button value: ${selectedText}`);
  //     });
  // });

    // Wait for the dropdown to open and radio buttons to be visible
// cy.wait(2000);
// cy.get('.alert-radio-icon')
// .should('be.visible') // Ensure the elements are visible
// .then(() => {
//   // Find the selected radio button based on the structur3
//   cy.get('.alert-radio-icon > .alert-radio-inner')
//     .each(($radioButton) => {
//       // Check if this radio button is enabled
//       const isEnabled = $radioButton.find('.radio-icon-inner-checked').length > 0;

//       if (isEnabled) {
//         // Get the label associated with the enabled radio button
//         const selectedText = $radioButton.closest('.alert-radio-label').text().trim();
//         cy.log(`Selected radio button value: ${selectedText}`);
//       }
//     });
// });

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
      
  }

  const inputData = {
    contact: '4234567891',
    // alternateContact: '4987654321', // Optional
    email: 'example2@example.com',
    // alternateEmail: 'alternate2@example.com', // Optional
    pincode: '434567',
    companySlogan: 'Innovating the Future',
    whatdo: 'Software Development',
    specificGive: 'Quality Code',
    connect: 'Business Networking',
    contactSphere: 'Global'
  };

  function editContactDetails({contact, alternateContact, email, alternateEmail, pincode, companySlogan, whatdo, specificGive,
    connect, contactSphere
  })
  {
    //Locators
    const contactLoc = '#ion-input-9';
    const altConLoc = '#ion-input-10';
    const emailLoc = '#ion-input-11';
    const altEmailLoc = '#ion-input-12';
    const pinLoc = '#ion-input-13';


    //Company Details Locators
    const compSLoc = 'input[name="company_slogan"]';
    const wdoLoc = 'input[name="user_what_do"]';
    const specLoc = 'input[name="user_specific"]';
    const specConLoc = 'input[name="user_specific_connect"]';
    const conSphereLoc = 'input[name="user_contact_sphere"]';
     
   

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

  
  if(contactSphere){
    cy.get(conSphereLoc).type(contactSphere);
  }
  
    cy.log("Details entered successfully!")
    cy.contains('ion-button', 'Update Profile').click();

    cy.get('ion-content').should('exist').then(($ionContent) => {
      if ($ionContent) {
        // Find and assert the first div with class profile-container
        cy.get($ionContent)
          .find('.profile-container')
          .should('exist');

        // Find and assert the second div with class additional-sections
        cy.get($ionContent)
          .find('.additional-sections')
          .should('exist');

        // Find and assert the third div with class additional-sections (assuming you meant another div with this class)
        cy.get($ionContent)
          .find('div.additional-sections') // This selects any div with class additional-sections
          .should('exist');
          cy.log("Details are present!");
      } else {
        cy.log('ion-content is not present');
      }
    });

     logout();
    
    // if(companySlogan ||  whatdo || specificGive,
    //   connect ||  contactSphere)
    //   {
    //     dataVerification(inputData);
    //   }
    
    // //To check cards are present or not 
    // cy.get('ion-content').should('exist').then(($ionContent) => {
    //   if ($ionContent) {
    //     // Find and assert the first div with class profile-container
    //     cy.get($ionContent).find('.profile-container').should('exist');

    //     // Find and assert the second div with class additional-sections
    //     cy.get($ionContent).find('.additional-sections').should('exist');

    //     // Find and assert the third div with class additional-sections (assuming you meant another div with this class)
    //     cy.get($ionContent).find('div.additional-sections').should('exist');
    //       cy.log("Details are present!");
    //   } else {
    //     cy.log('ion-content is not present');
    //   }
    // });
   

}


// function dataVerification({companySlogan, whatdo, specificGive,
//   connect, contactSphere})
// {
//   cy.get('ion-content').should('exist').then(($ionContent) => {
//       if ($ionContent)
//      {
//        cy.get($ionContent).find('.additional-sections').should('exist');
       
//        if (companySlogan) 
//        {
//         cy.get('.additional-sections').should('contain.text', companySlogan);
//         cy.log("Company Slogan is present!");
//        }
//        else
//        {
//          cy.log("Company Slogan is not present!");
//        }

//        if (whatdo) 
//         {
//          cy.xpath('//*[@id="main"]/app-profile/ion-content/div[3]/ion-card[1]/ion-card-header/ion-card-subtitle').should('contain.text', whatdo);
//          cy.log("What to do is present!");
//         }
//         else
//         {
//           cy.log("What to do is not present!");
//         }

//         if (specificGive) 
//           {
//            cy.xpath('//*[@id="main"]/app-profile/ion-content/div[3]/ion-card[2]/ion-card-header/ion-card-subtitle').should('contain.text', specificGive);
//            cy.log("Specific Give is present!");
//           }
//           else
//           {
//             cy.log("Specific Give is not present!");
//           }

//           if (connect) 
//             {
//              cy.xpath('//*[@id="main"]/app-profile/ion-content/div[3]/ion-card[2]/ion-card-header/ion-card-subtitle').should('contain.text', connect);
//              cy.log("connect is present!");
//             }
//             else
//             {
//               cy.log("connect is not present!");
//             }

//             if (contactSphere) 
//               {
//                cy.xpath('//*[@id="main"]/app-profile/ion-content/div[3]/ion-card[2]/ion-card-header/ion-card-subtitle').should('contain.text', contactSphere);
//                cy.log("contactSphere is present!");
//               }
//               else
//               {
//                 cy.log("contactSphere is not present!");
//               }
//       }
//       else{
//         cy.log("Ion-Content is not visible!");
//        }
//      })
//   }
   
  function accountMenu()
   {
    cy.get('.buttons-first-slot > .md').click();
    cy.wait(2000);
    cy.get('[routerlink="/profile"]').click();
    cy.get('ion-button[routerlink="/profile-form"]').click({force:true});
    cy.wait(2000);

    editDetails(); 

  }

})

function logout() 
  {
    cy.get('.buttons-first-slot > .md').click();
    cy.contains('ion-item', 'Logout').within(() => {
      cy.get('ion-icon[name="log-in-outline"]').click();
    });
    cy.contains('span.alert-button-inner', 'Logout').click();
  }
  