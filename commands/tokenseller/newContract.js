const inquirer = require("inquirer");
const {Amount, convertStringToHexString, convertHexStringToDecString, convertHexEndianess} = require("@signumjs/util");
const {confirmTransaction} = require("../../confirmTransaction");
const {TokenSellerContractContext} = require("./contractContext");
const {provideLedger} = require("../../provideLedger");

async function newContract({host, isTestnet}) {
  const ledger = provideLedger(host);
  const {name, description, sellTokenName, sellTokenDecimals, sellTokenPrice, payoutAccountId, payoutPercentage} = await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the contract',
        default: 'TokenSeller',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the contract',
        default: 'The TokenSeller Contract',
      },
      {
        type: 'input',
        name: 'sellTokenName',
        message: 'Enter Selling Token Name (3 - 8 characters)',
        default: 'VGB',
        validate: (v) => v.length > 2 && v.length <= 8
      },
      {
        type: 'input',
        name: 'sellTokenDecimals',
        message: 'Enter Selling Token Decimals (0 - 6)',
        default: 0,
        validate: (v) => v >= 0 && v <= 6
      },
      {
        type: 'input',
        name: 'sellTokenPrice',
        message: 'Enter Price of Token in SIGNA',
        default: '250',
      },
      {
        type: 'input',
        name: 'payoutAccountId',
        message: 'Enter Id of beneficial account/contract',
        default: '',
      },
      {
        type: 'input',
        name: 'payoutPercentage',
        message: 'Enter benefit percentage (0-100)',
        default: '95',
        validate: (v) => {
          const f = parseFloat(v)
          if(Number.isNaN(f)){
            return false;
          }
          return f >= 0 && f <= 100
        }
      }
    ])
  const tokenName = convertHexStringToDecString(
    convertHexEndianess(convertStringToHexString(sellTokenName))
  );

  /* Current Data Layout
^program name TokenSeller
^program activationAmount 20000000
^declare r0
^declare r1
^declare r2
^declare _counterTimestamp
^declare sellTokenName
^declare sellTokenDecimals
^declare sellTokenId
^declare sellTokenPrice
^declare payoutAccountId
^declare payoutPercentage
^declare isAlive
   */
  const data = [
    0,0,0,0, // skip internal registers
    tokenName,
    sellTokenDecimals,
    Amount.fromSigna(sellTokenPrice).getPlanck(),
    payoutAccountId,
    payoutPercentage
  ]

  console.info('Validating accounts existance...')
  await ledger.account.getAccount({accountId: payoutAccountId})

  const keys = await confirmTransaction()
  const {transaction, fullHash} = await ledger.contract.publishContractByReference({
    name,
    description,
    referencedTransactionHash: isTestnet ? TokenSellerContractContext.ReferenceHash.Testnet : TokenSellerContractContext.ReferenceHash.Mainnet,
    data,
    activationAmountPlanck: Amount.fromSigna(TokenSellerContractContext.ActivationFee),
    feePlanck: Amount.fromSigna(0.3).getPlanck(),
    senderPublicKey: keys.publicKey,
    senderPrivateKey: keys.signPrivateKey,
  })

  const chargeAmount =  Amount.fromSigna(155);
  console.info(`Contract successfully deployed - Tx Id:  ${transaction}`)
  console.info(`Charging contract with ${chargeAmount.getSigna()} SIGNA and initialize it, i.e. issue token...`)
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
