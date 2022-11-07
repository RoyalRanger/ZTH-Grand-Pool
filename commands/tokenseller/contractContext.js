const TokenSellerContractContext = {
  ActivationFee: 0.33,
  MachineCodeHash: {
    Testnet: '13623170965212595266',
    Mainnet: '13623170965212595266',
  },
  ReferenceHash: {
    Testnet: '7c72bc02da57778109899ede1f405ff0fa489b9e20dfa7e1a5ffe1d5587fa5a8',
    Mainnet: '7a2512f6e84dd43eb0f5fce65767f0214f4f660b11456a747028fc6ac85ac6d6'
  },
  MethodNames: {
    Deactivate: 'die',
    ChangeTokenPrice: 'ctp'
  },
  DataIndizes: {
    SellTokenName: 4,
    SellTokenDecimals: 5,
    SellTokenPrice: 6,
    PayoutAccountId: 7,
    PayoutPercentage: 8,
    SellTokenId: 9,
    IsAlive: 10
  }
}


module.exports = {
  TokenSellerContractContext
}
