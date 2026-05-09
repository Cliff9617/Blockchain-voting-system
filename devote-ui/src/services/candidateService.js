import { collection, getDocs, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CANDIDATE_PROFILES_COLLECTION = 'candidates';

/**
 * Get all candidate profiles from Firestore
 * @returns {Promise<Array>} Array of candidate profile objects
 */
export const getAllCandidateProfiles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, CANDIDATE_PROFILES_COLLECTION));
    const profiles = [];
    
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return profiles;
  } catch (error) {
    console.error('Error fetching candidate profiles:', error);
    throw new Error('Failed to fetch candidate profiles');
  }
};

/**
 * Save a candidate profile to Firestore
 * @param {Object} candidateData - Candidate profile data
 * @param {number} candidateData.blockchainId - Blockchain candidate ID
 * @param {string} candidateData.name - Candidate name
 * @param {string} candidateData.party - Candidate party
 * @param {string} candidateData.candidateCode - Candidate code
 * @param {string} candidateData.position - Position (President, Governor, etc.)
 * @param {string} candidateData.county - County
 * @param {string} candidateData.constituency - Constituency
 * @param {string} candidateData.ward - Ward
 * @param {string} candidateData.location - Location level (National, County, Constituency, Ward)
 * @param {string} candidateData.pollingCenterName - Polling center name
 * @param {string} candidateData.pollingStationName - Polling station name
 * @param {string} candidateData.imageUrl - Image URL
 * @param {number} candidateData.voteCount - Vote count (default: 0)
 * @param {boolean} candidateData.isActive - Is candidate active (default: true)
 * @returns {Promise<string>} Document ID of the created profile
 */
export const saveCandidateProfile = async (candidateData) => {
  try {
    console.log('[candidateService] Saving candidate profile:', candidateData);
    
    const profileData = {
      blockchainId: Number(candidateData.blockchainId),
      name: candidateData.name,
      party: candidateData.party || '',
      candidateCode: candidateData.candidateCode || '',
      position: candidateData.position || '',
      county: candidateData.county || '',
      constituency: candidateData.constituency || '',
      ward: candidateData.ward || '',
      location: candidateData.location || '',
      pollingCenterName: candidateData.pollingCenterName || '',
      pollingStationName: candidateData.pollingStationName || '',
      imageUrl: candidateData.imageUrl || '',
      voteCount: candidateData.voteCount ?? 0,
      isActive: candidateData.isActive ?? true,
      createdAt: candidateData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('[candidateService] Profile data to save:', profileData);
    
    const docRef = await addDoc(collection(db, CANDIDATE_PROFILES_COLLECTION), profileData);
    
    console.log('[candidateService] Candidate profile saved with doc ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('[candidateService] Error saving candidate profile:', error);
    console.error('[candidateService] Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    throw new Error('Failed to save candidate profile');
  }
};

/**
 * Get a candidate profile by blockchain ID
 * @param {string} blockchainId - Blockchain candidate ID
 * @returns {Promise<Object|null>} Candidate profile or null if not found
 */
export const getCandidateProfileByBlockchainId = async (blockchainId) => {
  try {
    const querySnapshot = await getDocs(collection(db, CANDIDATE_PROFILES_COLLECTION));
    let profile = null;
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.blockchainId === blockchainId) {
        profile = {
          id: doc.id,
          ...data
        };
      }
    });
    
    return profile;
  } catch (error) {
    console.error('Error fetching candidate profile by blockchain ID:', error);
    throw new Error('Failed to fetch candidate profile');
  }
};

/**
 * Update a candidate profile in Firestore
 * @param {string} profileId - Firestore document ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateCandidateProfile = async (profileId, updates) => {
  try {
    const profileRef = doc(db, CANDIDATE_PROFILES_COLLECTION, profileId);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating candidate profile:', error);
    throw new Error('Failed to update candidate profile');
  }
};