const inquirer = require("inquirer");
const {Amount} = require("@signumjs/util");
const {confirmTransaction} = require("../../confirmTransaction");
const {convertMethodCommand} = require("../common/convertMethodCommand");
const {TokenSellerContractContext} = require("./contractContext");
const {TokenSellerContractDataView} = require("./tokenSellerContractDataView");
const {fetchContractData} = require("../common/fetchContractData");
const {provideLedger} = require("../../provideLedger");

async function changeTokenPrice({host, contractId, activationFee, isTestnet}) {
  const view = await fetchContractData({
    host,
    isTestnet,
    contractId,
    contractContext: TokenSellerContractContext,
    dataviewType: TokenSellerContractDataView
  })

  if (view.tokenId === '0') {
    throw new Error(`Contract does not provide any token Id - Did you initialize the contract?`)
  }

  const {amount} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'amount',
        message: `Enter new Price (in SIGNA) - Current: ${view.tokenPrice} SIGNA`,
        default: '250',
      }
    ])

  const ledger = provideLedger(host);
  const keys = await confirmTransaction()
  return ledger.contract.callContractMethod({
    feePlanck: Amount.fromSigna(0.01).getPlanck(),
    amountPlanck: Amount.fromSigna(activationFee).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
    contractId: contractId,
    methodHash: convertMethodCommand(TokenSellerContractContext.MethodNames.ChangeTokenPrice),
    methodArgs: [Amount.fromSigna(amount).getPlanck()]
  })
}


module.exports = {
  changeTokenPrice
}
