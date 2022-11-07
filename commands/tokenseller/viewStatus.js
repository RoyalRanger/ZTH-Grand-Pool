const {TokenSellerContractDataView} = require("./tokenSellerContractDataView");
const {provideLedger} = require("../../provideLedger");
const {Address} = require("@signumjs/core");
const {fetchContractData} = require("../common/fetchContractData");
const {TokenSellerContractContext} = require("./contractContext");
const {ChainValue} = require("@signumjs/util");

async function viewStatus({contractId, host, isTestnet}) {
  const ledger = provideLedger(host)
  const view  = await fetchContractData({
    host,
    isTestnet,
    contractId,
    dataviewType: TokenSellerContractDataView,
    contractContext: TokenSellerContractContext
  })

  let token = {name: 'N/A', asset: '0'}
  if (view.tokenId === '0') {
    console.warn('Contract does not seem to be initialized....')
  } else {
    token = await ledger.asset.getAsset({assetId: view.tokenId})
  }
  const data = {
    'Balance': view.signaBalance + ' SIGNA',
    'Active': view.isActive,
    'Token': `${token.name} (Id: ${token.asset})`,
    'Token Minted': `${ChainValue.create(token.decimals).setAtomic(token.quantityCirculatingQNT).getCompound()} ${token.name}`,
    'Token Price': view.tokenPrice + ' SIGNA',
    'Payout Account': `${Address.fromNumericId(view.payoutAccountId).getReedSolomonAddress(false)} - ${view.payoutAccountId}`,
    'Payout Percentage': view.payoutPercentage + '%',
  }
  console.table(data)
}

module.exports = {
  viewStatus
}
