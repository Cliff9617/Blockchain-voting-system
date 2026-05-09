import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { ethers } from 'ethers';
import config from '../config';

const AdminVoterVerification = () => {
  const [pendingVoters, setPendingVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch pending voters from Firestore
  const fetchPendingVoters = async () => {
    try {
      setLoading(true);
      const votersRef = collection(db, 'voterRegistrationRequests');
      const q = query(votersRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);
      
      const voters = [];
      querySnapshot.forEach((doc) => {
        voters.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setPendingVoters(voters);
    } catch (error) {
      console.error('Error fetching pending voters:', error);
      showNotification('Error fetching pending voters', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVoters();
  }, []);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Approve voter
  const approveVoter = async (voter) => {
    const voterId = voter.id;
    setActionLoading(prev => ({ ...prev, [voterId]: true }));

    console.log('[AdminVoterVerification] APPROVING REQUEST DATA:', voter);
    console.log('[AdminVoterVerification] PIN VALUE:', voter.pin);

    try {
      // Check for required fields
      if (!voter.walletAddress) {
        throw new Error("Missing wallet address");
      }

      const pinValue = voter.pin || voter.votingPin || voter.voterPin || '';
      if (!pinValue) {
        alert("Cannot approve voter because PIN is missing. Ask voter to register again.");
        setActionLoading(prev => ({ ...prev, [voterId]: false }));
        return;
      }

      // Step 1: Create/update voter document in voters collection FIRST
      const voterDocId = voter.walletAddress.toLowerCase();
      const voterData = {
        fullName: voter.fullName,
        idNumber: voter.idNumber,
        walletAddress: voter.walletAddress,
        county: voter.county,
        constituency: voter.constituency,
        ward: voter.ward,
        pin: pinValue,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        sourceRequestId: voterId,
        createdAt: voter.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('[AdminVoterVerification] Creating voter document in voters collection:', voterDocId);
      console.log('[AdminVoterVerification] Voter data:', voterData);

      try {
        await setDoc(doc(db, 'voters', voterDocId), voterData, { merge: true });
        console.log('VOTER COPY SUCCESS:', voterDocId);
      } catch (votersError) {
        console.error('[AdminVoterVerification] Failed to copy voter to voters collection:', votersError);
        alert("Failed to copy voter to voters collection: " + votersError.message);
        throw votersError; // Re-throw to prevent status update
      }

      // Step 2: Update voterRegistrationRequests status to approved ONLY AFTER voters setDoc succeeds
      const voterRef = doc(db, 'voterRegistrationRequests', voterId);
      await updateDoc(voterRef, {
        status: 'approved',
        approvedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      console.log('[AdminVoterVerification] Registration request updated to approved:', voterId);

      // Step 3: Call blockchain registerVoter function if wallet is connected
      try {
        if (window.ethereum && voter.walletAddress && config.contractAddress) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const contract = new ethers.Contract(config.contractAddress, config.contractABI, signer);
          
          // Check if voter is already registered on-chain first
          const normalizedAddress = voter.walletAddress.toLowerCase();
          console.log('[AdminVoterVerification] Checking blockchain registration for:', normalizedAddress);
          
          try {
            // Use getVoterInfo to check registration status
            const voterInfo = await contract.getVoterInfo(normalizedAddress);
            const isRegistered = Array.isArray(voterInfo) ? voterInfo[0] : voterInfo?.isRegistered;
            
            if (isRegistered) {
              console.log('[AdminVoterVerification] Voter already registered on-chain, skipping:', normalizedAddress);
            } else {
              console.log('[AdminVoterVerification] Registering voter on blockchain:', normalizedAddress);
              const tx = await contract.registerVoter(normalizedAddress);
              await tx.wait();
              console.log('Voter registered on blockchain:', normalizedAddress);
            }
          } catch (registrationError) {
            const errorMsg = String(registrationError.message || registrationError);
            if (errorMsg.includes('already registered') || errorMsg.includes('Voter already registered')) {
              console.log('[AdminVoterVerification] Voter already registered on-chain (caught in registration):', normalizedAddress);
            } else {
              throw registrationError;
            }
          }
        }
      } catch (blockchainError) {
        console.warn('[AdminVoterVerification] Blockchain registration warning:', blockchainError.message);
        // Don't fail the entire operation if blockchain call fails
        // The voter is already approved in Firestore, which is the important part
      }

      showNotification('Voter approved successfully!', 'success');
      fetchPendingVoters(); // Refresh the list
    } catch (error) {
      console.error('Error approving voter:', error);
      showNotification('Error approving voter: ' + error.message, 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [voterId]: false }));
    }
  };

  // Reject voter
  const rejectVoter = async (voter) => {
    const voterId = voter.id;
    setActionLoading(prev => ({ ...prev, [voterId]: true }));

    try {
      // Update Firestore status to rejected
      const voterRef = doc(db, 'voterRegistrationRequests', voterId);
      await updateDoc(voterRef, {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectionReason: voter.rejectionReason || 'Admin rejection'
      });

      showNotification('Voter rejected successfully!', 'success');
      fetchPendingVoters(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting voter:', error);
      showNotification('Error rejecting voter: ' + error.message, 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [voterId]: false }));
    }
  };

  // Open modal for image preview
  const openImageModal = (voter, imageType) => {
    const imageData = imageType === 'id' ? voter.idPhotoBase64 : voter.selfieBase64;
    const imageLabel = imageType === 'id' ? 'ID Photo' : 'Selfie';
    setSelectedVoter({ 
      image: imageData, 
      label: imageLabel, 
      name: voter.fullName 
    });
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedVoter(null);
  };

  // Format date - safely handle Firestore timestamps
  const formatDate = (dateData) => {
    if (!dateData) return 'Unknown date';
    
    let dateObj;
    // Check if it's a Firestore Timestamp with toDate() method
    if (dateData && typeof dateData.toDate === 'function') {
      dateObj = dateData.toDate();
    } else if (dateData instanceof Date) {
      dateObj = dateData;
    } else {
      // Try to parse as string or number
      dateObj = new Date(dateData);
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Unknown date';
    }
    
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return 'N/A';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Voter Verification Requests
        </h2>
        <button
          onClick={fetchPendingVoters}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refresh List
        </button>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`mb-4 p-4 rounded ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading pending voters...</p>
        </div>
      ) : pendingVoters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No pending voter verification requests.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voter Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingVoters.map((voter) => (
                <tr key={voter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{voter.fullName}</div>
                    <div className="text-sm text-gray-500">
                      Registered: {formatDate(voter.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{voter.idNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {truncateAddress(voter.walletAddress)}
                    </div>
                    {voter.walletAddress && (
                      <a
                        href={`https://sepolia.etherscan.io/address/${voter.walletAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        View on Etherscan
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{voter.county}</div>
                    <div className="text-sm text-gray-500">
                      {voter.constituency}, {voter.ward}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-3">
                      {/* National ID Photo */}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-600 mb-1">National ID Photo</span>
                        {voter.idPhotoBase64 ? (
                          <div className="relative">
                            <img
                              src={voter.idPhotoBase64}
                              alt="National ID Photo"
                              className="w-24 h-24 object-cover rounded border border-gray-300 cursor-pointer hover:border-blue-500 transition-colors"
                              onClick={() => openImageModal(voter, 'id')}
                              title="Click to enlarge"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 border border-gray-300 rounded">
                            <span className="text-xs text-gray-400 text-center px-1">Image not available</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Live Selfie */}
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-600 mb-1">Live Selfie</span>
                        {voter.selfieBase64 ? (
                          <div className="relative">
                            <img
                              src={voter.selfieBase64}
                              alt="Live Selfie"
                              className="w-24 h-24 object-cover rounded border border-gray-300 cursor-pointer hover:border-blue-500 transition-colors"
                              onClick={() => openImageModal(voter, 'selfie')}
                              title="Click to enlarge"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 border border-gray-300 rounded">
                            <span className="text-xs text-gray-400 text-center px-1">Image not available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => approveVoter(voter)}
                        disabled={actionLoading[voter.id]}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading[voter.id] ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => rejectVoter(voter)}
                        disabled={actionLoading[voter.id]}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading[voter.id] ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Preview Modal */}
      {modalOpen && selectedVoter && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedVoter.label} - {selectedVoter.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="text-center">
                <img
                  src={selectedVoter.image}
                  alt={selectedVoter.label}
                  className="max-w-full max-h-[70vh] object-contain mx-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVoterVerification;