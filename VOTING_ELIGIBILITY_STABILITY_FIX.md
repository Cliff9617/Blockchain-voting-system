# Vote Eligibility Stability Fix - COMPLETE

## Problem
The Vote page was experiencing "shaking" because eligibility state kept flipping between:
- "You are eligible to vote now" ↔ "You are not eligible at the moment"
- "Cast Your Vote" ↔ "Voting Unavailable"

## Root Cause
1. **Multiple inconsistent eligibility calculations** - `canVote` was being calculated independently in both `ElectionDashboard.js` and `CandidateCard.js`, leading to different values during re-renders
2. **Default values of `false` blocking voting** - Initial state values like `isRegistered: false`, `electionStarted: false` temporarily showed "not eligible" while data was loading
3. **Duplicate state in App.js** - Local `voterInfo` state duplicated the hook's state, causing sync issues
4. **CandidateCard had its own eligibility logic** - It was checking `isRegistered`, `electionStarted`, etc. independently

## Solution

### 1. useElection.js - Use null defaults instead of false
Changed default values from `false` to `null` so we can distinguish between "not loaded" and "loaded as false":
```javascript
const [electionStarted, setElectionStarted] = useState(null);
const [electionEnded, setElectionEnded] = useState(null);
const [voterInfo, setVoterInfo] = useState({
  isRegistered: null,
  hasVoted: null,
  votedFor: null,
});
```

### 2. ElectionDashboard.js - Add eligibilityReady guard and stable canVote
```javascript
// Loading guard - do not calculate eligibility until all values are loaded
const eligibilityReady =
  isRegistered !== null &&
  isRegistered !== undefined &&
  electionStarted !== null &&
  electionStarted !== undefined &&
  electionEnded !== null &&
  electionEnded !== undefined &&
  hasVoted !== null &&
  hasVoted !== undefined;

// Derived constant - not state - only calculated when eligibilityReady is true
const canVote = eligibilityReady
  ? Boolean(isRegistered) &&
    Boolean(electionStarted) &&
    !Boolean(electionEnded) &&
    !Boolean(hasVoted) &&
    !isLoading &&
    typeof onVote === "function"
  : false;
```

### 3. CandidateCard.js - Complete rewrite to only use canVote prop
**Before:** CandidateCard recalculated its own `canVote` from individual props like `isRegistered`, `electionStarted`, etc.

**After:** CandidateCard receives ONLY `canVote` as a prop and uses it directly:
```javascript
const CandidateCard = ({
  candidate,
  canVote,  // Received as prop, not calculated locally
  onVote,
  // ... other display props
}) => {
  console.log("CandidateCard canVote:", canVote);
  
  // If canVote is true: show "Eligible" badge and "Cast Your Vote" button
  // If canVote is false: show "Not Eligible" badge and "Voting Unavailable"
};
```

### 4. CandidateList.js - Pass only canVote to CandidateCard
Removed all extra props (`electionStarted`, `electionEnded`, `hasVoted`, `isRegistered`) and only passes `canVote` to each `CandidateCard`.

### 5. App.js - Remove duplicate state
Removed local `voterInfo` state and now uses the value directly from `useElection` hook.

## Files Modified
1. `devote-ui/src/hooks/useElection.js` - Changed default values to null
2. `devote-ui/src/components/ElectionDashboard.js` - Added eligibilityReady guard, stable canVote calculation
3. `devote-ui/src/components/CandidateCard.js` - Complete rewrite to only use canVote prop
4. `devote-ui/src/components/CandidateList.js` - Simplified to only pass canVote
5. `devote-ui/src/App.js` - Removed duplicate voterInfo state

## Expected Result
- ✅ Page stops shaking
- ✅ Eligibility does not flip between states
- ✅ Candidate buttons remain stable ("Cast Your Vote" or "Voting Unavailable")
- ✅ When registered=true, started=true, ended=false, voted=false → canVote stays true
- ✅ ALL candidates show the same eligibility status
- ✅ Debug logs show stable FINAL ELIGIBILITY STATE and CandidateCard canVote values
- ✅ No "Not Registered" badges on candidate cards when voter IS registered