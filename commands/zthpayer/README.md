# ZTH Payer
Pays SIGNA to ZTH Token Holders

Basic information:

TEST NET:

Token Id: [9866069454022597581](https://chain.signum.network/tx/9866069454022597581) (TESTZEE)
Issuance Tx Full Hash: CD5B5950E551EB8868EEACE8E9CB3CA401F4B0FDF4568D3A70E0093E5394852F (needed for treasury account setting)


MAIN NET:
Token Id: [9518219425200752102](https://chain.signum.network/tx/9518219425200752102) (ZTH)
Issuance Tx Full Hash: E6455035238217841D8392A2D0C160FE0765473D4E3ED1B85D099466D55D8B43 (needed for treasury account setting)


Check contract also using the inspector: https://signum-contracts-inspector.vercel.app/


# Smart Contract

Logic: Proportionally, pays out to token holders of the given token once the accumulated balance is greater than 100 SIGNA


Additional methods:

### Deactivate Account

Disables the contract and pays out remaining balance to all token holders proportionally.
After contract is disabled no payouts are possible anymore, and all sent amount to the contract is being returned (minus activation/execution costs) to the sender.


Permission: Creator Only
Command: 'die'


### Change Payout Threshold

Changes the minimum value to dispatch payouts (Default: 100 SIGNA)

Permission: Creator Only
Command: 'cthsig'
Argument: Minimum Value in Planck 

> Sending arguments needs to be done in hex converted values...use the toolbox to do that

### Change ZTH Threshold

Changes the minimum quantity of ZTH Tokens necessary to get payouts.

Permission: Creator Only
Command: 'cthzth'
Argument: Minimum Quantity, i.e. 10 would be 1.0 (as ZTH has 1 decimal)

> Sending arguments needs to be done in hex converted values...use the toolbox to do that
