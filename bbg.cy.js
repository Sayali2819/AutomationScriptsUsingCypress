describe("Registration", () => {
  
    // Define runRegistrationTest function
    function runRegistrationTest() {
      cy.visit("https://bbg.dibcs.in");
  
      // Locators and data for registration
      const nameLoc = "#ion-input-0";
      const mobileLoc = "#ion-input-1";
      const cityLoc = "#ion-input-2";
      const companyLoc = "#ion-input-3";
      const addressLoc = "#ion-textarea-0";
  
      const nameD = "Maitrey";
      const mobile = "5763467892";
      const city = "Goregaon";
      const businessType = "Corporation";
      const businessCategory = "Education";
      const companyName = "Venus Park";
      const address = "Lotus Corporate Park, 502 D- Wing, Ram Mandir Lane, Jai Coach, Junction, Western Express Hwy, Goregaon";
  
      // Type into fields after ensuring they are enabled
      cy.get("#ion-input-0").type(nameD);
      cy.get("#ion-input-1").type(mobile);
      cy.get("#ion-input-2").type(city);
  
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
  
    // Define runLoginTest function
    function runLoginTest() {
      cy.wait(2000);
      // Locators and data for login
      const usernameSelector = "#ion-input-4";
      const sendOtpButtonSelector = 'ion-button:contains("send otp")';
      const otpInputSelector = "#ion-input-5"; // Adjust the selector based on the actual OTP input field
      const verifyOtpButtonSelector = 'ion-button:contains(" OTP Verification")'; // Adjust the selector based on the actual OTP verification button
  
      const username = "9021708264";
      const otp = "12345"; // Replace with the actual OTP or a mechanism to fetch it
  
      // Step 1: Visit the initial URL
      cy.visit("https://bbg.dibcs.in/home");
  
      // Step 2: Click on the LOGIN button
      cy.contains("strong", "Click here to LOGIN").click();
  
      // Step 3: Verify the new URL and visit the OTP page
      cy.url().should("include", "/otp");
  
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
               cy.get('.buttons-first-slot > .md').click();
               handleUserMenuChoice();

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
  

    // Define individual menu option functions
  function goToDashboard() {
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

  function goToProfile() {
    cy.get('[routerlink="/profile"]').click();

    cy.wait(2000);
    cy.window().then((win) => {
        const choice = win.prompt("Enter your choice: 1.Details are present or not  2. Edit details");
        switch (choice) {
          case "1":
            // Call function to get details
            getProfileDetails();
            break;
          case "2":
            // Call function to edit details
            editProfileDetails();
            break;
          default:
            cy.log("Invalid choice");
        }
      });
  }

  function getProfileDetails() {
    
    cy.log("Fetching profile details...");

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
 }
  
  function editProfileDetails() {
    
      cy.log("Editing  details...");
      cy.wait(2000);
      
        cy.get('ion-button[routerlink="/profile-form"]').click({force:true});
  }


   function goToMyConnection() {
    cy.get('ion-menu-toggle.md > [routerlink="/my-connection"]').click();
    cy.wait(2000);
    cy.window().then((win) => {
      const option = win.prompt("Enter your choice: 1.Received Request 2.Sent Request 3.My Connection");
      switch (option) 
      {
        case "1":
          receivedRequest();
          break;
        case "2":
          sentRequest();
          break;
        case "3":
          myConnections();
          break;
        case "4":
          logout();
          break;
        default:
          cy.log("Invalid choice");
       }
      })
  }

  function receivedRequest()
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

function sentRequest()
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

  function myConnections()
  {
    // let isPresent = false;
    cy.get(':nth-child(3) > .sc-ion-label-md-h').click({force:true});
    cy.wait(2000);
    
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

  function logout() 
  {
    cy.get('ion-menu-toggle.md > :nth-child(4)').click();
    cy.get('button > span').contains('Logout').click();
  }
  
    // Define handleUserMenuChoice function
  function handleUserMenuChoice() {
    cy.wait(2000);
    cy.window().then((win) => {
      const userChoice = win.prompt("Enter your choice: 1.Home 2.Account 3.My Connection 4.Logout");
      switch (userChoice) {
        case "1":
            goToDashboard();
            break;
        case "2":
            goToProfile();
            break;
        case "3":
            goToMyConnection();
            break;
        case "4":
            logout();
            break;
        default:
          cy.log("Invalid choice");
      }
    });
  }

  function funCall() {
    cy.window().then((win) => {
      let choice;
      do {
        choice = win.prompt("Enter your choice: 1.Home 2.Account 3.My Connection 4.Logout");
        // Add logic based on the choice
        switch (choice) {
          case '1':
            goToDashboard();
            break;
          case '2':
            goToProfile();
            break;
          case '3':
            goToMyConnection
            break;
          case '4':
            logout();
            break;
          default:
            console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
        }
      } while (choice !== '4');
    });
  }
  
    // Test case for handling user choice - Register or Login
    it("should handle user choice for registration or login", () => {
      cy.window().then((win) => {
        const choice = win.prompt("Enter 'register' to register or press OK to login:");
        if (choice && choice.trim().toLowerCase() === "register") {
          // Run registration test
          runRegistrationTest();
        } else {
          console.log("Login");
          // Run login test
          runLoginTest();
        }
      });
    });
  
  });
  