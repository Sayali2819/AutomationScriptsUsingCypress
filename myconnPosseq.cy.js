import { runLoginTest, goToMyConnection,  receivedRequest,  sentRequest, myConnections , logout} from './reusablefunc';

describe("Positive Sequence of My Connection", () => {

     //Locators 
     const usernameSelector = "#ion-input-4";
     const sendOtpButtonSelector = 'ion-button:contains("send otp")';
     const otpInputSelector = "#ion-input-5"; // Adjust the selector based on the actual OTP input field
     const verifyOtpButtonSelector = 'ion-button:contains(" OTP Verification")'; // Adjust the selector based on the actual OTP verification button

     //Login Data
     const username = '7777777777';
     const otp = '12345';

    // }
       
    it("should handle the positive sequence", () => {
        cy.visit("https://bbg.dibcs.in/home");
        runLoginTest(usernameSelector, sendOtpButtonSelector, otpInputSelector, verifyOtpButtonSelector , username, otp);
        cy.url().then(url => {
            if (url.includes('/dashboard')) 
            {
                goToMyConnection();

                cy.url().then(url => {
                    if(url.includes('/my-connection'))
                    {
                        receivedRequest();
                        cy.wait(2000);
                        sentRequest();
                        cy.wait(2000);
                        myConnections();
                    }
                })
            }
         });
         logout();
    });


})