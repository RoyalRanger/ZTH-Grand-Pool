const {ZthPayerContractContext} = require("./contractContext");
const {Amount, ChainValue} = require("@signumjs/util");
const {ContractDataView} = require("@signumjs/contracts");

class ZthPayerContractDataView {
  #contract
  #view
  constructor(contract) {
    this.#contract = contract;
    this.#view = new ContractDataView(contract)
  }

  get isActive() {
    return parseInt(this.#view.getVariableAsDecimal(ZthPayerContractContext.DataIndizes.IsAlive)) === 1
  }

  get thresholdSigna() {
    return Amount.fromPlanck(this.#view.getVariableAsDecimal(ZthPayerContractContext.DataIndizes.ThresholdSigna)).getSigna()
  }

  get thresholdZTH() {
    return ChainValue.create(1).setAtomic(this.#view.getVariableAsDecimal(ZthPayerContractContext.DataIndizes.ThresholdZTH)).getCompound()
  }

  get signaBalance() {
    return Amount.fromPlanck(this.#contract.balanceNQT).getSigna();
  }

}


module.exports = {
  ZthPayerContractDataView
}
