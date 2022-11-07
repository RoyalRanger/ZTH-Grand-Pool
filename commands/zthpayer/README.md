# ZTH Payer
Pays SIGNA to ZTH Token Holders
Выплачивает SIGNA держателям токенов ZTH

Basic information:
Базовая информация:

TEST NET:

Token Id: [9866069454022597581](https://chain.signum.network/tx/9866069454022597581) (TESTZEE)
Issuance Tx Full Hash: CD5B5950E551EB8868EEACE8E9CB3CA401F4B0FDF4568D3A70E0093E5394852F (needed for treasury account setting)


MAIN NET:
Token Id: [9518219425200752102](https://chain.signum.network/tx/9518219425200752102) (ZTH)
Issuance Tx Full Hash: E6455035238217841D8392A2D0C160FE0765473D4E3ED1B85D099466D55D8B43 (needed for treasury account setting)



# Smart Contract

Logic: Proportionally, pays out to token holders of the given token once the accumulated balance is greater than 100 SIGNA

Логика: Пропорционально выплачивает SIGNA держателям токенов ZTH, как только накопленный баланс превышает 100 SIGNA


Additional methods:
Дополнительные методы:

### Deactivate Account (Деактивировать учетную запись)

Disables the contract and pays out remaining balance to all token holders proportionally.
After contract is disabled no payouts are possible anymore, and all sent amount to the contract is being returned (minus activation/execution costs) to the sender.

Отключает контракт и пропорционально выплачивает оставшийся баланс всем держателям токенов.
После отключения контракта выплаты больше невозможны, и вся отправленная сумма по контракту возвращается отправителю (за вычетом затрат на активацию/исполнение).


Permission: Creator Only
Command: 'die'


### Change Payout Threshold (Изменить порог выплаты)

Changes the minimum value to dispatch payouts (Default: 100 SIGNA)

Изменяет минимальное значение для отправки выплат (по умолчанию: 100 SIGNA)

Permission: Creator Only
Command: 'cthsig'
Argument: Minimum Value in Planck 

> Sending arguments needs to be done in hex converted values...use the toolbox to do that
> Отправка аргументов должна выполняться в шестнадцатеричных преобразованных значениях...используйте для этого toolbox

### Change ZTH Threshold (Выбор минимального значения владения ZTH)

Changes the minimum quantity of ZTH Tokens necessary to get payouts.

Изменяет минимальное количество токенов ZTH, необходимое для получения выплат.

Permission: Creator Only
Command: 'cthzth'
Argument: Minimum Quantity, i.e. 10 would be 1.0 (as ZTH has 1 decimal)

> Sending arguments needs to be done in hex converted values...use the toolbox to do that
> 
> Отправка аргументов должна выполняться в шестнадцатеричных преобразованных значениях...используйте для этого toolbox
