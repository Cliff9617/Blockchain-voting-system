import { connectWallet } from './connectWallet';

/**
 * Admin Actions Utility Functions
 * All functions use ethers.js v6 and the existing connectWallet() function
 */

/**
 * Register a single voter (idempotent - safe to call multiple times)
 * @param {string} voterAddress - The wallet address to register
 * @returns {Promise<{success: boolean, alreadyRegistered?: boolean}>} - Success status
 */
export const registerVoter = async (voterAddress) => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      throw new Error("Wallet connection failed");
    }

    const { contract } = wallet;
    
    // Check if the connected wallet is the admin
    const adminAddress = await contract.admin();
    if (wallet.address.toLowerCase() !== adminAddress.toLowerCase()) {
      throw new Error("Only admin can register voters");
    }

    // Normalize address to lowercase
    const normalizedAddress = voterAddress.toLowerCase();
    
    // Check if voter is already registered on-chain first
    console.log(`[adminActions] Checking if voter is already registered: ${normalizedAddress}`);
    try {
      const voterInfo = await contract.getVoterInfo(normalizedAddress);
      const isRegistered = Array.isArray(voterInfo) ? voterInfo[0] : voterInfo?.isRegistered;
      
      if (isRegistered) {
        console.log(`[adminActions] Voter already registered on-chain, skipping: ${normalizedAddress}`);
        return { success: true, alreadyRegistered: true };
      }
    } catch (checkError) {
      // If check fails, continue with registration attempt
      console.warn(`[adminActions] Could not check registration status, will attempt registration: ${checkError.message}`);
    }

    // Voter not registered, proceed with registration
    console.log(`[adminActions] Registering voter on blockchain: ${normalizedAddress}`);
    const tx = await contract.registerVoter(normalizedAddress);
    await tx.wait();
    
    console.log(`Successfully registered voter: ${normalizedAddress}`);
    return { success: true, alreadyRegistered: false };
  } catch (error) {
    console.error("Error registering voter:", error);
    
    // Check if error is "already registered" - treat as success
    const errorMsg = String(error.message || error);
    if (errorMsg.includes("already registered") || errorMsg.includes("Voter already registered")) {
      console.log(`[adminActions] Voter already registered on-chain (caught in registration): ${voterAddress}`);
      return { success: true, alreadyRegistered: true };
    }
    
    // Provide more specific error messages for real errors
    if (errorMsg.includes("user rejected transaction")) {
      throw new Error("Transaction rejected by user");
    } else if (errorMsg.includes("insufficient funds")) {
      throw new Error("Insufficient funds for transaction");
    } else if (errorMsg.includes("Only admin")) {
      throw new Error("Only admin can register voters");
    } else if (errorMsg.includes("invalid address")) {
      throw new Error("Invalid wallet address format");
    } else {
      throw new Error(`Failed to register voter: ${errorMsg}`);
    }
  }
};

/**
 * Register multiple voters from an array of addresses
 * @param {string[]} voterAddresses - Array of wallet addresses to register
 * @returns {Promise<{success: number, failed: number}>} - Registration results
 */
export const registerMultipleVoters = async (voterAddresses) => {
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (const address of voterAddresses) {
    try {
      await registerVoter(address);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push({ address, error: error.message });
    }
  }

  return results;
};

/**
 * Upload and register voters from CSV file
 * @param {File} file - CSV file containing voter addresses
 * @returns {Promise<{success: number, failed: number}>} - Registration results
 */
export const uploadVoterList = async (file) => {
  try {
    // Import CSV parser dynamically to avoid circular dependencies
    const { parseVoterCSV } = await import('./csvParser');
    
    const voters = await parseVoterCSV(file);
    return await registerMultipleVoters(voters);
  } catch (error) {
    console.error("Error uploading voter list:", error);
    throw error;
  }
};

/**
 * Start the election
 * @returns {Promise<boolean>} - Success status
 */
export const startElection = async () => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      throw new Error("Wallet connection failed");
    }

    const { contract } = wallet;
    
    // Check if the connected wallet is the admin
    const adminAddress = await contract.admin();
    if (wallet.address.toLowerCase() !== adminAddress.toLowerCase()) {
      throw new Error("Only admin can start the election");
    }

    const tx = await contract.startElection();
    await tx.wait();
    
    console.log("Election started successfully");
    return true;
  } catch (error) {
    console.error("Error starting election:", error);
    
    if (error.message.includes("user rejected transaction")) {
      throw new Error("Transaction rejected by user");
    } else if (error.message.includes("insufficient funds")) {
      throw new Error("Insufficient funds for transaction");
    } else if (error.message.includes("Only admin")) {
      throw new Error("Only admin can start the election");
    } else if (error.message.includes("election already started")) {
      throw new Error("Election has already been started");
    } else {
      throw new Error(`Failed to start election: ${error.message}`);
    }
  }
};

/**
 * End the election
 * @returns {Promise<boolean>} - Success status
 */
export const endElection = async () => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      throw new Error("Wallet connection failed");
    }

    const { contract } = wallet;
    
    // Check if the connected wallet is the admin
    const adminAddress = await contract.admin();
    if (wallet.address.toLowerCase() !== adminAddress.toLowerCase()) {
      throw new Error("Only admin can end the election");
    }

    const tx = await contract.endElection();
    await tx.wait();
    
    console.log("Election ended successfully");
    return true;
  } catch (error) {
    console.error("Error ending election:", error);
    
    if (error.message.includes("user rejected transaction")) {
      throw new Error("Transaction rejected by user");
    } else if (error.message.includes("insufficient funds")) {
      throw new Error("Insufficient funds for transaction");
    } else if (error.message.includes("Only admin")) {
      throw new Error("Only admin can end the election");
    } else if (error.message.includes("election not started")) {
      throw new Error("Election has not been started yet");
    } else if (error.message.includes("election already ended")) {
      throw new Error("Election has already been ended");
    } else {
      throw new Error(`Failed to end election: ${error.message}`);
    }
  }
};

/**
 * Add a candidate to the election
 * @param {string} candidateName - The name of the candidate
 * @returns {Promise<boolean>} - Success status
 */
export const addCandidate = async (candidateName) => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      throw new Error("Wallet connection failed");
    }

    const { contract } = wallet;
    
    // Check if the connected wallet is the admin
    const adminAddress = await contract.admin();
    if (wallet.address.toLowerCase() !== adminAddress.toLowerCase()) {
      throw new Error("Only admin can add candidates");
    }

    const tx = await contract.addCandidate(candidateName);
    await tx.wait();
    
    console.log(`Successfully added candidate: ${candidateName}`);
    return true;
  } catch (error) {
    console.error("Error adding candidate:", error);
    
    if (error.message.includes("user rejected transaction")) {
      throw new Error("Transaction rejected by user");
    } else if (error.message.includes("insufficient funds")) {
      throw new Error("Insufficient funds for transaction");
    } else if (error.message.includes("Only admin")) {
      throw new Error("Only admin can add candidates");
    } else if (error.message.includes("election started")) {
      throw new Error("Cannot add candidates after election has started");
    } else if (error.message.includes("empty name")) {
      throw new Error("Candidate name cannot be empty");
    } else {
      throw new Error(`Failed to add candidate: ${error.message}`);
    }
  }
};

/**
 * Check if the connected wallet is the admin
 * @returns {Promise<boolean>} - Admin status
 */
export const isAdmin = async () => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      return false;
    }

    const { contract, address } = wallet;
    const adminAddress = await contract.admin();
    
    return address.toLowerCase() === adminAddress.toLowerCase();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

/**
 * Get admin address from contract
 * @returns {Promise<string>} - Admin wallet address
 */
export const getAdminAddress = async () => {
  try {
    const wallet = await connectWallet();
    if (!wallet) {
      throw new Error("Wallet connection failed");
    }

    const { contract } = wallet;
    return await contract.admin();
  } catch (error) {
    console.error("Error getting admin address:", error);
    throw error;
  }
};

/**
 * Test all admin functions (for development/testing)
 * @returns {Promise<Object>} - Test results
 */
export const testAdminActions = async () => {
  const results = {
    adminCheck: false,
    adminAddress: null,
    registerVoter: false,
    startElection: false,
    endElection: false,
    addCandidate: false,
    errors: []
  };

  try {
    // Check admin status
    results.adminCheck = await isAdmin();
    results.adminAddress = await getAdminAddress();
    
    console.log(`Admin check: ${results.adminCheck}`);
    console.log(`Admin address: ${results.adminAddress}`);

    if (!results.adminCheck) {
      results.errors.push("Not admin - skipping admin action tests");
      return results;
    }

    // Test register voter (with a dummy address)
    try {
      await registerVoter("0x0000000000000000000000000000000000000000");
    } catch (error) {
      // Expected to fail with invalid address, but confirms admin access
      if (error.message.includes("Only admin")) {
        results.errors.push("Admin access confirmed but invalid address used");
      } else {
        results.registerVoter = true; // Admin access confirmed
      }
    }

    // Test start election
    try {
      await startElection();
      results.startElection = true;
    } catch (error) {
      results.errors.push(`Start election error: ${error.message}`);
    }

    // Test end election
    try {
      await endElection();
      results.endElection = true;
    } catch (error) {
      results.errors.push(`End election error: ${error.message}`);
    }

    // Test add candidate
    try {
      await addCandidate("Test Candidate");
      results.addCandidate = true;
    } catch (error) {
      results.errors.push(`Add candidate error: ${error.message}`);
    }

  } catch (error) {
    results.errors.push(`Test error: ${error.message}`);
  }

  return results;
};