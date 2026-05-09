import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

const useAdmin = (contract, account) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAddress, setAdminAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const checkAdmin = useCallback(async () => {
    console.log("🔍 Checking admin status...");
    console.log("Contract instance exists:", !!contract);
    console.log("Connected account:", account);
    console.log("Account type:", typeof account);

    if (!contract || !account) {
      console.log("❌ Missing contract or account, setting isAdmin to false");
      setIsAdmin(false);
      setError("");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("📋 Fetching admin address from contract...");
      const fetchedAdminAddress = await contract.admin();
      console.log("📋 Admin address from contract:", fetchedAdminAddress);
      console.log("📋 Admin address type:", typeof fetchedAdminAddress);

      const normalizedAdmin = String(fetchedAdminAddress).toLowerCase().trim();
      const normalizedAccount = String(account).toLowerCase().trim();

      console.log("🔧 Normalized admin:", normalizedAdmin);
      console.log("🔧 Normalized account:", normalizedAccount);

      const currentIsAdmin = normalizedAdmin === normalizedAccount;

      console.log("🎯 Final admin check result:", currentIsAdmin);
      console.log("🎯 Admin address:", fetchedAdminAddress);
      console.log("🎯 Connected account:", account);
      console.log("🎯 Comparison: admin.toLowerCase() === account.toLowerCase() =", currentIsAdmin);

      setAdminAddress(fetchedAdminAddress);
      setIsAdmin(currentIsAdmin);
      return currentIsAdmin;
    } catch (err) {
      console.error("❌ Failed to check admin:", err);
      console.error("❌ Error details:", err.message, err.code, err.data);

      setIsAdmin(false);
      setError(err?.message || "Failed to verify admin status");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [contract, account]);

  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  return {
    isAdmin,
    adminAddress,
    isLoading,
    error,
    checkAdmin,
  };
};

export default useAdmin;
