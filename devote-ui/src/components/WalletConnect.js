import React from 'react';

const WalletConnect = ({ 
  account, 
  isConnected, 
  isLoading, 
  networkError, 
  connectWallet, 
  disconnectWallet 
}) => {
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnect = async () => {
    if (isLoading) return;
    await connectWallet();
  };

  const handleDisconnect = async () => {
    if (isLoading) return;
    await disconnectWallet();
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">🦊</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Wallet Connection</h2>
            <p className="text-gray-600">
              Connect your MetaMask wallet to participate in the election
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          {networkError && (
            <div className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full border border-red-200">
              Network Error
            </div>
          )}
          
          {isConnected ? (
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-semibold text-green-900 text-lg">Connected</p>
                    <p className="text-green-700 font-mono text-sm">{formatAddress(account)}</p>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors font-medium"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 focus-ring text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                '🦊 Connect MetaMask'
              )}
            </button>
          )}
        </div>
      </div>

      {!window.ethereum && !isConnected && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <h4 className="font-medium text-yellow-800">MetaMask Not Detected</h4>
              <p className="text-sm text-yellow-700">
                Please install MetaMask to use this application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;