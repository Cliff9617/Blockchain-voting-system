const assert = require("assert");
const inboxArtifact = require("../build/Inbox.json");
const { web3, getAccounts, deployContract } = require("./helpers");

let accounts;
let inbox;

beforeEach(async () => {
  accounts = await getAccounts();

  // ✅ PASS THE 1 REQUIRED CONSTRUCTOR ARGUMENT HERE
  inbox = await deployContract(inboxArtifact, {
    from: accounts[0],
    args: ["Hi there!"]
  });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({
      from: accounts[0],
      gas: 100000
    });

    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "bye");
  });
});
