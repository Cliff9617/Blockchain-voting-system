import React, { useState, useMemo } from "react";
import {
  groupCandidatesByPosition,
  filterCandidatesForVoter,
  getPositionDisplayName,
  POSITIONS,
} from "../utils/electionFilters";
import SimpleCandidateCard from "./SimpleCandidateCard";

/**
 * SimpleVotingInterface - Redesigned voting UI for maximum simplicity
 * 
 * Key features:
 * - Centered layout with max-width container
 * - Candidates grouped by position in order: President, Governor, Senator, Woman Rep, MP, MCA
 * - Clear section headings with voting instructions
 * - Large, simple candidate cards
 * - Vote confirmation modal
 * - Per-position voting status
 * - Mobile-friendly responsive design
 */

// Position order for display
const POSITION_ORDER = [
  POSITIONS.PRESIDENT,
  POSITIONS.GOVERNOR,
  POSITIONS.SENATOR,
  POSITIONS.WOMAN_REPRESENTATIVE,
  POSITIONS.MEMBER_OF_PARLIAMENT,
  POSITIONS.MCA,
];

// Section numbers for headings
const SECTION_NUMBERS = {
  [POSITIONS.PRESIDENT]: "1",
  [POSITIONS.GOVERNOR]: "2",
  [POSITIONS.SENATOR]: "3",
  [POSITIONS.WOMAN_REPRESENTATIVE]: "4",
  [POSITIONS.MEMBER_OF_PARLIAMENT]: "5",
  [POSITIONS.MCA]: "6",
};

// Confirmation Modal Component
const VoteConfirmationModal = ({ 
  isOpen, 
  candidate, 
  position, 
  onConfirm, 
  onCancel,
  isLoading 
}) => {
  if (!isOpen || !candidate) return null;

  const candidateName = candidate?.name || "this candidate";
  const positionDisplay = position ? getPositionDisplayName(position) : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Your Vote
          </h3>

          {/* Candidate Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-lg font-semibold text-gray-900 mb-1">
              {candidateName}
            </p>
            <p className="text-gray-600">
              {positionDisplay}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-yellow-800">
              ⚠️ This action cannot be undone. Your vote will be recorded on the blockchain.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Confirm Vote"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimpleVotingInterface = ({
  electionStarted = false,
  electionEnded = false,
  candidates = [],
  voter = null, // { county, constituency, ward }
  voterInfo = {},
  isLoading = false,
  error = "",
  onVote,
  hasVotedForPosition,
  canVoteForPosition,
  totalVotes = 0,
  getVotePercentage,
}) => {
  // State for vote confirmation
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    candidate: null,
    position: null,
  });
  const [isConfirming, setIsConfirming] = useState(false);

  // Defensive guards
  const safeCandidates = Array.isArray(candidates) ? candidates : [];
  const safeVoter = voter && typeof voter === 'object' ? voter : null;
  const safeVoterInfo = voterInfo && typeof voterInfo === 'object' ? voterInfo : {};
  const isRegistered = safeVoterInfo?.isRegistered;

  // Filter candidates based on voter location
  const filteredCandidates = useMemo(() => {
    return filterCandidatesForVoter(safeCandidates, safeVoter);
  }, [safeCandidates, safeVoter]);

  // Group candidates by position
  const candidatesByPosition = useMemo(() => {
    return groupCandidatesByPosition(filteredCandidates);
  }, [filteredCandidates]);

  // Get leading candidate IDs for highlighting
  const leadingCandidateIds = useMemo(() => {
    const leading = [];
    POSITION_ORDER.forEach(position => {
      const posCandidates = candidatesByPosition[position] || [];
      if (posCandidates.length > 0) {
        const sorted = [...posCandidates].sort((a, b) => {
          const votesA = Number(a.voteCount || 0);
          const votesB = Number(b.voteCount || 0);
          return votesB - votesA;
        });
        if (sorted[0] && Number(sorted[0].voteCount || 0) > 0) {
          leading.push(sorted[0].id ?? sorted[0].candidateId ?? sorted[0].index);
        }
      }
    });
    return leading;
  }, [candidatesByPosition]);

  // Check if voter has voted for a specific position
  const hasVotedForPos = (position) => {
    if (typeof hasVotedForPosition === 'function') {
      return hasVotedForPosition(position);
    }
    return false;
  };

  // Check if voter can vote for a specific position
  const canVoteForPos = (position) => {
    if (typeof canVoteForPosition === 'function') {
      return canVoteForPosition(position);
    }
    return Boolean(isRegistered) && Boolean(electionStarted) && !Boolean(electionEnded);
  };

  // Handle vote button click - show confirmation modal
  const handleVoteClick = (candidate, position) => {
    setConfirmModal({
      isOpen: true,
      candidate,
      position,
    });
  };

  // Handle vote confirmation
  const handleConfirmVote = async () => {
    if (!confirmModal.candidate) return;
    
    setIsConfirming(true);
    try {
      const candidateId = confirmModal.candidate.id ?? 
                         confirmModal.candidate.candidateId ?? 
                         confirmModal.candidate.index;
      await onVote(candidateId);
      setConfirmModal({ isOpen: false, candidate: null, position: null });
    } catch (err) {
      console.error("Vote failed:", err);
      alert("Failed to cast vote. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  // Handle modal cancel
  const handleCancelVote = () => {
    setConfirmModal({ isOpen: false, candidate: null, position: null });
  };

  // Render a position section
  const renderPositionSection = (position) => {
    const posCandidates = candidatesByPosition[position] || [];
    if (posCandidates.length === 0) return null;

    const positionDisplay = getPositionDisplayName(position);
    const sectionNumber = SECTION_NUMBERS[position];
    const hasVotedThisPosition = hasVotedForPos(position);
    const canVoteThisPosition = canVoteForPos(position);

    return (
      <div key={position} className="mb-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {sectionNumber}. Vote for {positionDisplay}
          </h2>
          {hasVotedThisPosition ? (
            <p className="text-green-600 font-semibold text-lg">
              ✅ You have already voted for {positionDisplay}
            </p>
          ) : canVoteThisPosition ? (
            <p className="text-gray-600 text-lg">
              Choose one candidate below
            </p>
          ) : !electionStarted ? (
            <p className="text-yellow-600 font-semibold text-lg">
              🕒 Waiting for election to start
            </p>
          ) : electionEnded ? (
            <p className="text-red-600 font-semibold text-lg">
              Election has ended
            </p>
          ) : (
            <p className="text-gray-500 text-lg">
              Voting not available for this position
            </p>
          )}
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posCandidates.map((candidate, index) => {
            const candidateId = candidate.id ?? candidate.candidateId ?? candidate.index ?? index;
            const voteCount = Number(candidate.voteCount || 0);
            // Calculate percentage - getVotePercentage may take 1 or 2 params
            const percentage = typeof getVotePercentage === 'function' 
              ? getVotePercentage(voteCount)
              : totalVotes > 0 
                ? Math.round((voteCount / totalVotes) * 100) 
                : 0;

            // Check if this candidate was voted for
            const votedForCandidate = hasVotedThisPosition && 
              safeVoterInfo?.votedFor === candidateId;

            // Check if leading
            const isLeading = leadingCandidateIds.includes(candidateId);

            return (
              <SimpleCandidateCard
                key={candidateId}
                candidate={candidate}
                hasVoted={hasVotedThisPosition}
                votedForCandidate={votedForCandidate}
                onVote={() => handleVoteClick(candidate, position)}
                isLoading={isLoading}
                isLeading={isLeading && !hasVotedThisPosition}
                canVote={canVoteThisPosition && !electionEnded}
                showVoteCount={electionEnded || electionStarted}
                voteCount={voteCount}
                percentage={percentage}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Cast Your Vote
            </h1>
            <p className="text-lg text-gray-600">
              Select your preferred candidates for each position
            </p>
          </div>

          {/* Voter Location Info */}
          {safeVoter && (
            <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-200 max-w-md mx-auto">
              <p className="text-sm text-blue-800 font-medium text-center">
                📍 Your voting area
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-blue-700">
                {safeVoter.county && (
                  <span><strong>County:</strong> {safeVoter.county}</span>
                )}
                {safeVoter.constituency && (
                  <span><strong>Constituency:</strong> {safeVoter.constituency}</span>
                )}
                {safeVoter.ward && (
                  <span><strong>Ward:</strong> {safeVoter.ward}</span>
                )}
              </div>
            </div>
          )}

          {/* Status Bar */}
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              electionEnded
                ? "bg-red-100 text-red-700 border border-red-200"
                : electionStarted
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
            }`}>
              {electionEnded ? "Election Ended" : electionStarted ? "Election Active" : "Not Started"}
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isRegistered
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
              {isRegistered ? "✓ Eligible Voter" : "✗ Not Registered"}
            </div>
            <div className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200">
              {totalVotes} Total Votes
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 font-medium">⚠️ {error}</p>
          </div>
        </div>
      )}

      {/* Not Registered Warning */}
      {!isRegistered && (
        <div className="max-w-6xl mx-auto px-4 mt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-semibold text-lg mb-2">
              ⚠️ You are not registered to vote
            </p>
            <p className="text-yellow-700">
              Only registered voters can participate. Contact the administrator if you believe this is an error.
            </p>
          </div>
        </div>
      )}

      {/* Main Voting Area */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* No candidates message */}
        {filteredCandidates.length === 0 && isRegistered && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Candidates Available
            </h3>
            <p className="text-gray-600">
              {safeVoter 
                ? "No candidates are contesting in your area yet."
                : "Candidates will be added by the election administrator."}
            </p>
          </div>
        )}

        {/* Position Sections */}
        {POSITION_ORDER.map(position => renderPositionSection(position))}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            Your votes are secured on the blockchain and cannot be changed once confirmed.
          </p>
        </div>
      </div>

      {/* Vote Confirmation Modal */}
      <VoteConfirmationModal
        isOpen={confirmModal.isOpen}
        candidate={confirmModal.candidate}
        position={confirmModal.position}
        onConfirm={handleConfirmVote}
        onCancel={handleCancelVote}
        isLoading={isConfirming}
      />
    </div>
  );
};

export default SimpleVotingInterface;