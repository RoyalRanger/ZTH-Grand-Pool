/**
 * Transaction Array for SmartC Simulator
 *
 * https://deleterium.info/sc-simulator/
 *
 * @type {[{}]}
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
      {"asset": "111n", "quantity": 10}
    ]
  },
  {
    // buy a token
    "blockheight": 4,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "250_2000_0000"
  },
  {
    // change token price to 100 SIGNA - but not Creator
    "blockheight": 6,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "637470000000000000e40b5402000000" // ctp: [100_0000_0000]
  },
  {
    // change token price to 100 SIGNA - now it works
    "blockheight": 8,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "637470000000000000e40b5402000000" // ctp: [100_0000_0000]
  },
  {
    // buy two and a half token
    "blockheight": 10,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "250_0000_0000"
  },
  {
    // deactivate - wrong sender
    "blockheight": 14,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "6469650000000000"
  },
  {
    // deactivate
    "blockheight": 14,
    "sender": "555n",
    "recipient": "999n",
    "amount": "2000_0000",
    "messageHex": "6469650000000000"
  },
  {
    // send something to contract
    "blockheight": 16,
    "sender": "10000n",
    "recipient": "999n",
    "amount": "100_2000_0000"
  }
]
