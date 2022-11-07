# zth
ZTH related distribution automation

This eco system supports three contracts:

1. [Token Selling Contract](./commands/tokenseller/README.md): Allows users to buy VGB tokens through a contract
2. [ZTH Distribution Contract](./commands/zthdistributor/README.md): Periodically distributes ZTH Token to holders of the VGB token from _Token Selling Contract_
3. [ZTH Payer Contract](./commands/zthpayer/README.md): Pays SIGNA to ZTH Token Holders.

Автоматизированная система добычи токенов ZTH

Данная экосистема построенна на трёх смарт-контрактах:

1. [Token Selling Contract](./commands/tokenseller/README.md): Позволяет пользователям покупать произвольные токены через контракт
2. [ZTH Distribution Contract](./commands/zthdistributor/README.md): Периодически распределяет токены ZTH среди владельцев токена VGB из Контракта на продажу токенов
3. [ZTH Payer Contract](./commands/zthpayer/README.md): Выплачивает SIGNA держателям токенов ZTH.

## Run

> Requires NodeJS 16+ installed

Before running for the first time run: `npm i` (to install all needed dependencies)

Just run `npm start` and follow the instructions
