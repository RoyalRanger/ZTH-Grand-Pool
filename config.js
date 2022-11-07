const {Amount} = require("@signumjs/util");

const TestnetConfig = {
  TokenId: '9866069454022597581',
  TokenIssuanceHash: 'CD5B5950E551EB8868EEACE8E9CB3CA401F4B0FDF4568D3A70E0093E5394852F',
  ContractId: '538790704788725570',
  ActivationFee: 0.2,
  NodeHost: 'https://europe3.testnet.signum.network'
}

const MainnetConfig = {
  TokenId: '9518219425200752102',
  TokenIssuanceHash: 'E6455035238217841D8392A2D0C160FE0765473D4E3ED1B85D099466D55D8B43',
  ContractId: '6850542208867610071',
  ActivationFee: 0.2,
  NodeHost: 'https://europe.signum.network'
}

module.exports = {
  provideConfig: (isMainNet) => isMainNet ? MainnetConfig : TestnetConfig
}
