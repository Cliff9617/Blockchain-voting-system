/**
 * Election Filters Utility for DeVote
 * Handles candidate visibility and results filtering based on voter registration area
 * 
 * Position-based filtering rules:
 * - President: Show all candidates nationally (no geographical restriction)
 * - Governor, Senator, Woman Representative: Show only candidates from voter's registered county
 * - Member of Parliament: Show only candidates from voter's registered constituency
 * - MCA: Show only candidates from voter's registered ward
 */

/**
 * Position constants matching smart contract enum
 */
export const POSITIONS = {
  PRESIDENT: 'president',
  GOVERNOR: 'governor',
  SENATOR: 'senator',
  WOMAN_REPRESENTATIVE: 'woman representative',
  MEMBER_OF_PARLIAMENT: 'member of parliament',
  MCA: 'mca'
};

export const POSITION_INDEX = {
  0: POSITIONS.PRESIDENT,
  1: POSITIONS.GOVERNOR,
  2: POSITIONS.SENATOR,
  3: POSITIONS.WOMAN_REPRESENTATIVE,
  4: POSITIONS.MEMBER_OF_PARLIAMENT,
  5: POSITIONS.MCA
};

export const POSITION_NAMES = {
  [POSITIONS.PRESIDENT]: 'President',
  [POSITIONS.GOVERNOR]: 'Governor',
  [POSITIONS.SENATOR]: 'Senator',
  [POSITIONS.WOMAN_REPRESENTATIVE]: 'Woman Representative',
  [POSITIONS.MEMBER_OF_PARLIAMENT]: 'Member of Parliament',
  [POSITIONS.MCA]: 'MCA'
};

/**
 * Normalize text for comparison (lowercase, trim, remove extra spaces)
 * @param {string} value - The value to normalize
 * @returns {string} - Normalized text
 */
export const normalizeText = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
};

/**
 * Normalize position name for consistent comparison
 * @param {string|number} position - The position to normalize (can be string or number index)
 * @returns {string} - Normalized position
 */
export const normalizePosition = (position) => {
  if (typeof position === 'number') {
    return POSITION_INDEX[position] || 'unknown';
  }
  
  const normalized = normalizeText(position);
  
  // Map common variations to standard names
  const positionMap = {
    'president': POSITIONS.PRESIDENT,
    'presidential': POSITIONS.PRESIDENT,
    'governor': POSITIONS.GOVERNOR,
    'gubernatorial': POSITIONS.GOVERNOR,
    'senator': POSITIONS.SENATOR,
    'senate': POSITIONS.SENATOR,
    'woman representative': POSITIONS.WOMAN_REPRESENTATIVE,
    'womanrep': POSITIONS.WOMAN_REPRESENTATIVE,
    'women rep': POSITIONS.WOMAN_REPRESENTATIVE,
    'member of parliament': POSITIONS.MEMBER_OF_PARLIAMENT,
    'mp': POSITIONS.MEMBER_OF_PARLIAMENT,
    'parliament': POSITIONS.MEMBER_OF_PARLIAMENT,
    'member of county assembly': POSITIONS.MCA,
    'mca': POSITIONS.MCA,
    'county assembly': POSITIONS.MCA,
  };
  
  return positionMap[normalized] || normalized;
};

/**
 * Get position index from position name
 * @param {string} position - Position name
 * @returns {number} - Position index (0-5)
 */
export const getPositionIndex = (position) => {
  const normalized = normalizePosition(position);
  const reverseMap = {
    [POSITIONS.PRESIDENT]: 0,
    [POSITIONS.GOVERNOR]: 1,
    [POSITIONS.SENATOR]: 2,
    [POSITIONS.WOMAN_REPRESENTATIVE]: 3,
    [POSITIONS.MEMBER_OF_PARLIAMENT]: 4,
    [POSITIONS.MCA]: 5,
  };
  return reverseMap[normalized] ?? -1;
};

/**
 * Check if a candidate matches the voter's registered area based on position
 * @param {Object} candidate - Candidate object with position, county, constituency, ward
 * @param {Object} voter - Voter object with county, constituency, ward
 * @returns {boolean} - True if candidate is visible to voter
 * 
 * Filtering rules:
 * - President: Always visible (national position)
 * - Governor, Senator, Woman Rep: Visible if candidate's county matches voter's county
 * - MP: Visible if candidate's constituency matches voter's constituency
 * - MCA: Visible if candidate's ward matches voter's ward
 */
export const candidateMatchesVoterArea = (candidate, voter) => {
  // If no voter data, only show President candidates
  if (!voter) {
    const position = normalizePosition(candidate.position);
    return position === POSITIONS.PRESIDENT;
  }

  const candidatePosition = normalizePosition(candidate.position);
  const candidateCounty = normalizeText(candidate.county);
  const candidateConstituency = normalizeText(candidate.constituency);
  const candidateWard = normalizeText(candidate.ward);
  
  const voterCounty = normalizeText(voter.county);
  const voterConstituency = normalizeText(voter.constituency);
  const voterWard = normalizeText(voter.ward);

  console.log('[candidateMatchesVoterArea] Checking:', {
    candidateName: candidate.name,
    candidatePosition,
    candidateCounty,
    candidateConstituency,
    candidateWard,
    voterCounty,
    voterConstituency,
    voterWard
  });

  switch (candidatePosition) {
    case POSITIONS.PRESIDENT:
      // President is national - always visible
      console.log('[candidateMatchesVoterArea] President - always visible');
      return true;

    case POSITIONS.GOVERNOR:
    case POSITIONS.SENATOR:
    case POSITIONS.WOMAN_REPRESENTATIVE:
      // County-level positions - check county match
      const countyMatch = candidateCounty === voterCounty;
      console.log(`[candidateMatchesVoterArea] ${candidatePosition} - county match: ${countyMatch}`);
      return countyMatch;

    case POSITIONS.MEMBER_OF_PARLIAMENT:
      // Constituency-level position - check constituency match
      const constituencyMatch = candidateConstituency === voterConstituency;
      console.log(`[candidateMatchesVoterArea] ${candidatePosition} - constituency match: ${constituencyMatch}`);
      return constituencyMatch;

    case POSITIONS.MCA:
      // Ward-level position - check ward match
      const wardMatch = candidateWard === voterWard;
      console.log(`[candidateMatchesVoterArea] ${candidatePosition} - ward match: ${wardMatch}`);
      return wardMatch;

    default:
      console.log('[candidateMatchesVoterArea] Unknown position - not visible');
      return false;
  }
};

/**
 * Filter candidates based on voter's registered area
 * @param {Array} candidates - Array of candidate objects
 * @param {Object} voter - Voter object with county, constituency, ward
 * @returns {Array} - Filtered candidates visible to voter
 */
export const filterCandidatesForVoter = (candidates, voter) => {
  console.log('[filterCandidatesForVoter] Input:', {
    totalCandidates: candidates?.length || 0,
    voter
  });

  if (!candidates || !candidates.length) return [];
  
  const filtered = candidates.filter(candidate => 
    candidateMatchesVoterArea(candidate, voter)
  );

  console.log('[filterCandidatesForVoter] Filtered result:', {
    filteredCount: filtered.length,
    filteredPositions: [...new Set(filtered.map(c => normalizePosition(c.position)))]
  });

  return filtered;
};

/**
 * Filter results (candidates with vote counts) based on voter's area
 * @param {Array} candidates - Array of candidate objects with vote counts
 * @param {Object} voter - Voter object with county, constituency, ward
 * @returns {Array} - Filtered results visible to voter
 */
export const filterResultsForVoter = (candidates, voter) => {
  console.log('[filterResultsForVoter] Input:', {
    totalCandidates: candidates?.length || 0,
    voter
  });

  const filtered = filterCandidatesForVoter(candidates, voter);
  
  console.log('[filterResultsForVoter] Result:', {
    filteredCount: filtered.length
  });

  return filtered;
};

/**
 * Group candidates by their position
 * @param {Array} candidates - Array of candidate objects
 * @returns {Object} - Object with position as key and array of candidates as value
 */
export const groupCandidatesByPosition = (candidates) => {
  if (!candidates || !candidates.length) return {};

  const grouped = {};
  
  // Initialize all positions
  Object.values(POSITIONS).forEach(pos => {
    grouped[pos] = [];
  });
  
  candidates.forEach(candidate => {
    const position = normalizePosition(candidate.position);
    if (grouped[position]) {
      grouped[position].push(candidate);
    } else {
      // Unknown position - put in unknown group
      if (!grouped['unknown']) grouped['unknown'] = [];
      grouped['unknown'].push(candidate);
    }
  });

  return grouped;
};

/**
 * Get position display name
 * @param {string} position - Normalized position
 * @returns {string} - Display name for the position
 */
export const getPositionDisplayName = (position) => {
  const normalized = normalizePosition(position);
  return POSITION_NAMES[normalized] || position;
};

/**
 * Get position tab counts for filtered candidates
 * @param {Array} candidates - Filtered candidates
 * @returns {Object} - Object with position counts
 */
export const getPositionCounts = (candidates) => {
  const grouped = groupCandidatesByPosition(candidates);
  const counts = {};
  
  Object.values(POSITIONS).forEach(pos => {
    counts[pos] = (grouped[pos] || []).length;
  });
  
  return counts;
};

/**
 * Get candidates for a specific position
 * @param {Array} candidates - Array of candidate objects
 * @param {string} position - Position to filter by
 * @returns {Array} - Candidates for the specified position
 */
export const getCandidatesForPosition = (candidates, position) => {
  if (!candidates || !candidates.length) return [];
  
  const normalized = normalizePosition(position);
  return candidates.filter(c => normalizePosition(c.position) === normalized);
};

/**
 * Calculate winners for each position
 * @param {Array} candidates - Array of candidate objects with vote counts
 * @param {Object} voter - Voter object for geographical filtering (optional)
 * @returns {Object} - Object with position as key and winner info as value
 */
export const calculateWinnersByPosition = (candidates, voter = null) => {
  const filteredCandidates = voter ? filterCandidatesForVoter(candidates, voter) : candidates;
  const grouped = groupCandidatesByPosition(filteredCandidates);
  const winners = {};

  Object.entries(grouped).forEach(([position, posCandidates]) => {
    if (!posCandidates || posCandidates.length === 0) {
      winners[position] = null;
      return;
    }

    // Sort by vote count descending
    const sorted = [...posCandidates].sort((a, b) => {
      const votesA = Number(a.voteCount || a.votes || 0);
      const votesB = Number(b.voteCount || b.votes || 0);
      return votesB - votesA;
    });

    const totalVotes = sorted.reduce((sum, c) => sum + Number(c.voteCount || c.votes || 0), 0);
    
    // Check for tie at the top
    const topVotes = Number(sorted[0].voteCount || sorted[0].votes || 0);
    const tiedCandidates = sorted.filter(c => 
      Number(c.voteCount || c.votes || 0) === topVotes
    );

    if (tiedCandidates.length > 1 && topVotes > 0) {
      // Tie situation
      winners[position] = {
        isTie: true,
        tiedCandidates: tiedCandidates.map(c => ({
          ...c,
          percentage: totalVotes > 0 ? ((Number(c.voteCount || c.votes || 0) / totalVotes) * 100).toFixed(1) : '0.0'
        })),
        votes: topVotes,
      };
    } else {
      // Clear winner
      const winner = sorted[0];
      winners[position] = {
        isTie: false,
        winner: {
          ...winner,
          percentage: totalVotes > 0 ? ((Number(winner.voteCount || winner.votes || 0) / totalVotes) * 100).toFixed(1) : '0.0'
        },
        votes: topVotes,
      };
    }
  });

  return winners;
};

/**
 * Get area description for winner display based on position
 * @param {string} position - Position name
 * @param {Object} candidate - Candidate object with geographical data
 * @returns {string} - Area description for display
 */
export const getWinnerAreaDescription = (position, candidate) => {
  const normalized = normalizePosition(position);
  
  switch (normalized) {
    case POSITIONS.PRESIDENT:
      return 'Kenya (National)';
    case POSITIONS.GOVERNOR:
      return `${candidate.county || ''} County`;
    case POSITIONS.SENATOR:
      return `${candidate.county || ''} County (Senate)`;
    case POSITIONS.WOMAN_REPRESENTATIVE:
      return `${candidate.county || ''} County (Women Rep)`;
    case POSITIONS.MEMBER_OF_PARLIAMENT:
      return `${candidate.constituency || ''} Constituency`;
    case POSITIONS.MCA:
      return `${candidate.ward || ''} Ward, ${candidate.constituency || ''}`;
    default:
      return 'National';
  }
};

export default {
  normalizeText,
  normalizePosition,
  getPositionIndex,
  candidateMatchesVoterArea,
  filterCandidatesForVoter,
  filterResultsForVoter,
  groupCandidatesByPosition,
  getPositionDisplayName,
  getPositionCounts,
  getCandidatesForPosition,
  calculateWinnersByPosition,
  getWinnerAreaDescription,
  POSITIONS,
  POSITION_INDEX,
  POSITION_NAMES,
};