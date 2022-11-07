# Token Seller Contract
This contract issues a token and mints new tokens each time an account (with exception of the creator account) pays the given price in SIGNA.
The contract sends a percentage (default 95%) to another account, and the rest to the creator. The buyer gets his amount of tokens according the price.
Eventually, he gets overpaid SIGNA back, e.g. price is 5 SIGNA and he sends 7 SIGNA, then he gets 1 Token and 2 SIGNA back.

Этот контракт выпускает токен и чеканит новые токены каждый раз, когда учетная запись (за исключением учетной записи создателя) оплачивает указанную цену в SIGNA.
Контракт отправляет процент (по умолчанию 95%) на другую учетную запись, а остальное - создателю. Покупатель получает свое количество токенов в соответствии с ценой.
В конечном итоге, он получает сдачу за переплаченную SIGNA, например, цена составляет 5 SIGNA, а он отправляет 7 SIGNA, затем он получает 1 токен и 2 SIGNA обратно.

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
Логика: Пропорциональные выплаты держателям данного токена, как только накопленный на контракте баланс превышает 100 SIGNA

## Creating the contract (Создание контракта)

This contract can be deployed using the `new` command from the command line tool (just hit enter when asked for contract Id and select `new`)

Follow the instructions then. Your creator account needs at least `155.25 SIGNA` as a balance (a new token will be issued)

During the creation the following parameters can be configured:

Этот контракт может быть развернут с помощью команды `new` из инструмента командной строки (просто нажмите enter при запросе идентификатора контракта и выберите `new`).

Затем следуйте инструкциям. Баланс вашей учетной записи создателя должен составлять не менее 155,25 SIGNA (будет выпущен новый токен).

Во время создания могут быть настроены следующие параметры:

- Token Name
- Token Decimals
- Token Price (can be changed later)
- Beneficial Account for payout
- Beneficial Percentage

> All parameters are fixed and cannot be changed later, except the Price

## Additional contract methods (Дополнительные параметры заключения контрактов)

### Deactivate Account (Деактивировать учетную запись)

Disables the contract and pays out remaining balance to all token holders proportionally.
After contract is disabled no payouts are possible anymore, and all sent amount to the contract is being returned (minus activation/execution costs) to the sender.
Отключает контракт и пропорционально выплачивает оставшийся баланс всем держателям токенов.
После отключения контракта выплаты больше невозможны, и вся отправленная сумма по контракту возвращается отправителю (за вычетом затрат на активацию/исполнение).

Permission: Creator Only
Разрешение: Только создателю
Command: 'die'

### Change Token Price (Изменить цену токена)

Changes the price (in SIGNA) of the token (Default: 250 SIGNA)
Изменяет цену (в SIGNA) токена (по умолчанию: 250 SIGNA)

Permission: Creator Only
Command: 'ctp'
Argument: New Price in Planck 

> Sending arguments needs to be done in hex converted values...use the toolbox to do that
> Отправка аргументов должна выполняться в шестнадцатеричных преобразованных значениях...используйте для этого toolbox
