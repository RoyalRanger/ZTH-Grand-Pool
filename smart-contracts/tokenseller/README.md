# Token Seller Contract

This contract allows to buy an arbitrary token for an arbitrary amount of SIGNA.
The paid SIGNA will be sent to another address (or contract). The amount in percentage 
to be sent can be defined. The difference (minus activation costs) is being transferred to the contract creator
Only integral Token amounts are sent. Eventually, overpaid SIGNA will be reimbursed to buyer.

All variables __have to be set on the contract's creation__, which are:

| Variable         | Value Type | Description                                                                         |
|------------------|------------|-------------------------------------------------------------------------------------|
| sellTokenId      | Token ID   | The ID of the token that is being sold by the contract                              |
| sellTokenPrice   | Planck     | The price of the token in Planck, i.e. 100 SIGNA = 10000000000 Planck               |
| payoutAccountId  | Account ID | The account that will receive the SIGNA from a sale                                 |
| payoutPercentage | Percentage | The percentage (0 - 100) of the SIGNA sale, that shall be sent to `payoutAccountId` |


To create an instance of the contract use the `createTokenSellerContract` script, or use the CLI command 
