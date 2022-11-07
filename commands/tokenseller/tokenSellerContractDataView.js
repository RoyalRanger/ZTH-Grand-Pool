const {TokenSellerContractContext} = require("./contractContext");
const {Amount} = require("@signumjs/util");
const {ContractDataView} = require("@signumjs/contracts");

class TokenSellerContractDataView {
  #contract
  #view
  constructor(contract) {
    this.#contract = contract;
    this.#view = new ContractDataView(contract)
  }

  get isActive() {
    return parseInt(this.#view.getVariableAsDecimal(TokenSellerContractContext.DataIndizes.IsAlive)) === 1
  }

  get tokenId() {
    return this.#view.getVariableAsDecimal(TokenSellerContractContext.DataIndizes.SellTokenId)
  }

  get tokenPrice() {
    return Amount.fromPlanck(this.#view.getVariableAsDecimal(TokenSellerContractContext.DataIndizes.SellTokenPrice)).getSigna()
  }

  get payoutAccountId() {
    return this.#view.getVariableAsDecimal(TokenSellerContractContext.DataIndizes.PayoutAccountId)
  }

  get payoutPercentage() {
    return this.#view.getVariableAsDecimal(TokenSellerContractContext.DataIndizes.PayoutPercentage)
  }

  get signaBalance() {
    return Amount.fromPlanck(this.#contract.balanceNQT).getSigna();
  }

}


module.exports = {
  TokenSellerContractDataView
}
