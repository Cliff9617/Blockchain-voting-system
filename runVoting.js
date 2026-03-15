const ganache = require("ganache");
const { Web3 } = require("web3");
const Voting = require("./build/Voting.json");

const web3 = new Web3(
  ganache.provider({
    logging: { quiet: true },
  })
);

function normalizeArtifact(artifact) {
  const abi = artifact.abi || JSON.parse(artifact.interface);
  const bytecode =
    artifact?.evm?.bytecode?.object || artifact.bytecode || "";

  if (!abi) throw new Error("ABI missing in Voting artifact");
  if (!bytecode) throw new Error("Bytecode missing in Voting artifact");

  return { abi, bytecode: bytecode.startsWith("0x") ? bytecode : "0x" + bytecode };
}

async function main() {
  const accounts = await web3.eth.getAccounts();
  const admin = accounts[0];
  const voter1 = accounts[1];

  console.log("Accounts:");
  console.log("Admin:", admin);
  console.log("Voter1:", voter1);

  const { abi, bytecode } = normalizeArtifact(Voting);

  console.log("\nDeploying Voting contract...");
  const voting = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: admin, gas: 3000000 });

  console.log("✅ Voting deployed at:", voting.options.address);

  // ---- DEMO FLOW (adjust function names if yours differ) ----
  // 1) Add candidates (admin only)
  console.log("\nAdding candidates...");
  await voting.methods.addCandidate("Alice").send({ from: admin, gas: 300000 });
  await voting.methods.addCandidate("Bob").send({ from: admin, gas: 300000 });
  console.log("✅ Candidates added: Alice, Bob");

  // 2) Vote once (voter1)
  console.log("\nVoting...");
  await voting.methods.vote(0).send({ from: voter1, gas: 300000 });
  console.log("✅ Voter1 voted for candidate index 0 (Alice)");

  // 3) Read results
  const c0 = await voting.methods.candidates(0).call();
  const c1 = await voting.methods.candidates(1).call();

  console.log("\nCurrent results:");
  console.log("Candidate 0:", c0);
  console.log("Candidate 1:", c1);

  // 4) Close election (admin)
  console.log("\nClosing election...");
  await voting.methods.closeElection().send({ from: admin, gas: 200000 });
  console.log("✅ Election closed");

  console.log("\nDone ✅");
}

main().catch((err) => {
  console.error("❌ Error running demo:", err.message);
  process.exit(1);
});
