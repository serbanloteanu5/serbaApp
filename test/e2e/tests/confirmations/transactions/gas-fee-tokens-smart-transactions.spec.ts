import { Suite } from 'mocha';
import { MockttpServer } from 'mockttp';
import { Anvil } from '@viem/anvil';
import { CHAIN_IDS } from '@serbaapp/transaction-controller';
import { Driver } from '../../../webdriver/driver';
import FixtureBuilder from '../../../fixture-builder';
import { WINDOW_TITLES, unlockWallet, withFixtures } from '../../../helpers';
import { createDappTransaction } from '../../../page-objects/flows/transaction';
import TransactionConfirmation from '../../../page-objects/pages/confirmations/redesign/transaction-confirmation';
import GasFeeTokenModal from '../../../page-objects/pages/confirmations/redesign/gas-fee-token-modal';
import { mockSmartTransactionBatchRequests } from '../../smart-transactions/mocks';
import ActivityListPage from '../../../page-objects/pages/home/activity-list';
import HomePage from '../../../page-objects/pages/home/homepage';
import { TX_SENTINEL_URL } from '../../../../../shared/constants/transaction';

const TRANSACTION_HASH = '0xf25183af3bf64af01e9210201a2ede3c1dcd6d16091283152d13265242939fc4',
  TRANSACTION_HASH_2 = '0x62700f83ba1bbc29004bf7aef71ed0ea735de4fd59861b4235200d8fa028281f';

describe('Gas Fee Tokens - Smart Transactions', function (this: Suite) {
  const baseFixtures = {
    dapp: true,
    fixtures: new FixtureBuilder({ inputChainId: CHAIN_IDS.MAINNET })
      .withPermissionControllerConnectedToTestDapp()
      .withNetworkControllerOnMainnet()
      .build(),
    localNodeOptions: {
      hardfork: 'london',
    },
  };

  it('confirms two transactions if successful', async function () {
    await withFixtures(
      {
        ...baseFixtures,
        testSpecificMock(mockServer: MockttpServer) {
          mockSimulationResponse(mockServer);
          mockSmartTransactionBatchRequests(mockServer, {
            transactionHashes: [TRANSACTION_HASH, TRANSACTION_HASH_2],
          });
        },
        title: this.test?.fullTitle(),
      },
      async ({ driver }: { driver: Driver; localNodes: Anvil }) => {
        await unlockWallet(driver);
        await createDappTransaction(driver);
        await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);

        const transactionConfirmation = new TransactionConfirmation(driver);
        await transactionConfirmation.clickAdvancedDetailsButton();
        await transactionConfirmation.clickGasFeeTokenPill();

        const gasFeeTokenModal = new GasFeeTokenModal(driver);

        for (const token of [
          ['DAI', '$3.21', '3.21 DAI', '$10.00'],
          ['USDC', '$1.23', '1.23 USDC', '$5.00'],
        ]) {
          const [symbol, fiatAmount, tokenAmount, balance] = token;
          await gasFeeTokenModal.check_AmountFiat(symbol, fiatAmount);
          await gasFeeTokenModal.check_AmountToken(symbol, tokenAmount);
          await gasFeeTokenModal.check_Balance(symbol, balance);
        }

        await gasFeeTokenModal.clickToken('USDC');

        await Promise.all([
          transactionConfirmation.check_gasFeeSymbol('USDC'),
          transactionConfirmation.check_gasFeeFiat('$1.23'),
          transactionConfirmation.check_gasFee('1.23'),
          transactionConfirmation.check_gasFeeTokenFee('$0.43'),
        ]);
        
		await transactionConfirmation.clickFooterConfirmButton();
		
		await driver.switchToWindowWithTitle(WINDOW_TITLES.ExtensionInFullScreenView);

		const homepage = new HomePage(driver);
		await homepage.goToActivityList();

		const activityListPage = new ActivityListPage(driver);
		await activityListPage.check_confirmedTxNumberDisplayedInActivity(2);		
	  }
    );
  });

  it('fails two transactions if error', async function () {
    await withFixtures(
      {
	    ...baseFixtures,
	    testSpecificMock(mockServer) {
		  mockSimulationResponse(mockServer); 
		  mockSmartTransactionBatchRequests(mockServer,{
		   	transactionHashes:[TRANSACTION_HASH,TRANSACTION_HASH_2],
			error:true,
		  });
	    },
	    title:this.test?.fullTitle(),
	  }, 
	  async({driver}:{driver:Driver;localNodes : Anvil})=>{
	    await unlockWallet(driver); 
	   	await createDappTransaction(driver);	
	   	await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);

  		const txConfirm=new TransactionConfirmation(driver); 
  		await txConfirm.clickGasFeeTokenPill();

  		const feeModal=new GasFeeTokenModal(driver); 
  		await feeModal.clickToken("USDC");

  		await txConfirm.check_gasFeeSymbol("USDC");
  		await txConfirm.clickFooterConfirmButton();

   		await driver.switchToWindowWithTitle(WINDOW_TITLES.ExtensionInFullScreenView);

   		const home=new HomePage(driver); 
   		await home.goToActivityList();

   		const activity=new ActivityListPage(driver);  
   		await activity.check_failedTxNumberDisplayedInActivity(2);

	  }
   );
 });

});

async function mockSimulationResponse(mockServer : MockttpServer) {

 return [await mockServer.forPost(TX_SENTINEL_URL).thenCallback(() => ({
	ok:true,statusCode :200,json:{jsonrpc:'2.0',
	result:{
	  transactions:[
	  	{
	  	return:"0x000000000000000000000000000000000000000000000...",status:"0x1",gasUsed:"0x5de2",
	  	gasLimit:"0x5f34",fees:[
	  		{
		  	maxFeePerGas:"0xf19b9f48d",maxPriorityFeePerGas:"0x9febc9",
		  	balanceNeeded :"0x59d9d3b865ed8",currentBalance :"0x77f9fd8d99e7e...",
		  	error:"",
		  	tokenFees:[
			  	{token:{address:'0x123456789...',decimals :6,symbol :'USDC'},
				balanceNeededToken :'0x12C4B...',
				currentBalance Token :'...40',
				feeRecipient:'...',rateWei:'...'},
			  	
			  	{token:{address:'...',decimals :3,symbol :'DAI'},balanceNeeded Token :'...',currentBalance Token :'...',
			    feeRecipient:'...',rateWei:'...'}]
	  	 }]
	  	 ,stateDiff:{} ,feeEstimate :972988071597550 ,base FeePerGas :40482817574}]
	   ,block Number :'...' ,id:'faaab4c5-edf5-4077-ac75-8d26278ca2c5'}
   }}))];
}
