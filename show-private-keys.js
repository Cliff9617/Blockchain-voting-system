const hre = require("hardhat");

async function main() {
  // Get the accounts from the hardhat configuration
  const accounts = hre.network.config.accounts;
  
  console.log("\n=== Hardhat Local Blockchain Accounts ===\n");
  console.log("You can import any of these private keys into MetaMask\n");
  console.log("Network Configuration for MetaMask:");
  console.log("- Network Name: Hardhat Local");
  console.log("- RPC URL: http://127.0.0.1:8545");
  console.log("- Chain ID: 31337");
  console.log("- Currency Symbol: ETH");
  console.log("- Block Explorer URL: (leave empty)\n");
  
  // Get the provider to fetch balances
  const provider = hre.ethers.provider;
  
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    // Create a wallet from the private key to get the address
    const wallet = new hre.ethers.Wallet(account.privateKey, provider);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Account #${i}: ${wallet.address}`);
    console.log(`Private Key: ${account.privateKey}`);
    console.log(`Balance: ${hre.ethers.formatEther(balance)} ETH\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});