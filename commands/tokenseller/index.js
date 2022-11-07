const inquirer = require("inquirer");
const {deactivate} = require("../common/deactivate");
const {viewStatus} = require("./viewStatus");
const {TokenSellerContractContext} = require("./contractContext");
const {changeTokenPrice} = require("./changeTokenPrice");
const {newContract} = require("./newContract");

function start() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'contractId',
        message: 'Please enter the contract Id',
        default: '',
      },
      {
        type: 'list',
        name: 'command',
        choices: ['viewStatus', 'changeTokenPrice', 'deactivate', 'new'],
        message: 'Choose your command',
        default: 'viewStatus',
      },
    ])
}

async function run({host, isTestnet}) {
  const {contractId, command} = await start()
  const activationFee =  TokenSellerContractContext.ActivationFee
  const args = {
    contractId,
    host,
    activationFee,
    isTestnet
  }
  switch (command) {
    case 'changeTokenPrice':
      return changeTokenPrice(args)
    case 'deactivate':
      return deactivate(args)
    case 'new':
      return newContract(args)
    case 'viewStatus':
    default:
      return viewStatus(args)
  }
}

module.exports = {
  runTokenSeller: run
}
