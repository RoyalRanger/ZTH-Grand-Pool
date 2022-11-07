const {ZthDistributorContractContext} = require("./contractContext");
const {Amount, ChainValue} = require("@signumjs/util");
const {ContractDataView} = require("@signumjs/contracts");

class ZthDistributorContractDataView {
  #contract
  #view
  constructor(contract) {
    this.#contract = contract;
    this.#view = new ContractDataView(contract)
  }

  get isActive() {
    return parseInt(this.#view.getVariableAsDecimal(ZthDistributorContractContext.DataIndizes.IsAlive)) === 1
  }

  get tokenId() {
    return this.#view.getVariableAsDecimal(ZthDistributorContractContext.DataIndizes.TargetTokenId)
  }

  get payoutZTH() {
    return ChainValue.create(1).setAtomic(this.#view.getVariableAsDecimal(ZthDistributorContractContext.DataIndizes.ZthPayoutQuantity)).getCompound()
  }

  get payoutThresholdQuantity() {
    return this.#view.getVariableAsDecimal(ZthDistributorContractContext.DataIndizes.PayoutThreshold)
  }

  get periodInBlocks() {
    return this.#view.getVariableAsDecimal(ZthDistributorContractContext.DataIndizes.ZthPayoutSleepBlocks)
  }

  get signaBalance() {
    return Amount.fromPlanck(this.#contract.balanceNQT).getSigna();
  }

}


module.exports = {
  ZthDistributorContractDataView
}
