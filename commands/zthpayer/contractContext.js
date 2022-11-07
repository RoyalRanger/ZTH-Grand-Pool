const ZthPayerContractContext = {
  ActivationFee: 0.2,
  MachineCodeHash:  {
    Testnet: '13713650383565369388',
    Mainnet: '1967467256179933783'
  },
  ContractId: {
    Testnet: '538790704788725570',
    Mainnet: '2346890478463582646',
  },
  ReferenceHash: {
    Testnet: '42df36974a2b7a0792921036f9c6c2611a71c3b627df59c004b1ef1c751d38c2',
    Mainnet: 'd7ad5fded703125f7312c3a043a888db53713702451d37d8a7ac151cb2e44d3d'
  },
  MethodNames: {
    Deactivate: 'die',
    ChangeSignaThreshold: 'cthsig',
    ChangeZTHThreshold: 'cthzth',
  },
  DataIndizes: {
    ThresholdSigna: 4,
    ThresholdZTH: 5,
    IsAlive: 6
  }
}

module.exports = {
  ZthPayerContractContext
}
