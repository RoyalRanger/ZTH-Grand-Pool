// This is just an internal to generate method calls.

const {convertMethodCommand} = require("../../commands/convertMethodCommand")
const {generateMethodCall} = require("@signumjs/contracts")

console.log('zthPayer: Change Signa Threshold', generateMethodCall({
  methodHash: convertMethodCommand('cthsig'),
  methodArgs: [100_0000_0000]
}))

console.log('zthPayer: Change ZTH Threshold', generateMethodCall({
  methodHash: convertMethodCommand('cthzth'),
  methodArgs: [1_0]
}))

console.log('TokenSeller: Change Token Price', generateMethodCall({
  methodHash: convertMethodCommand('ctp'),
  methodArgs: [100_0000_0000]
}))

console.log('ZTHDistributor: Change Payout Period', generateMethodCall({
  methodHash: convertMethodCommand('chp'),
  methodArgs: [4]
}))

console.log('ZTHDistributor: Change Payout Amount', generateMethodCall({
  methodHash: convertMethodCommand('cha'),
  methodArgs: [50_0] // one decimal
}))

console.log('ZTHDistributor: Change Threshold Amount', generateMethodCall({
  methodHash: convertMethodCommand('cht'),
  methodArgs: [4_0] // one decimal
}))


console.log('Deactivate:', generateMethodCall({
  methodHash: convertMethodCommand('die'),
}))
