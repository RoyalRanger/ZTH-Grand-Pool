const {provideLedger} = require("../../provideLedger");
const {ZthDistributorContractDataView} = require("./zthDistributorContractDataView");
const {fetchContractData} = require("../common/fetchContractData");
const {ZthDistributorContractContext} = require("./contractContext");
const {ChainValue} = require("@signumjs/util");

async function viewStatus({contractId, host, isTestnet}) {
  const view = await fetchContractData({
    host,
    isTestnet,
    contractId,
    contractContext: ZthDistributorContractContext,
    dataviewType: ZthDistributorContractDataView
  })

  const ledger = provideLedger(host)
  let token = {name: 'N/A', asset: '0', decimals: 0}
  if (view.tokenId === '0') {
    console.warn('Contract does not seem to be initialized!')
  } else {
    token = await ledger.asset.getAsset({assetId: view.tokenId})
  }
  const data = {
    'Balance': view.signaBalance + ' SIGNA',
    'Active': view.isActive,
    'Token': `${token.name} (Id: ${token.asset})`,
    'Payout threshold ': ChainValue.create(token.decimals).setAtomic(view.payoutThresholdQuantity).getCompound() + ` ${token.name}`,
    'Payout Amount': view.payoutZTH + ' ZTH',
    'Payout Period': `approx. ${((view.periodInBlocks * 4)/60)} hours - ${view.periodInBlocks} Blocks`
  }
  console.table(data)
}

module.exports = {
  viewStatus
}
