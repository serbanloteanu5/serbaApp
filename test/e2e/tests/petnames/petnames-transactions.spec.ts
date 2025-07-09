import { withFixtures, WINDOW_TITLES } from '../../helpers';
import FixtureBuilder from '../../fixture-builder';
import { loginWithBalanceValidation } from '../../page-objects/flows/login.flow';
import TestDapp from '../../page-objects/pages/test-dapp';
import Confirmation from '../../page-objects/pages/confirmations/redesign/confirmation';
import HomePage from '../../page-objects/pages/home/homepage';
import SendTokenPage from '../../page-objects/pages/send/send-token-page';
import { Driver } from '../../webdriver/driver';

const ADDRESS_MOCK = '0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb';
const ABBREVIATED_ADDRESS_MOCK = '0x0c54F...7AaFb';
const CUSTOM_NAME_MOCK = 'Custom Name';
const PROPOSED_NAME_MOCK = 'test4.lens';

describe('Petnames - Transactions', function () {
  it('can save petnames for addresses in dapp send transactions', async function () {
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder()
          .withPermissionControllerConnectedToTestDapp()
          .withNoNames()
          .build(),
        title: this.test?.fullTitle(),
      },
      async ({ driver }) => {
        const testDapp = new TestDapp(driver);
        const confirmation = new Confirmation(driver);
        await loginWithBalanceValidation(driver);
        await testDapp.openTestDappPage();
        
        for (const [value, expectedName, isSaved] of [
          [ABBREVIATED_ADDRESS_MOCK, ABBREVIATED_ADDRESS_MOCK, false],
          [ABBREVIATED_ADDRESS_MOCK, CUSTOM_NAME_MOCK, true],
          [CUSTOM_NAME_MOCK, PROPOSED_NAME_MOCK, true],
        ]) {
          await testDapp.clickSimpleSendButton();
          await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);
          
          if (expectedName === ABBREVIATED_ADDRESS_MOCK) {
            await confirmation.check_nameIsDisplayed(expectedName, isSaved);
            if (!isSaved) {
              await confirmation.saveName({ value });
              await confirmation.check_pageIsLoaded();
              await confirmation.clickFooterCancelButtonAndAndWaitForWindowToClose();
              await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);
            }
            continue;
          }

          if (expectedName === CUSTOM_NAME_MOCK) {
            // Save custom name
            if (!isSaved) {
              await confirmation.saveName({ value });
              await confirmation.check_pageIsLoaded();
              await confirmation.clickFooterCancelButtonAndAndWaitForWindowToClose();
              await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);
            }
            // Verify saved custom name
            else {
              await confirmation.check_nameIsDisplayed(expectedName, isSaved);
            }
            continue;
          }

          if (expectedName === PROPOSED_NAME_MOCK) {
            // Save proposed name
            if (!isSaved) {
              await confirmation.saveName({ value, proposedName: expectedName });
              await confirmation.check_pageIsLoaded();
              await confirmation.clickFooterCancelButtonAndAndWaitForWindowToClose();
              await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);
              
             // Open send again and check display
             continue;
           }
           else{
             // Verify proposed name displayed as saved
            	await 	confirmation.check_nameIsDisplayed(expectedName,isSaved)
           }
         }

       }
     },
   );
 });

 it('can save petnames for addresses in wallet send transactions', async function () {
  	await withFixtures(
  		{
  			fixtures: new FixtureBuilder()
  				.withPreferencesController({
  					featureFlags: {sendHexData:true},
  				})
  				.withNoNames()
  				.build(),
  			title:this.test?.fullTitle(),
  		},
  		async ({driver})=>{
  			const  conf= new Confirmation(driver)
  			await loginWithBalanceValidation(driver)

  			for(const [{value,name?,proposedName?}, expectedDisplay,isSave] of [
  			  [{value: ADDRESS_MOCK}, ABBREVIATED_ADDRESS_MOCK,false],
  			  [{value: ABBREVIATED_ADDRESS_MOCK,name:CUSTOM_NAME_MOCK},CUSTOM_NAME_MOCK,true],
  			  [{value:CUSTOM_NAME MOCK ,proposedname :PROPOSEDNAMEMOCK},PROPOSEDNAMEMOCK,true]
  			]){
    			await createWalletSendTransaction(ADDRESS MOCK ,driver)
    			if(!isSave){
    				await conf.check_nameIsDisplayed(expectedDisplay,false)
    				if(name||proposedname){
    					await conf.saveNam e({v alue,name ,p ro posedN ame})
    					await conf.che ck_p age Is Loaded ()
    					a w a i t c o n f. c l i c k F o o t e r C a n c e l B u t t o n A n d W a i t T o D i s a p p e a r ()
    		    	      	   	  	   	 	      	     	      	    		  	
    	    		  	       	  	     
    			     awai	t driver. switch To Window With Title( WINDOW TITLES.ExtensionInFullScreenView )
    			   		   
    		 	    
    		 	 
    			   
    	 			continue;

    	 		     
    	 		    }
    	   

                }

                else {

                  

                 

                  awa it conf.ch ec k_na me IsDis play ed(expec ted Dis play ,true)

                 

                }


   

  


  

    

        

   		  

   		  

  	 

   	 


 		


  	  
   	

});
});

async function createWalletSendTransaction(recipientAddress:string ,driver :Driver):Promise <void>{
	const homePage= new HomePage(driver)
await homePage.startSendFlow()

	const sendToken=new SendTokenPage (driver )
await sendToken.che ck_pa ge Is Loaded ()
await sendToken.fillRecipient(recipientAddress)
await sendToken.goToNextScreen()


}
