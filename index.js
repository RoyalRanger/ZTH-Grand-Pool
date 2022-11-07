const inquirer = require("inquirer");
const {handleError} = require("./handleError");
const {runTokenSeller} = require("./commands/tokenseller");
const {runZthDistributor} = require("./commands/zthdistributor");
const {runZthPayer} = require("./commands/zthpayer");


function start() {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'contractType',
        choices: ['TokenSeller', 'ZTH Distributor', "ZTH Payer"],
        message: 'Choose the contract type you would like to interact with',
        default: 'TokenSeller',
      },
      {
        type: 'list',
        name: 'network',
        choices: ['TestNet', 'MainNet'],
        message: 'Choose the network',
        default: 'TestNet',
      }
    ])
}

(async () => {
  try {
    const {network, contractType} = await start()
    const isTestnet = network === 'TestNet'
    const host = isTestnet ? 'https://europe3.testnet.signum.network' : 'https://europe.signum.network'

    let tx;
    switch(contractType) {
      case 'TokenSeller':
        tx = await runTokenSeller({host, isTestnet})
        break;
      case 'ZTH Distributor':
        tx = await runZthDistributor({host, isTestnet})
        break;
      case 'ZTH Payer':
        tx = await runZthPayer({host, isTestnet})
        break;
    }

    if(tx){
      console.info(`Command successfully executed - Tx: ${tx.transaction}`)
    }

  } catch (e) {
    handleError(e)
  }
})()
