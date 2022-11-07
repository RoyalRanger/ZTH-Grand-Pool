const inquirer = require("inquirer");
const {deactivate} = require("../common/deactivate");
const {viewStatus} = require("./viewStatus");
const {ZthPayerContractContext} = require("./contractContext");
const {changeThresholdSigna} = require("./changeThresholdSigna");
const {changeThresholdZTH} = require("./changeThresholdZTH");

function start({isTestnet}) {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'contractId',
        message: 'Please enter the contract Id',
        default: isTestnet ? ZthPayerContractContext.ContractId.Testnet : ZthPayerContractContext.ContractId.Mainnet
      },
      {
        type: 'list',
        name: 'command',
        choices: ['viewStatus', 'changeThresholdSigna', 'changeThresholdZTH', 'deactivate'],
        message: 'Choose your command',
        default: 'viewStatus',
      },
    ])
}

async function run({host, isTestnet}) {
  const {contractId, command} = await start({isTestnet})
  const activationFee =  ZthPayerContractContext.ActivationFee
  const args = {
    contractId,
    host,
    activationFee,
    isTestnet
  }
  switch (command) {
    case 'changeThresholdSigna':
    return changeThresholdSigna(args)
    case 'changeThresholdZTH':
    return changeThresholdZTH(args)
    case 'deactivate':
      return deactivate(args)
    case 'viewStatus':
    default:
      return viewStatus(args)
  }
}

module.exports = {
  runZthPayer: run
}
