const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;
  
  console.log("\n=== Hardhat Local Blockchain Accounts ===\n");
  console.log("You can import any of these private keys into MetaMask\n");
  console.log("Network Configuration for MetaMask:");
  console.log("- Network Name: Hardhat Local");
  console.log("- RPC URL: http://127.0.0.1:8545");
  console.log("- Chain ID: 31337");
  console.log("- Currency Symbol: ETH");
  console.log("- Block Explorer URL: (leave empty)\n");
  
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const balance = await provider.getBalance(account.address);
    console.log(`Account #${i}: ${account.address}`);
    console.log(`Private Key: ${account.privateKey}`);
    console.log(`Balance: ${hre.ethers.formatEther(balance)} ETH\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});