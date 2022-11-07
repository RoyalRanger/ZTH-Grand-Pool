const inquirer = require("inquirer");
const {confirmTransaction} = require("../../confirmTransaction");
const {Amount, ChainValue} = require("@signumjs/util");
const {convertMethodCommand} = require("../common/convertMethodCommand");
const {ZthPayerContractContext} = require("./contractContext");
const {fetchContractData} = require("../common/fetchContractData");
const {ZthPayerContractDataView} = require("./zthPayerContractDataView");

async function changeThresholdZTH({host, contractId, activationFee, isTestnet}){
  const view = await fetchContractData({
    host,
    isTestnet,
    contractId,
    contractContext: ZthPayerContractContext,
    dataviewType: ZthPayerContractDataView,
  })

  const {amount} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'amount',
        message: `Enter new Threshold (in ZTH) - Current: ${view.thresholdZTH}`,
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
    methodHash: convertMethodCommand(ZthPayerContractContext.MethodNames.ChangeZTHThreshold),
    methodArgs: [ChainValue.create(1).setCompound(amount).getAtomic()]
  })
}



module.exports = {
  changeThresholdZTH
}
