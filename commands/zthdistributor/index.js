const inquirer = require("inquirer");
const {deactivate} = require("../common/deactivate");
const {viewStatus} = require("./viewStatus");
const {ZthDistributorContractContext} = require("./contractContext");
const {newContract} = require("./newContract");
const {changeThreshold} = require("./changeThreshold");
const {changePeriod} = require("./changePeriod");
const {changeAmount} = require("./changeAmount");

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
        choices: ['viewStatus', 'changePeriod', 'changeAmount', 'changeThreshold', 'deactivate', 'new'],
        message: 'Choose your command',
        default: 'viewStatus',
      },
    ])
}

async function run({host, isTestnet}) {
  const {contractId, command} = await start()
  const activationFee =  ZthDistributorContractContext.ActivationFee
  const args = {
    contractId,
    host,
    activationFee,
    isTestnet
  }
  switch (command) {
    case 'changePeriod':
      return changePeriod(args)
    case 'changeAmount':
      return changeAmount(args)
    case 'changeThreshold':
      return changeThreshold(args)
    case 'new':
      return newContract(args)
    case 'deactivate':
      return deactivate(args)
    case 'viewStatus':
    default:
      return viewStatus(args)
  }
}

module.exports = {
  runZthDistributor: run
}
