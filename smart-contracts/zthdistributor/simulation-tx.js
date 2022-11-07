/**
 * Transaction Array for SmartC Simulator
 *
 * https://deleterium.info/sc-simulator/
 *
 */

const transactions = [
  // Read the complete help at https://github.com/deleterium/SC-Simulator/blob/main/README.md
  {
    // initialize contract
    "blockheight": 2,
    "sender": "1000n",
    "recipient": "999n",
    "amount": "100_0000_0000n",
    "tokens": [
      {"asset": "1n", "quantity": "1_000_0n"} // one decimal for ZTH
    ]
  },
  {
    // initialize account
    "blockheight": 2,
    "sender": "1000n",
    "recipient": "777n",
    "amount": "1_0000_0000n",
    "tokens": [
      {"asset": "111n", "quantity": "2_0n"} // one decimal for ZTH
    ]
  },
  {
    // initialize account
    "blockheight": 2,
    "sender": "1000n",
    "recipient": "778n",
    "amount": "1_0000_0000n",
    "tokens": [
      {"asset": "111n", "quantity": "3_0n"} // one decimal for ZTH
    ]
  },
  {
    // change threshold amount for ZTH to 4 - not creator
    "blockheight": 9,
    "sender": "1555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "63687400000000002800000000000000" // ctp: [100_0000_0000]
  },
  {
    // change threshold amount for ZTH to 4
    "blockheight": 11,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "63687000000000000400000000000000" // cht: [4_0]
  },
  {
    // change payout amount for ZTH to 50
    "blockheight": 13,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "6368610000000000f401000000000000" // cha: [50_0]
  },
  {
    // change period to 4 blocks
    "blockheight": 15,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "63687000000000000400000000000000" // chp: [4]
  },
  {
    // deactivate
    "blockheight": 23,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "6469650000000000"
  },
  {
    // send something to contract
    "blockheight": 25,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "100_2000_0000"
  }
]

