# zth
ZTH related distribution automation

This eco system supports three contracts:

1. [Token Selling Contract](./commands/tokenseller/README.md): Allows users to buy arbitrary tokens via the contract
2. [ZTH Distribution Contract](./commands/zthdistributor/README.md): Periodically distributes ZTH Token to holders of the arbitrary token from _Token Selling Contract_
3. [ZTH Payer Contract](./commands/zthpayer/README.md): Pays SIGNA to ZTH Token Holders.

## Run

> Requires NodeJS 16+ installed

Before running for the first time run: `npm i` (to install all needed dependencies)

Just run `npm start` and follow the instructions
