// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {

    struct Candidate {
        string name;
        uint voteCount;
    }

    address public admin;

    bool public electionStarted;
    bool public electionEnded;

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    mapping(address => bool) public hasVoted;

    // Registered voters
    mapping(address => bool) public registeredVoters;

    // EVENTS
    event CandidateAdded(uint candidateId, string name);
    event ElectionStarted();
    event ElectionEnded();
    event VoterRegistered(address voter);
    event Voted(address voter, uint candidateId);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    modifier electionActive() {
        require(electionStarted, "Election not started");
        require(!electionEnded, "Election ended");
        _;
    }

    modifier onlyRegistered() {
        require(registeredVoters[msg.sender], "Not a registered voter");
        _;
    }

    // REGISTER VOTER (ADMIN ONLY)

    function registerVoter(address _voter) public onlyAdmin {

        require(_voter != address(0), "Invalid address");

        require(
            !registeredVoters[_voter],
            "Voter already registered"
        );

        registeredVoters[_voter] = true;

        emit VoterRegistered(_voter);
    }

    // START ELECTION

    function startElection() public onlyAdmin {

        require(!electionStarted, "Election already started");

        require(candidatesCount > 0, "No candidates added");

        electionStarted = true;

        emit ElectionStarted();
    }

    // END ELECTION

    function endElection() public onlyAdmin {

        require(electionStarted, "Election not started");

        require(!electionEnded, "Election already ended");

        electionEnded = true;

        emit ElectionEnded();
    }

    // ADD CANDIDATE

    function addCandidate(string memory _name)
        public
        onlyAdmin
    {

        require(!electionStarted, "Election already started");

        require(bytes(_name).length > 0, "Candidate name required");

        candidatesCount++;

        candidates[candidatesCount] = Candidate({
            name: _name,
            voteCount: 0
        });

        emit CandidateAdded(candidatesCount, _name);
    }

    // VOTE

    function vote(uint _candidateId)
        public
        electionActive
        onlyRegistered
    {

        require(!hasVoted[msg.sender], "Already voted");

        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate"
        );

        candidates[_candidateId].voteCount++;

        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _candidateId);
    }
}