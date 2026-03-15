const assert = require("assert");
const { web3, deployContract, assertRevert } = require("./helpers");
const Voting = require("../build/Voting.json");

let accounts;
let voting;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  voting = await deployContract(Voting, [], accounts[0]);
});

describe("Voting", () => {
  it("deploys contract", () => {
    assert.ok(voting.options.address);
  });

  it("admin can add candidates", async () => {
    await voting.methods.addCandidate("Alice").send({
      from: accounts[0],
      gas: 3000000,
    });

    const c1 = await voting.methods.candidates(1).call();
    assert.equal(c1.id, "1");
    assert.equal(c1.name, "Alice");
    assert.equal(c1.voteCount, "0");
  });

  it("non-admin cannot add candidates", async () => {
    await assertRevert(
      () =>
        voting.methods.addCandidate("Bob").send({
          from: accounts[1],
          gas: 3000000,
        }),
      "Only admin"
    );
  });

  it("voter can vote once", async () => {
    await voting.methods.addCandidate("Alice").send({
      from: accounts[0],
      gas: 3000000,
    });

    await voting.methods.vote(1).send({
      from: accounts[1],
      gas: 3000000,
    });

    const c1 = await voting.methods.candidates(1).call();
    assert.equal(c1.voteCount, "1");
  });

  it("voter cannot vote twice", async () => {
    await voting.methods.addCandidate("Alice").send({
      from: accounts[0],
      gas: 3000000,
    });

    await voting.methods.vote(1).send({
      from: accounts[1],
      gas: 3000000,
    });

    await assertRevert(
      () =>
        voting.methods.vote(1).send({
          from: accounts[1],
          gas: 3000000,
        }),
      "Already voted"
    );
  });

  it("vote count increments correctly", async () => {
    await voting.methods.addCandidate("Alice").send({
      from: accounts[0],
      gas: 3000000,
    });

    await voting.methods.addCandidate("Bob").send({
      from: accounts[0],
      gas: 3000000,
    });

    // 2 votes for Bob (candidate 2)
    await voting.methods.vote(2).send({ from: accounts[1], gas: 3000000 });
    await voting.methods.vote(2).send({ from: accounts[2], gas: 3000000 });

    const bob = await voting.methods.candidates(2).call();
    assert.equal(bob.voteCount, "2");
  });

  it("cannot vote when election closed", async () => {
    await voting.methods.addCandidate("Alice").send({
      from: accounts[0],
      gas: 3000000,
    });

    await voting.methods.closeElection().send({
      from: accounts[0],
      gas: 3000000,
    });

    await assertRevert(
      () =>
        voting.methods.vote(1).send({
          from: accounts[1],
          gas: 3000000,
        }),
      "Election closed"
    );
  });
});
