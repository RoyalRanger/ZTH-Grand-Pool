# ZTH Distributor Contract

This contract __periodically__ distributes ZTH tokens to holders of an arbitrary token.

All variables __have to be set on the contract's creation__, which are:

| Variable          | Value Type     | Description                                                                                            |
|-------------------|----------------|--------------------------------------------------------------------------------------------------------|
| zthPayoutAmount   | Token Quantity | The quantity of ZTH token to be distributed. Mind that ZTH has 1 decimal, i.e. 100 ZTH = 1000 Quantity |
| payoutSleepBlocks | Integer        | The amount of blocks the contract sleeps until payout (and further processing) is triggered.           |
| relevantTokenId   | Token ID       | The token ID of the token that targeted holders must hold                                              |
| thresholdQuantity | Token Quantity | The minimum quantity of `relevantTokenId` to be considered on distribution.                            |

> To create an instance of the contract use the `createZthDistributorContract` script, or use the CLI command

## Commands

The following commands are available, but can be only executed by the Creator:

| Command                 | String | HexCode          | Argument         | Description                                                                                                           |
|-------------------------|--------|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------|
| Deactivate              | die    | 6469650000000000 | N/A              | Deactivates contract. All Balances are sent to creator. Subsequent transfers are reimbursed to senders.               |
| Change Payout Period    | chp    | 6368700000000000 | Number of blocks | Changes the sleep period for payout. Mind that current sleep period needs to fulfilled until the change takes effect. |
| Change Payout Amount    | cha    | 6368610000000000 | ZTH Quantity     | Changes the payout quantity of ZTH Token. Mind the decimals, i.e. 100 ZTH = 1000 Quantity                             |
| Change Payout Threshold | cht    | 6368740000000000 | Token Quantity   | Changes the minimum quantity of `relevantTokenId` to be considered on distribution.                                   |


It's recommended to use the CLI tool to interact with the contract.
