const inquirer = require("inquirer");
const {provideLedger} = require("../../provideLedger");
const {confirmTransaction} = require("../../confirmTransaction");
const {Amount, ChainValue} = require("@signumjs/util");
const {convertMethodCommand} = require("../common/convertMethodCommand");
const {ZthDistributorContractContext} = require("./contractContext");
const {ZthDistributorContractDataView} = require("./zthDistributorContractDataView");
const {fetchContractData} = require("../common/fetchContractData");

async function changeThreshold({host, contractId, activationFee, isTestnet}){
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
  console.log('Fetching token information...')
  const token = await ledger.asset.getAsset({assetId: view.tokenId})
  const currentThreshold = ChainValue.create(token.decimals).setAtomic(view.payoutThresholdQuantity).getCompound()

  const {amount} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'amount',
        message: `Enter new Threshold (in ${token.name}) - Current: ${currentThreshold} ${token.name}`,
        default: '0',
      }
    ])

  const keys = await confirmTransaction()

  return ledger.contract.callContractMethod({
    feePlanck: Amount.fromSigna(0.01).getPlanck(),
    amountPlanck: Amount.fromSigna(activationFee).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
    contractId: contractId,
    methodHash: convertMethodCommand(ZthDistributorContractContext.MethodNames.ChangeThreshold),
    methodArgs: [ChainValue.create(token.decimals).setCompound(amount).getAtomic()]
  })
}



module.exports = {
  changeThreshold
}
