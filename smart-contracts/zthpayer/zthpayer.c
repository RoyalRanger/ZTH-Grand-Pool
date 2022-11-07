#define VERSION 1.0
// #define SIMULATOR
// #define TESTNET
#define MAINNET

#program name ZTHPayer
#program activationAmount .2

#ifdef SIMULATOR
    #define ZTH_TOKEN_ID 1
#endif
#ifdef TESTNET
    #define ZTH_TOKEN_ID 9866069454022597581
#endif
#ifdef MAINNET
    #define ZTH_TOKEN_ID 9518219425200752102
#endif

// global variables, will be available in all functions
// external/loadable variables
long thresholdSigna = 100_0000_0000;
long thresholdQuantity = 0;

// internal values, i.e. set during execution
long isAlive = true;

struct TXINFO {
    long txId,
        sender,
        amount,
        message[4];
} currentTX;


void main(void) {
    while ((currentTX.txId = getNextTx()) != 0) {
        currentTX.sender = getSender(currentTX.txId);
        currentTX.amount = getAmount(currentTX.txId);

        if(!isAlive){
            sendAmount(currentTX.amount, currentTX.sender);
            return;
        }

        readMessage(currentTX.txId, 0, currentTX.message);
        switch(currentTX.message[0]){
            case 'die':
                deactivate();
                break;
            case 'cthsig':
                changeSignaThreshold(currentTX.message[1]);
                break;
            case 'cthzth':
                changeZTHThreshold(currentTX.message[1]);
                break;
            default:
                txReceived();
        }
    }
}


// ---------------- PRIVATE ---------------------------

// ---------------- PUBLIC ---------------------------

void changeSignaThreshold(long newThresholdSigna){
    if(currentTX.sender == getCreator()){
        thresholdSigna = newThresholdSigna;
    }
}

void changeZTHThreshold(long newThresholdZTH){
    if(currentTX.sender == getCreator()){
        thresholdQuantity = newThresholdZTH;
    }
}

void deactivate(){
    if(currentTX.sender == getCreator()){
        isAlive = false;
        distributeToHolders(thresholdQuantity, ZTH_TOKEN_ID, getCurrentBalance(), 0, 0 );
    }
}

void txReceived(void) {
    if(!isAlive) return;
    long payout = getCurrentBalance() - 2000_0000; // 0.20 - keep some balance back
    if(payout >= thresholdSigna){
        distributeToHolders(thresholdQuantity, ZTH_TOKEN_ID, payout, 0, 0 );
    }
}
