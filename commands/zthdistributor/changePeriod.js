const inquirer = require("inquirer");
const {provideLedger} = require("../../provideLedger");
const {confirmTransaction} = require("../../confirmTransaction");
const {Amount, ChainValue} = require("@signumjs/util");
const {convertMethodCommand} = require("../common/convertMethodCommand");
const {ZthDistributorContractContext} = require("./contractContext");
const {ZthDistributorContractDataView} = require("./zthDistributorContractDataView");
const {fetchContractData} = require("../common/fetchContractData");

async function changePeriod({host, contractId, activationFee, isTestnet}){
  const view = await fetchContractData({
    host,
    isTestnet,
    contractId, 
    contractContext: ZthDistributorContractContext,
    dataviewType: ZthDistributorContractDataView
  })
  if(view.tokenId === '0'){
    throw new Error(`Contract does not provide any token Id - Did you initialize the contract?`)
  }

  const ledger = provideLedger(host);

  const {blocks} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'blocks',
        message: `Enter number of blocks to wait until next payout - Current: ${view.periodInBlocks}`,
        default: '60',
      }
    ])

  const keys = await confirmTransaction()

  return ledger.contract.callContractMethod({
    feePlanck: Amount.fromSigna(0.01).getPlanck(),
    amountPlanck: Amount.fromSigna(activationFee).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
    contractId: contractId,
    methodHash: convertMethodCommand(ZthDistributorContractContext.MethodNames.ChangePeriod),
    methodArgs: [blocks]
  })
}



module.exports = {
  changePeriod
}
