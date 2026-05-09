import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_NETWORK } from "../config";

const useContract = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState("");

  const resetConnection = useCallback(() => {
    setAccount(null);
    setContract(null);
    setIsConnected(false);
  }, []);

  const switchToSepolia = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_NETWORK.chainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [SEPOLIA_NETWORK],
        });
      } else {
        throw new Error("Failed to switch to Sepolia network");
      }
    }
  }, []);

  const buildConnection = useCallback(async (selectedAccount) => {
    if (!window.ethereum) {
      throw new Error("MetaMask not detected");
    }

    if (!selectedAccount) {
      throw new Error("No account selected");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);
    const signerAddress = await signer.getAddress();

    console.log("window.ethereum.selectedAddress:", window.ethereum?.selectedAddress);
    console.log("selectedAccount:", selectedAccount);
    console.log("signer.getAddress():", signerAddress);

    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setAccount(selectedAccount);
    setContract(contractInstance);
    setIsConnected(true);
    setNetworkError("");

    return {
      provider,
      signer,
      contractInstance,
      signerAddress,
    };
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    setIsLoading(true);
    setNetworkError("");

    try {
      await switchToSepolia();

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("eth_requestAccounts result:", accounts);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const selectedAccount = accounts[0];
      await buildConnection(selectedAccount);

      console.log("Connected account stored in state:", selectedAccount);
    } catch (err) {
      console.error("Connection error:", err);
      setNetworkError(err?.message || "Failed to connect wallet");
      resetConnection();
    } finally {
      setIsLoading(false);
    }
  }, [buildConnection, resetConnection, switchToSepolia]);

  const disconnectWallet = useCallback(() => {
    resetConnection();
    setNetworkError("");
  }, [resetConnection]);

  const handleAccountsChanged = useCallback(
    async (accounts) => {
      console.log("accountsChanged:", accounts);

      if (!accounts || accounts.length === 0) {
        console.log("No accounts found. Disconnecting.");
        disconnectWallet();
        return;
      }

      try {
        setIsLoading(true);
        setNetworkError("");

        const selectedAccount = accounts[0];
        await buildConnection(selectedAccount);

        console.log("Account changed to:", selectedAccount);
      } catch (err) {
        console.error("Failed to handle account change:", err);
        setNetworkError(err?.message || "Failed to switch account");
        resetConnection();
      } finally {
        setIsLoading(false);
      }
    },
    [buildConnection, disconnectWallet, resetConnection]
  );

  const handleChainChanged = useCallback(
    async (chainId) => {
      console.log("Chain changed to:", chainId);
      console.log("Expected Sepolia chain ID:", SEPOLIA_NETWORK.chainId);

      if (chainId !== SEPOLIA_NETWORK.chainId) {
        setNetworkError("Please switch back to Sepolia Testnet");
        resetConnection();
        return;
      }

      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        console.log("eth_accounts after chain change:", accounts);

        if (accounts && accounts.length > 0) {
          await buildConnection(accounts[0]);
        } else {
          resetConnection();
        }

        setNetworkError("");
      } catch (err) {
        console.error("Failed after chain change:", err);
        setNetworkError(err?.message || "Failed to reconnect on Sepolia");
        resetConnection();
      }
    },
    [buildConnection, resetConnection]
  );

  useEffect(() => {
    if (!window.ethereum) return undefined;

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [handleAccountsChanged, handleChainChanged]);

  return {
    account,
    contract,
    isConnected,
    isLoading,
    networkError,
    connectWallet,
    disconnectWallet,
  };
};

export default useContract;