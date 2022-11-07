const ZthDistributorContractContext = {
  ActivationFee: 0.2,
  MachineCodeHash:  {
    Testnet: '6796399928284118015',
    Mainnet: '7113358627428169487'
  },
  ReferenceHash: {
    Testnet: '9f46ff50e36b821d416e7c70da191d00ed2bf1999b33f375bcc8dc1b9be5b9f5',
    Mainnet: '24ae198be1c4f914afe661d05f58aa9ce955a62ee39f0d50058698f789138541'
  },
  MethodNames: {
    Deactivate: 'die',
    ChangeThreshold: 'cht',
    ChangePeriod: 'chp',
    ChangeAmount: 'cha',
  },
  DataIndizes: {
    ZthPayoutQuantity: 5,
    ZthPayoutSleepBlocks: 6,
    TargetTokenId: 7,
    PayoutThreshold: 8,
    IsAlive: 9
  }
}


module.exports = {
  ZthDistributorContractContext
}
