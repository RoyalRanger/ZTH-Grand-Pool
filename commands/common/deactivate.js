const {Amount} = require("@signumjs/util");
const {provideLedger} = require("../../provideLedger");
const {confirmTransaction} = require("../../confirmTransaction");
const {convertMethodCommand} = require("./convertMethodCommand");

async function deactivate({contractId, host, activationFee}) {
  const ledger = provideLedger(host)
  const keys = await confirmTransaction()
  return ledger.contract.callContractMethod({
    feePlanck: Amount.fromSigna(0.01).getPlanck(),
    amountPlanck: Amount.fromSigna(activationFee).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
    contractId: contractId,
    methodHash: convertMethodCommand('die'),
  })
}

module.exports = {
  deactivate
}
