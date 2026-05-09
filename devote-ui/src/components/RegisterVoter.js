import React, { useState } from "react";

const RegisterVoter = ({ isLoading, onRegisterVoter }) => {
  const [voterAddress, setVoterAddress] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleRegister = async () => {
    if (!voterAddress.trim()) {
      setStatus("Please enter a wallet address");
      setStatusType("error");
      return;
    }

    try {
      setStatus("Waiting for MetaMask confirmation...");
      setStatusType("pending");

      await onRegisterVoter(voterAddress.trim());

      setStatus("Voter registered successfully");
      setStatusType("success");
      setVoterAddress("");
    } catch (err) {
      console.error("Register voter UI error:", err);
      setStatus(err.message || "Failed to register voter");
      setStatusType("error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Register Single Voter</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wallet Address
          </label>
          <input
            type="text"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            placeholder="0x1234567890123456789012345678901234567890"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter the wallet address of the voter you want to register
          </p>
        </div>

        <button
          onClick={handleRegister}
          disabled={isLoading || !voterAddress.trim()}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            "Register Voter"
          )}
        </button>

        {status && (
          <div
            className={`p-3 rounded-lg ${
              statusType === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : statusType === "pending"
                ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <p className="text-sm">{status}</p>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Note:</h4>
        <p className="text-sm text-blue-700">
          Registered voters will be able to participate in the election once it starts.
          Each wallet address can only be registered once.
        </p>
      </div>
    </div>
  );
};

export default RegisterVoter;