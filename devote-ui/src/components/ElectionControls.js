import React from 'react';

const ElectionControls = ({ 
  contract, 
  electionStarted, 
  electionEnded, 
  isLoading, 
  onStartElection, 
  onEndElection 
}) => {

  const handleStartElection = async () => {
    try {
      await onStartElection();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEndElection = async () => {
    try {
      await onEndElection();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Election Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Start Election */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-hard">
                <span className="text-white text-xl font-bold">▶️</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-900">Start Election</h4>
                <p className="text-sm text-green-600">Begin the voting process</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-green-700 mb-4">
            Once started, voters can cast their votes. Candidates cannot be added after this point.
          </p>
          
          <button
            onClick={handleStartElection}
            disabled={isLoading || electionStarted || electionEnded}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              electionStarted || electionEnded
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Starting...</span>
              </div>
            ) : electionStarted ? (
              "Election Active"
            ) : electionEnded ? (
              "Election Ended"
            ) : (
              "Start Election"
            )}
          </button>
        </div>

        {/* End Election */}
        <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-hard">
                <span className="text-white text-xl font-bold">⏹️</span>
              </div>
              <div>
                <h4 className="font-semibold text-red-900">End Election</h4>
                <p className="text-sm text-red-600">Close voting and finalize results</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-red-700 mb-4">
            Once ended, voting is closed and results become final. This action cannot be undone.
          </p>
          
          <button
            onClick={handleEndElection}
            disabled={isLoading || !electionStarted || electionEnded}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              !electionStarted || electionEnded
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Ending...</span>
              </div>
            ) : !electionStarted ? (
              "Start First"
            ) : electionEnded ? (
              "Election Ended"
            ) : (
              "End Election"
            )}
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Election Status</h4>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            !electionStarted && !electionEnded
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : electionStarted && !electionEnded
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${
              !electionStarted && !electionEnded ? 'bg-yellow-500' :
              electionStarted && !electionEnded ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            {!electionStarted && !electionEnded ? 'Not Started' : 
             electionStarted && !electionEnded ? 'Active' : 'Ended'}
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Voting</h4>
          <p className="text-sm text-purple-700">
            {electionStarted && !electionEnded 
              ? "Voting is open" 
              : !electionStarted 
                ? "Waiting to start" 
                : "Voting closed"}
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Candidates</h4>
          <p className="text-sm text-gray-700">
            {electionStarted && !electionEnded 
              ? "Locked - no changes allowed" 
              : "Can be modified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionControls;