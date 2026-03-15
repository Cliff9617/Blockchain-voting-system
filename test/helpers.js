const ganache = require("ganache");
const { Web3 } = require("web3");

const provider = ganache.provider();
const web3 = new Web3(provider);

async function getAccounts() {
  return await web3.eth.getAccounts();
}

/**
 * Deploy any compiled contract JSON (artifact from /build/*.json)
 * @param {object} artifact - compiled json (abi + evm.bytecode)
 * @param {object} options - { from, args, gas }
 */
async function deployContract(artifact, options = {}) {
  const accounts = await getAccounts();

  const from = options.from || accounts[0];
  const args = options.args || [];
  const gas = options.gas || 3000000;

  if (!artifact || !artifact.abi) {
    throw new Error("Invalid artifact: missing abi");
  }

  const bytecode =
    artifact.evm && artifact.evm.bytecode && artifact.evm.bytecode.object
      ? artifact.evm.bytecode.object
      : null;

  if (!bytecode) {
    throw new Error("Invalid artifact: missing evm.bytecode.object");
  }

  const contract = new web3.eth.Contract(artifact.abi);

  const deployed = await contract
    .deploy({
      data: "0x" + bytecode,
      arguments: args
    })
    .send({ from, gas });

  return deployed;
}

/**
 * Assert a tx reverts (works with web3 v4 + ganache)
 * @param {Function|Promise} action - pass async () => contract.methods...send() OR a promise
 * @param {string} [reasonIncludes] - optional revert reason text to check
 */
async function assertRevert(action, reasonIncludes) {
  try {
    if (typeof action === "function") {
      await action();
    } else {
      await action;
    }
    throw new Error("Expected revert, but transaction succeeded");
  } catch (err) {
    const msg = (err && err.message ? err.message : "").toLowerCase();

    // generic revert patterns
    const reverted =
      msg.includes("revert") ||
      msg.includes("reverted") ||
      msg.includes("transaction has been reverted");

    if (!reverted) {
      throw err;
    }

    if (reasonIncludes) {
      const reasonLower = reasonIncludes.toLowerCase();
      if (!msg.includes(reasonLower)) {
        throw new Error(
          `Expected revert message to include "${reasonIncludes}", got: ${err.message}`
        );
      }
    }
  }
}

module.exports = {
  web3,
  provider,
  getAccounts,
  deployContract,
  assertRevert
};
