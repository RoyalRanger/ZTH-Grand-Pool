#define VERSION 1.0
// #define SIMULATOR
#define TESTNET
// #define MAINNET

#program name ZthDistributor
#program activationAmount .2
#pragma maxAuxVars 4

#ifdef SIMULATOR
    #define ZTH_TOKEN_ID 1
#endif
#ifdef TESTNET
    #define ZTH_TOKEN_ID 9866069454022597581
#endif
#ifdef MAINNET
    #define ZTH_TOKEN_ID 9518219425200752102
#endif

// 10800 Blocks equals approx. 30 days
#define MAX_SLEEP_BLOCKS 10800

// global variables, will be available in all functions
// external/loadable variables
long zthPayoutAmount;
long payoutSleepBlocks;
long relevantTokenId;
long thresholdQuantity;

#ifdef SIMULATOR
    const zthPayoutAmount = 100_0;
    const payoutSleepBlocks = 2;
    const relevantTokenId = 111;
    const thresholdQuantity = 1;
#endif

// internal values, i.e. set during execution
long isAlive = true;

struct TXINFO {
    long txId,
        sender,
        amount,
        message[4];
} currentTX;

void main(void) {
    while(true){

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
                case 'cht':
                    changeThreshold(currentTX.message[1]);
                    break;
                case 'chp':
                    changePeriod(currentTX.message[1]);
                    break;
                case 'cha':
                    changeAmount(currentTX.message[1]);
                    break;
            }
        }
        payout();
        sleep payoutSleepBlocks;
    }

}

// ---------------- PRIVATE ---------------------------


// ---------------- PUBLIC ---------------------------

void deactivate(){
    if(currentTX.sender == getCreator()){
        sendBalance(getCreator());
        sendQuantity(getAssetBalance(ZTH_TOKEN_ID), ZTH_TOKEN_ID, getCreator());
        isAlive = false;
    }
}

void changeAmount(long amount){
    if(currentTX.sender == getCreator() && amount > 0){
        zthPayoutAmount = amount;
    }
}

void changePeriod(long blocks){
    if(currentTX.sender == getCreator() && blocks > 0 && blocks <= MAX_SLEEP_BLOCKS){
        payoutSleepBlocks = blocks;
    }
}

void changeThreshold(long threshold){
    if(currentTX.sender == getCreator()){
        thresholdQuantity = threshold;
    }
}

void payout() {
   if(isAlive){
        distributeToHolders(
            thresholdQuantity,
            relevantTokenId,
            0,
            ZTH_TOKEN_ID,
            zthPayoutAmount
        );
   }
}
