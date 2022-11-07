# ZTH Payer Contract

This contract distributes SIGNA to ZTH token holders.

| Variable          | Value Type     | Description                                                                                             |
|-------------------|----------------|---------------------------------------------------------------------------------------------------------|
| thresholdQuantity | Token Quantity | The minimum quantity of ZTH token needed to be eligible for distribution                                |
| thresholdSigna    | Planck         | The minimum amount of planck of `relevantTokenId` that needs to be obtained until distribution happens. |

## Commands

The following commands are available, but can be only executed by the Creator:

| Command                | String | HexCode          | Argument | Description                                                                                             |
|------------------------|--------|------------------|----------|---------------------------------------------------------------------------------------------------------|
| Deactivate             | die    | 6469650000000000 | N/A      | Deactivates contract. All Balances are sent to creator. Subsequent transfers are reimbursed to senders. |
| Change SIGNA Threshold | cthsig | 6374687369670000 | Planck   | Changes the amount that needs to be accumulated before distribution happens.                            |
| Change ZTH Threshold   | cthzth | 6374687a74680000 | Quantity | Changes the quantity for token holders to be eligible                                                   |


It's recommended to use the CLI tool to interact with the contract.
