const {provideLedger} = require("../../provideLedger");

async function fetchContractData({host, contractId, dataviewType, contractContext, isTestnet}){
  const expectedMachineHashCode = isTestnet ? contractContext.MachineCodeHash.Testnet : contractContext.MachineCodeHash.Mainnet
  const ledger = provideLedger(host)
  console.log('Fetching contract...')
  const contract = await ledger.contract.getContract(contractId)
  if(contract.machineCodeHashId !== expectedMachineHashCode){
    throw new Error(`Wrong machine code hash - Expected: ${expectedMachineHashCode} but got ${contract.machineCodeHashId}`)
  }
  return new dataviewType(contract)
}

module.exports = {
  fetchContractData
}
