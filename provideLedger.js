const {LedgerClientFactory} = require("@signumjs/core");


let ledger = null

function provideLedger(nodeHost){

    if(!ledger || ledger.service.settings.nodeHost !== nodeHost){
        console.info('-------------------------------------------');
        console.info(`The selected Signum Node is: ${nodeHost}`);
        console.info('-------------------------------------------');
        ledger = LedgerClientFactory.createClient({
            nodeHost
        });
    }

    return ledger
}

module.exports = {
    provideLedger
}
