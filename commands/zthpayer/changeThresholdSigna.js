const {provideLedger} = require("../../provideLedger");
const {confirmTransaction} = require("../../confirmTransaction");
const {Amount} = require("@signumjs/util");
const inquirer = require("inquirer");
const {convertMethodCommand} = require("../common/convertMethodCommand");
const {ZthPayerContractContext} = require("./contractContext");
const {ZthPayerContractDataView} = require("./zthPayerContractDataView");
const {fetchContractData} = require("../common/fetchContractData");

async function changeThresholdSigna({host, contractId, activationFee, isTestnet}){

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
        message: `Enter new Threshold (in Signa) - Current: ${view.thresholdSigna}`,
        default: '100',
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
    methodArgs: [Amount.fromSigna(amount).getPlanck()]
  })
}

module.exports = {
  changeThresholdSigna
}
