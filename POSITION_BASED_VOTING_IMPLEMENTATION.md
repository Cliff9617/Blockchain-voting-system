# DeVote Position-Based Voting System Implementation

## Overview

This document describes the implementation of position-based voting and geographical filtering in the DeVote blockchain voting system. The system now supports multiple elective positions (President, Governor, Senator, Woman Representative, MP, MCA) with proper geographical filtering based on voter registration areas.

## Changes Made

### 1. Smart Contract (`contracts/voting.sol`)

#### New Features:
- **Position Enum**: Added `Position` enum with 6 positions (0=President, 1=Governor, 2=Senator, 3=WomanRepresentative, 4=MemberOfParliament, 5=MCA)
- **Enhanced Candidate Struct**: Now includes `position`, `county`, `constituency`, and `ward` fields
- **Position-Based Voting**: 
  - `hasVotedForPosition[voter][position]` - Tracks if voter has voted for each position
  - `voterChoiceByPosition[voter][position]` - Tracks which candidate voter chose for each position
- **New Functions**:
  - `addCandidate(name, position, county, constituency, ward)` - Add candidate with position and area
  - `getCandidate(id)` - Returns full candidate details including position and area
  - `getVoterInfo(voter)` - Returns position-based voting status for all 6 positions
  - `hasVoterVotedForPosition(voter, position)` - Check if voter voted for specific position
  - `getVoterChoiceForPosition(voter, position)` - Get candidate voted for in specific position
  - `getPositionCount()` - Returns 6 (total positions)
  - `getPositionName(index)` - Returns position name by index

#### Backward Compatibility:
- Legacy `addCandidate(string name)` function still works (adds as President)
- Legacy `hasVoted` and `voterChoice` mappings maintained for compatibility

### 2. Election Filters (`devote-ui/src/utils/electionFilters.js`)

#### New Constants:
```javascript
POSITIONS = {
  PRESIDENT: 'president',
  GOVERNOR: 'governor',
  SENATOR: 'senator',
  WOMAN_REPRESENTATIVE: 'woman representative',
  MEMBER_OF_PARLIAMENT: 'member of parliament',
  MCA: 'mca'
}
```

#### New Functions:
- `normalizePosition(position)` - Normalize position name/index to standard format
- `getPositionIndex(position)` - Convert position name to index (0-5)
- `candidateMatchesVoterArea(candidate, voter)` - Check if candidate is visible to voter based on:
  - President: Always visible (national)
  - Governor/Senator/Woman Rep: Visible if county matches
  - MP: Visible if constituency matches
  - MCA: Visible if ward matches
- `filterCandidatesForVoter(candidates, voter)` - Filter candidates based on voter location
- `getCandidatesForPosition(candidates, position)` - Get candidates for specific position
- `calculateWinnersByPosition(candidates, voter)` - Calculate winners for each position
- `getWinnerAreaDescription(position, candidate)` - Get area description for winner display

### 3. Election Hook (`devote-ui/src/hooks/useElection.js`)

#### New State:
```javascript
voterInfo = {
  isRegistered: null,
  hasVoted: null,
  votedFor: null,
  hasVotedPresident: null,
  hasVotedGovernor: null,
  hasVotedSenator: null,
  hasVotedWomanRep: null,
  hasVotedMP: null,
  hasVotedMCA: null,
}
```

#### New Functions:
- `hasVotedForPosition(position)` - Check if voter has voted for specific position
- `canVoteForPosition(position)` - Check if voter can vote for specific position
- `getWinnersByPosition()` - Get winners for all positions
- `getTotalVotesForPosition(position)` - Get total votes for a position
- `getVotePercentageForPosition(candidate)` - Get vote percentage within position

#### Updated Functions:
- `loadElectionData()` - Now loads position data from blockchain
- `checkVoterInfo()` - Now parses position-based voting status
- `addCandidate()` - Now accepts position and geographical data
- `vote()` - Now works with position-based voting

### 4. Election Dashboard (`devote-ui/src/components/ElectionDashboard.js`)

#### New Features:
- **Position Tabs**: Filter candidates by position (All, President, Governor, Senator, etc.)
- **Geographical Filtering**: Only shows candidates relevant to voter's registered area
- **Position-Specific Voting Status**: Shows whether voter has voted for each position
- **Position Winners**: When election ends, shows winner for each position with:
  - Winner name and party
  - Total votes and percentage
  - Area won (e.g., "Nairobi County", "Kasarani Constituency")
  - Tie detection and display

### 5. Results Page (`devote-ui/src/pages/ResultsPage.js`)

#### New Features:
- **Position Filter Dropdown**: "Select Position to View Results"
- **Geographical Filtering**: Results filtered by voter's registered area
- **Position-Specific Winners**: Shows winner for each position when election ends
- **Tie Display**: Shows "Tie Declared" with all tied candidates
- **Live Results**: Updates as votes are cast (via blockchain events)

### 6. Add Candidate Component (`devote-ui/src/components/AddCandidate.js`)

#### New Features:
- **Position Dropdown**: Select position (President, Governor, Senator, etc.)
- **Dynamic Geographical Fields**:
  - President: No geographical fields
  - Governor/Senator/Woman Rep: County dropdown
  - MP: County + Constituency dropdowns
  - MCA: County + Constituency + Ward dropdowns
- **Cascading Dropdowns**: Constituencies filter by county, wards filter by constituency
- **Validation**: Ensures required fields based on position

### 7. Candidate Card (`devote-ui/src/components/CandidateCard.js`)

#### New Features:
- **Position Badge**: Shows position (e.g., "President", "Governor")
- **Area Display**: Shows geographical area (e.g., "📍 Nairobi County")
- **Detailed Information**: Shows county, constituency, ward in details section
- **Position-Aware Voting**: Vote button respects position-based voting rules

### 8. App.js

#### Updated Props:
- Passes new position-based voting props to all components:
  - `getWinnersByPosition`
  - `getTotalVotesForPosition`
  - `getVotePercentageForPosition`
  - `hasVotedForPosition`
  - `canVoteForPosition`
- Passes `voter` (location data) to ElectionDashboard and ResultsPage

## Geographical Filtering Rules

| Position | Visibility Rule |
|----------|----------------|
| President | All voters (national position) |
| Governor | Voters in same county |
| Senator | Voters in same county |
| Woman Representative | Voters in same county |
| Member of Parliament | Voters in same constituency |
| MCA | Voters in same ward |

## Voting Restrictions

- A voter can vote **once per position**
- `hasVotedForPosition[voter][position]` tracks voting per position
- Voter can vote for President, Governor, Senator, etc., but only once for each
- Attempting to vote twice for the same position will be rejected

## Winner Calculation

When election ends, winners are calculated per position:
1. Filter candidates by position
2. Sort by vote count (descending)
3. Check for ties at the top
4. If tie: Show "Tie Declared" with all tied candidates
5. If clear winner: Show winner with votes, percentage, and area won

## Console Logging

Comprehensive debug logging added throughout:
- `[useElection]` - Election hook operations
- `[ElectionDashboard]` - Dashboard filtering and voting
- `[ResultsPage]` - Results filtering and display
- `[candidateMatchesVoterArea]` - Geographical filtering decisions
- `[filterCandidatesForVoter]` - Candidate filtering process
- `[AddCandidate]` - Candidate creation

## Migration Requirements

### Smart Contract
1. **Redeploy Required**: Yes, the contract has significant changes
2. **Update CONTRACT_ADDRESS**: Yes, in `devote-ui/src/config.js`
3. **Recompile**: Run `npm run compile` to get new ABI

### Firebase Data
1. **Candidate Documents**: Existing candidates need `position` field added
2. **Position Field**: Should be one of: 'president', 'governor', 'senator', 'woman representative', 'member of parliament', 'mca'
3. **Geographical Fields**: Add `county`, `constituency`, `ward` as appropriate
4. **Migration Script**: Consider writing a script to update existing candidate documents

### Voter Registration
1. **Location Data**: Ensure voter registration includes `county`, `constituency`, `ward`
2. **Existing Voters**: May need to update their registration with location data

## Testing Checklist

- [ ] Deploy new smart contract
- [ ] Update CONTRACT_ADDRESS in config.js
- [ ] Add candidates for all positions with proper geographical data
- [ ] Register voters with location data
- [ ] Test voting for different positions
- [ ] Verify geographical filtering works correctly
- [ ] Test winner calculation for each position
- [ ] Test tie detection
- [ ] Verify position-based voting restrictions

## Files Modified

1. `contracts/voting.sol` - Smart contract with position support
2. `devote-ui/src/utils/electionFilters.js` - Position and geographical filtering
3. `devote-ui/src/hooks/useElection.js` - Position-based voting logic
4. `devote-ui/src/components/ElectionDashboard.js` - Position tabs and filtering
5. `devote-ui/src/pages/ResultsPage.js` - Position results and winners
6. `devote-ui/src/components/AddCandidate.js` - Position and area selection
7. `devote-ui/src/components/CandidateCard.js` - Position display
8. `devote-ui/src/App.js` - Pass new props to components

## Summary

The DeVote system now fully supports:
- ✅ Multiple elective positions (President, Governor, Senator, Woman Rep, MP, MCA)
- ✅ Geographical filtering based on voter registration
- ✅ Position-based voting (vote once per position)
- ✅ Position-specific results display
- ✅ Winner declaration per position
- ✅ Tie detection and display
- ✅ Comprehensive console logging
- ✅ Clean, professional UI
- ✅ Backward compatibility with existing data