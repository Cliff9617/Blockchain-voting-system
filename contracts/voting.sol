// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    // Position enum for type safety
    enum Position {
        President,
        Governor,
        Senator,
        WomanRepresentative,
        MemberOfParliament,
        MCA
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        Position position;
        string county;
        string constituency;
        string ward;
    }

    address public admin;

    bool public electionStarted;
    bool public electionEnded;

    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    // Position-based voting: track if voter has voted for each position
    // hasVotedForPosition[voterAddress][positionIndex] = true/false
    mapping(address => mapping(uint => bool)) public hasVotedForPosition;
    
    // Track which candidate the voter voted for in each position
    mapping(address => mapping(uint => uint)) public voterChoiceByPosition;
    
    // Legacy support - keep hasVoted for backward compatibility
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public registeredVoters;
    mapping(address => uint) public voterChoice; // Track which candidate each voter selected (legacy)

    event CandidateAdded(uint candidateId, string name, uint position, string county, string constituency, string ward);
    event ElectionStarted();
    event ElectionEnded();
    event VoterRegistered(address voter);
    event Voted(address voter, uint candidateId, uint position);

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

    function registerVoter(address _voter) public onlyAdmin {
        require(_voter != address(0), "Invalid address");
        require(!registeredVoters[_voter], "Voter already registered");

        registeredVoters[_voter] = true;

        emit VoterRegistered(_voter);
    }

    function startElection() public onlyAdmin {
        require(!electionStarted, "Election already started");
        require(candidatesCount > 0, "No candidates added");

        electionStarted = true;

        emit ElectionStarted();
    }

    function endElection() public onlyAdmin {
        require(electionStarted, "Election not started");
        require(!electionEnded, "Election already ended");

        electionEnded = true;

        emit ElectionEnded();
    }

    /**
     * @dev Validate candidate geographical data based on position
     */
    function _validateCandidateGeoData(
        uint _position,
        string memory _county,
        string memory _constituency,
        string memory _ward
    ) internal pure {
        if (_position == 0) {
            // President - national position, no geographical restriction needed
            require(bytes(_county).length == 0, "President candidates should not have county");
            require(bytes(_constituency).length == 0, "President candidates should not have constituency");
            require(bytes(_ward).length == 0, "President candidates should not have ward");
        } else if (_position <= 3) {
            // Governor, Senator, Woman Representative - county-level positions
            require(bytes(_county).length > 0, "County required for this position");
            require(bytes(_constituency).length == 0, "Constituency not needed for this position");
            require(bytes(_ward).length == 0, "Ward not needed for this position");
        } else if (_position == 4) {
            // Member of Parliament - constituency-level position
            require(bytes(_county).length > 0, "County required for MP");
            require(bytes(_constituency).length > 0, "Constituency required for MP");
            require(bytes(_ward).length == 0, "Ward not needed for MP");
        } else {
            // MCA - ward-level position
            require(bytes(_county).length > 0, "County required for MCA");
            require(bytes(_constituency).length > 0, "Constituency required for MCA");
            require(bytes(_ward).length > 0, "Ward required for MCA");
        }
    }

    /**
     * @dev Add a candidate with position and geographical area
     * @param _name Candidate name
     * @param _position Position index (0=President, 1=Governor, 2=Senator, 3=WomanRepresentative, 4=MemberOfParliament, 5=MCA)
     * @param _county County name (empty for President)
     * @param _constituency Constituency name (empty for President, Governor, Senator, WomanRep)
     * @param _ward Ward name (only for MCA)
     */
    function addCandidate(
        string memory _name,
        uint _position,
        string memory _county,
        string memory _constituency,
        string memory _ward
    ) public onlyAdmin {
        require(!electionStarted, "Election already started");
        require(bytes(_name).length > 0, "Candidate name required");
        require(_position <= 5, "Invalid position");

        _validateCandidateGeoData(_position, _county, _constituency, _ward);

        candidatesCount++;

        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            voteCount: 0,
            position: Position(_position),
            county: _county,
            constituency: _constituency,
            ward: _ward
        });

        emit CandidateAdded(candidatesCount, _name, _position, _county, _constituency, _ward);
    }

    /**
     * @dev Legacy addCandidate function for backward compatibility
     */
    function addCandidate(string memory _name) public onlyAdmin {
        // Call the new function with President position (0) and empty geographical areas
        addCandidate(_name, 0, "", "", "");
    }

    /**
     * @dev Vote for a candidate
     * @param _candidateId The candidate ID to vote for
     */
    function vote(uint _candidateId)
        public
        electionActive
        onlyRegistered
    {
        require(
            _candidateId > 0 && _candidateId <= candidatesCount,
            "Invalid candidate"
        );

        Candidate memory candidate = candidates[_candidateId];
        uint positionIndex = uint(candidate.position);

        // Check if voter has already voted for this position
        require(!hasVotedForPosition[msg.sender][positionIndex], "Already voted for this position");

        // Update vote count
        candidates[_candidateId].voteCount++;
        
        // Track voter's choice for this position
        voterChoiceByPosition[msg.sender][positionIndex] = _candidateId;
        hasVotedForPosition[msg.sender][positionIndex] = true;

        // Legacy support - mark as voted (for backward compatibility)
        hasVoted[msg.sender] = true;
        voterChoice[msg.sender] = _candidateId;

        emit Voted(msg.sender, _candidateId, positionIndex);
    }

    /**
     * @dev Get candidate details
     */
    function getCandidate(uint _id)
        public
        view
        returns(
            string memory name,
            uint voteCount,
            uint position,
            string memory county,
            string memory constituency,
            string memory ward
        )
    {
        Candidate memory candidate = candidates[_id];
        return (
            candidate.name,
            candidate.voteCount,
            uint(candidate.position),
            candidate.county,
            candidate.constituency,
            candidate.ward
        );
    }

    /**
     * @dev Get basic voter info (registration and legacy voting status)
     */
    function getVoterBasicInfo(address _voter)
        public
        view
        returns(
            bool isRegistered,
            bool voterHasVoted,
            uint votedFor
        )
    {
        isRegistered = registeredVoters[_voter];
        voterHasVoted = hasVoted[_voter];
        votedFor = voterChoice[_voter];
    }

    /**
     * @dev Get position-based voting status for a voter
     */
    function getPositionVotingStatus(address _voter)
        public
        view
        returns(
            bool hasVotedPresident,
            bool hasVotedGovernor,
            bool hasVotedSenator,
            bool hasVotedWomanRep,
            bool hasVotedMP,
            bool hasVotedMCA
        )
    {
        hasVotedPresident = hasVotedForPosition[_voter][0];
        hasVotedGovernor = hasVotedForPosition[_voter][1];
        hasVotedSenator = hasVotedForPosition[_voter][2];
        hasVotedWomanRep = hasVotedForPosition[_voter][3];
        hasVotedMP = hasVotedForPosition[_voter][4];
        hasVotedMCA = hasVotedForPosition[_voter][5];
    }

    /**
     * @dev Get voter info including position-based voting status (legacy compatibility)
     */
    function getVoterInfo(address _voter)
        public
        view
        returns(
            bool isRegistered,
            bool voterHasVoted,
            uint votedFor,
            bool hasVotedPresident,
            bool hasVotedGovernor,
            bool hasVotedSenator,
            bool hasVotedWomanRep,
            bool hasVotedMP,
            bool hasVotedMCA
        )
    {
        // Get basic info
        isRegistered = registeredVoters[_voter];
        voterHasVoted = hasVoted[_voter];
        votedFor = voterChoice[_voter];
        
        // Get position voting status
        hasVotedPresident = hasVotedForPosition[_voter][0];
        hasVotedGovernor = hasVotedForPosition[_voter][1];
        hasVotedSenator = hasVotedForPosition[_voter][2];
        hasVotedWomanRep = hasVotedForPosition[_voter][3];
        hasVotedMP = hasVotedForPosition[_voter][4];
        hasVotedMCA = hasVotedForPosition[_voter][5];
    }

    /**
     * @dev Check if a voter has voted for a specific position
     * @param _voter Voter address
     * @param _position Position index (0-5)
     * @return hasVoted True if voter has voted for this position
     */
    function hasVoterVotedForPosition(address _voter, uint _position)
        public
        view
        returns (bool)
    {
        require(_position <= 5, "Invalid position");
        return hasVotedForPosition[_voter][_position];
    }

    /**
     * @dev Get the candidate a voter voted for in a specific position
     * @param _voter Voter address
     * @param _position Position index (0-5)
     * @return candidateId The candidate ID voted for (0 if not voted)
     */
    function getVoterChoiceForPosition(address _voter, uint _position)
        public
        view
        returns (uint)
    {
        require(_position <= 5, "Invalid position");
        return voterChoiceByPosition[_voter][_position];
    }

    /**
     * @dev Get total number of positions (6)
     */
    function getPositionCount() public pure returns (uint) {
        return 6;
    }

    /**
     * @dev Get position name by index
     */
    function getPositionName(uint _index) public pure returns (string memory) {
        require(_index <= 5, "Invalid position");
        if (_index == 0) return "President";
        if (_index == 1) return "Governor";
        if (_index == 2) return "Senator";
        if (_index == 3) return "Woman Representative";
        if (_index == 4) return "Member of Parliament";
        return "MCA";
    }
}