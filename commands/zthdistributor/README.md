# ZTH Distributor 

Periodically distributes ZTH Token to holders of the arbitrary token from _Token Selling Contract_


Basic information:


TEST NET:

Token Id: [9866069454022597581](https://chain.signum.network/tx/9866069454022597581) (TESTZEE)
Issuance Tx Full Hash: CD5B5950E551EB8868EEACE8E9CB3CA401F4B0FDF4568D3A70E0093E5394852F (needed for treasury account setting)


MAIN NET:
Token Id: [9518219425200752102](https://chain.signum.network/tx/9518219425200752102) (ZTH)
Issuance Tx Full Hash: E6455035238217841D8392A2D0C160FE0765473D4E3ED1B85D099466D55D8B43 (needed for treasury account setting)


Check contract also using the inspector: https://signum-contracts-inspector.vercel.app/


# Smart Contract

Logic: Each _n_ blocks pays _x_ ZTH to holders of token _y_


## Creating the contract

This contract can be deployed using the `new` command from the command line tool (just hit enter when asked for contract Id and select `new`)

Follow the instructions then. Your creator account needs at least `5.25 SIGNA` as a balance.

## Additional contract methods

### Deactivate Account

Disables the contract and pays out remaining balance to all token holders proportionally.
After contract is disabled no payouts are possible anymore, and all sent amount to the contract is being returned (minus activation/execution costs) to the sender.

Permission: Creator Only
Command: 'die'


### Change Payout Amount

Changes the amount of ZTH distributed each payout cycle (Default: 100 ZTH)

Permission: Creator Only
Command: 'cha'
Argument: Minimum Value in ZTH Quantity (has 1 decimal) 

> Sending arguments needs to be done in hex converted values...use the toolbox to do that

### Change Payout Period

Changes the payout period

Permission: Creator Only
Command: 'chp'
Argument: The number of blocks to wait between payouts (each block is in average 240 seconds)

> Sending arguments needs to be done in hex converted values...use the toolbox to do that

### Change Distribution Threshold

Changes the amount of _y_ token needed as minimum to be eligible for ZTH payouts

Permission: Creator Only
Command: 'cht'
Argument: Minimum Value in the _y_ tokens quantity 

> Sending arguments needs to be done in hex converted values...use the toolbox to do that
