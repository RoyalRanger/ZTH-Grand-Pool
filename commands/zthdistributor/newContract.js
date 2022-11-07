const inquirer = require("inquirer");
const {Amount, ChainValue} = require("@signumjs/util");
const {confirmTransaction} = require("../../confirmTransaction");
const {ZthDistributorContractContext} = require("./contractContext");
const {provideLedger} = require("../../provideLedger");

async function newContract({host, isTestnet}) {
  const ledger = provideLedger(host);
  const {name, description, zthPayoutAmount, payoutSleepBlocks, relevantTokenId} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the contract',
        default: 'ZthDistributor',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the contract',
        default: 'The ZthDistributor Contract',
      },
      {
        type: 'input',
        name: 'zthPayoutAmount',
        message: 'ZTH Payout per Cycle',
        default: '100',
      },
      {
        type: 'input',
        name: 'payoutSleepBlocks',
        message: 'Payout Period in Blocks (4 Minutes per Block)',
        default: '60',
      },
      {
        type: 'input',
        name: 'relevantTokenId',
        message: 'Token Id',
        default: '',
      }
    ])

  console.info('Validating relevant token...')
  const token = await ledger.asset.getAsset({assetId: relevantTokenId})

  const {thresholdAmount} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'thresholdAmount',
        message: `Minimum Token Amount (${token.name}) for distribution`,
        default: '1',
      }
    ])

  const data = [
    0, 0, 0, 0, 0, // skip internal registers
    ChainValue.create(1).setCompound(zthPayoutAmount).getAtomic(),
    payoutSleepBlocks,
    relevantTokenId,
    ChainValue.create(token.decimals).setCompound(thresholdAmount).getAtomic()
  ]

  const keys = await confirmTransaction()
  const {fullHash, transaction} = await ledger.contract.publishContractByReference({
    name,
    description,
    referencedTransactionHash: isTestnet ? ZthDistributorContractContext.ReferenceHash.Testnet : ZthDistributorContractContext.ReferenceHash.Mainnet,
    data,
    activationAmountPlanck: Amount.fromSigna(ZthDistributorContractContext.ActivationFee),
    feePlanck: Amount.fromSigna(0.3).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
  })

  const chargeAmount = Amount.fromSigna(5);
  console.info(`Contract successfully deployed - Tx Id:  ${transaction}`)
  console.info(`Charging contract with ${chargeAmount.getSigna()} SIGNA and initialize it...`)
  return ledger.transaction.sendAmountToSingleRecipient({
    feePlanck: Amount.fromSigna(0.01).getPlanck(),
    recipientId: transaction,
    amountPlanck: chargeAmount.getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
    referencedTransactionFullHash: fullHash,
  })
}


module.exports = {
  newContract
}
