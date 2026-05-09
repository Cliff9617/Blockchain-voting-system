# Web3 Voting System - Frontend Connection Guide

## Overview

This guide explains how to connect the React frontend to your deployed smart contract using ethers.js v6.

## Files Created

### 1. `src/config.js`
- Contains the contract address placeholder and complete ABI
- Replace `"0xYOUR_DEPLOYED_ADDRESS"` with your actual deployed contract address
- The ABI is automatically extracted from your Hardhat compilation artifacts

### 2. `src/utils/connectWallet.js`
- Provides the `connectWallet()` function for MetaMask integration
- Uses ethers.js v6 syntax as required
- Includes proper error handling with console logs and user alerts
- Returns provider, signer, contract instance, and user address

### 3. `src/utils/testConnection.js` (Optional)
- Utility for testing the wallet connection
- Can be used to verify the implementation works correctly

## Usage

### Basic Connection
```javascript
import { connectWallet } from './utils/connectWallet';

const connectToWallet = async () => {
  const result = await connectWallet();
  if (result) {
    const { provider, signer, contract, address } = result;
    console.log('Connected as:', address);
    // Use contract methods here
  }
};
```

### Integration with Components
```javascript
import React, { useState } from 'react';
import { connectWallet } from '../utils/connectWallet';

function MyComponent() {
  const [wallet, setWallet] = useState(null);

  const handleConnect = async () => {
    const result = await connectWallet();
    if (result) {
      setWallet(result);
    }
  };

  return (
    <div>
      {wallet ? (
        <p>Connected: {wallet.address}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

## Contract Methods Available

Based on your ABI, you can call these methods on the contract instance:

- `addCandidate(name)` - Add a candidate
- `registerVoter(voterAddress)` - Register a voter
- `vote(candidateId)` - Vote for a candidate
- `startElection()` - Start the election
- `endElection()` - End the election
- `getCandidate(id)` - Get candidate info
- `getCandidatesCount()` - Get total candidates
- `electionStarted()` - Check if election started
- `electionEnded()` - Check if election ended

## Requirements Met

✅ **PART 1: CONNECT FRONTEND TO DEPLOYED SMART CONTRACT**
- Created `src/config.js` with contract address and ABI
- ABI matches the latest compiled contract from artifacts
- Clean, modular, and reusable code

✅ **PART 2: CONNECT METAMASK & INITIALIZE CONTRACT**
- Created `src/utils/connectWallet.js` with reusable function
- Uses ethers.js v6 syntax (NOT v5)
- Connects to `window.ethereum`
- Requests accounts and gets signer
- Initializes contract instance with signer
- Includes proper error handling
- Ready for integration into UI components

## Next Steps

1. **Deploy your contract** and update the `CONTRACT_ADDRESS` in `src/config.js`
2. **Integrate the connection function** into your UI components
3. **Use the contract instance** to call blockchain methods
4. **Handle user interactions** like voting, registration, etc.

## Testing

The React development server is running successfully. To test the connection:

1. Open your browser console
2. Import and call the test function:
```javascript
import { testConnection } from './utils/testConnection';
testConnection();
```

This will attempt to connect to MetaMask and verify the contract connection works.