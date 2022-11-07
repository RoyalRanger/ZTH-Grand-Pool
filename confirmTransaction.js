const inquirer = require("inquirer");
const {generateMasterKeys} = require('@signumjs/crypto')

async function confirmTransaction() {

    const response = await inquirer.prompt([{
        type: 'password',
        name: 'passphrase',
        message: 'Please enter your passphrase and confirm the transaction (Hit Enter to Abort)',
        default: null
    }])

    if(!response.passphrase){
        console.info('Aborted by user')
        process.exit(-1)
        return null
    }

    return generateMasterKeys(response.passphrase)
}

module.exports = {
    confirmTransaction
}
