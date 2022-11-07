#define VERSION 1.0
// #define SIMULATOR

#program name TokenSeller
#program activationAmount .33

// global variables, will be available in all functions
// external/loadable variables
long sellTokenName;
long sellTokenDecimals;
long sellTokenPrice;
long payoutAccountId;
long payoutPercentage;

#ifdef SIMULATOR
    const sellTokenName = "VGB";
    const sellTokenDecimals = 0;
    const sellTokenId = 111;
    const sellTokenPrice = 250_0000_0000;
    const payoutAccountId = 222;
    const payoutPercentage = 95;
#endif

// internal values, i.e. set during execution
long sellTokenId;
long isAlive = true;

struct TXINFO {
    long txId,
        sender,
        amount,
        message[4];
} currentTX;

construct();

void main(void) {
    while ((currentTX.txId = getNextTx()) != 0) {
        currentTX.sender = getSender(currentTX.txId);
        currentTX.amount = getAmount(currentTX.txId);

        if(!isAlive){
            sendAmount(currentTX.amount - 2000_0000, currentTX.sender);
            return;
        }

        readMessage(currentTX.txId, 0, currentTX.message);
        switch(currentTX.message[0]){
            case 'die':
                deactivate();
                break;
            case 'ctp':
                changeTokenPrice(currentTX.message[1]);
                break;
            default:
                txReceived();
        }
    }
}

// ---------------- PRIVATE ---------------------------
void construct(){
    sellTokenId = issueAsset(sellTokenName, "", sellTokenDecimals);
}

// ---------------- PUBLIC ---------------------------

void changeTokenPrice(long newPrice){
    if(currentTX.sender == getCreator()){
        sellTokenPrice = newPrice;
    }
}

void deactivate(){
    if(currentTX.sender == getCreator()){
        isAlive = false;
        sendBalance(getCreator());
    }
}

void txReceived(void) {
    if(currentTX.sender == getCreator()){
        return;
    }

    long soldTokens = 0;
    if(sellTokenPrice >= 1){
        soldTokens = currentTX.amount / sellTokenPrice;
    }

    if(soldTokens >= 1){
        mintAsset(soldTokens, sellTokenId);
        sendQuantity(soldTokens, sellTokenId, currentTX.sender);
        long realCosts = soldTokens * sellTokenPrice;
        long overpaid = currentTX.amount - realCosts;
        long payout = (realCosts * payoutPercentage) / 100;
        long fee = realCosts - payout - 2000_0000;
        sendAmount(payout, payoutAccountId);
        sendAmount(fee, getCreator());
        if(overpaid > 0){
            sendAmount(overpaid, currentTX.sender);
        }
    }
    else {
        // not enough, so refund it
        sendAmount(currentTX.amount, currentTX.sender);
    }
}
