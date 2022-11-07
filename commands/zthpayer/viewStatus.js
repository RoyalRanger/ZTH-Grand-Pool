const {ZthPayerContractDataView} = require("./zthPayerContractDataView");
const {fetchContractData} = require("../common/fetchContractData");
const {ZthPayerContractContext} = require("./contractContext");

async function viewStatus({contractId, host, isTestnet}) {
  const view = await fetchContractData({
    host,
    isTestnet,
    contractId,
    contractContext: ZthPayerContractContext,
    dataviewType: ZthPayerContractDataView,
  })

  const data = {
    'Balance': view.signaBalance + ' SIGNA',
    'Active': view.isActive,
    'Payout at': view.thresholdSigna + ' SIGNA',
    'Distribution Minimum': view.thresholdZTH + ' ZTH'
  }
  console.table(data)
}

module.exports = {
  viewStatus
}
