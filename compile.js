const path = require("path");
const fs = require("fs");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}

// Read contracts
const inboxSource = fs.readFileSync(path.resolve(__dirname, "contracts", "Inbox.sol"), "utf8");
const votingSource = fs.readFileSync(path.resolve(__dirname, "contracts", "Voting.sol"), "utf8");

// Solidity input
const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": { content: inboxSource },
    "Voting.sol": { content: votingSource }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach(err => console.error(err.formattedMessage));
}

// Save Inbox
const inbox = output.contracts["Inbox.sol"]["Inbox"];
fs.writeFileSync(
  path.resolve(buildPath, "Inbox.json"),
  JSON.stringify(inbox, null, 2)
);

// Save Voting
const voting = output.contracts["Voting.sol"]["Voting"];
fs.writeFileSync(
  path.resolve(buildPath, "Voting.json"),
  JSON.stringify(voting, null, 2)
);

console.log("✅ Built: Inbox.json");
console.log("✅ Built: Voting.json");
