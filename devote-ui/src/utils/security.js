/**
 * Security Utilities for DeVote
 * Handles hashing and verification of sensitive data (PIN, National ID)
 * 
 * Security Rules:
 * - PIN must be 4-6 digits only
 * - Full name should be trimmed and converted to uppercase
 * - National ID should be stored as a hash, not raw text
 * - For display in admin dashboard, show masked ID only (e.g., ******78)
 */

import bcrypt from 'bcryptjs';

// Bcrypt salt rounds - higher = more secure but slower
const SALT_ROUNDS = 10;

/**
 * Validate that a PIN is 4-6 digits only
 * @param {string|number} pin - The PIN to validate
 * @returns {boolean} - True if valid
 */
export const validatePin = (pin) => {
  if (pin === null || pin === undefined) return false;
  const pinStr = String(pin).trim();
  return /^\d{4,6}$/.test(pinStr);
};

/**
 * Hash a PIN using bcrypt
 * @param {string|number} pin - The PIN to hash
 * @returns {Promise<string>} - The hashed PIN
 */
export const hashPin = async (pin) => {
  if (!validatePin(pin)) {
    throw new Error('Invalid PIN: must be 4-6 digits');
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(String(pin).trim(), salt);
};

/**
 * Verify a PIN against a hashed PIN
 * @param {string|number} pin - The PIN to verify
 * @param {string} hashedPin - The hashed PIN to compare against
 * @returns {Promise<boolean>} - True if PIN matches
 */
export const verifyPin = async (pin, hashedPin) => {
  if (!validatePin(pin)) {
    return false;
  }
  try {
    return bcrypt.compare(String(pin).trim(), hashedPin);
  } catch (error) {
    console.error('[Security] PIN verification error:', error.message);
    return false;
  }
};

/**
 * Hash a National ID using bcrypt
 * @param {string|number} nationalId - The National ID to hash
 * @returns {Promise<string>} - The hashed National ID
 */
export const hashNationalId = async (nationalId) => {
  if (nationalId === null || nationalId === undefined) {
    throw new Error('National ID is required');
  }
  const nationalIdStr = String(nationalId).trim();
  if (!/^\d{8}$/.test(nationalIdStr)) {
    throw new Error('Invalid National ID: must be 8 digits');
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(nationalIdStr, salt);
};

/**
 * Verify a National ID against a hashed National ID
 * @param {string|number} nationalId - The National ID to verify
 * @param {string} hashedNationalId - The hashed National ID to compare against
 * @returns {Promise<boolean>} - True if National ID matches
 */
export const verifyNationalId = async (nationalId, hashedNationalId) => {
  if (nationalId === null || nationalId === undefined) {
    return false;
  }
  const nationalIdStr = String(nationalId).trim();
  if (!/^\d{8}$/.test(nationalIdStr)) {
    return false;
  }
  try {
    return bcrypt.compare(nationalIdStr, hashedNationalId);
  } catch (error) {
    console.error('[Security] National ID verification error:', error.message);
    return false;
  }
};

/**
 * Normalize a full name by trimming and converting to uppercase
 * @param {string} name - The name to normalize
 * @returns {string} - Normalized name in uppercase
 */
export const normalizeFullName = (name) => {
  if (!name || typeof name !== 'string') return '';
  return name.trim().toUpperCase();
};

/**
 * Mask a National ID for display purposes
 * Shows only the last 2 digits, e.g., "******78"
 * @param {string|number} nationalId - The National ID to mask
 * @returns {string} - Masked National ID
 */
export const maskNationalId = (nationalId) => {
  if (nationalId === null || nationalId === undefined) return '******';
  const nationalIdStr = String(nationalId).trim();
  if (nationalIdStr.length <= 2) {
    return '**';
  }
  const visiblePart = nationalIdStr.slice(-2);
  const maskedLength = nationalIdStr.length - 2;
  return '*'.repeat(maskedLength) + visiblePart;
};

/**
 * Mask a National ID hash for display (shows last 2 chars of hash)
 * Used when only the hash is available
 * @param {string} hashedNationalId - The hashed National ID
 * @returns {string} - Masked representation
 */
export const maskNationalIdFromHash = (hashedNationalId) => {
  if (!hashedNationalId) return '******';
  // For hashed IDs, we can't extract the original, so we show a generic mask
  // The maskedNationalId should be stored separately during registration
  return '********';
};

/**
 * Validate password strength
 * Requirements:
 * - Minimum 10 characters
 * - Must contain uppercase letter
 * - Must contain lowercase letter
 * - Must contain number
 * - Must contain special character
 * @param {string} password - The password to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || typeof password !== 'string') {
    return { valid: false, errors: ['Password is required'] };
  }
  
  if (password.length < 10) {
    errors.push('Password must be at least 10 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Hash a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password) => {
  const validation = validatePassword(password);
  if (!validation.valid) {
    throw new Error(`Invalid password: ${validation.errors.join(', ')}`);
  }
  
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
 * Verify a password against a hashed password
 * @param {string} password - The password to verify
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if password matches
 */
export const verifyPassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return false;
  }
  
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error('[Security] Password verification error:', error.message);
    return false;
  }
};

export default {
  hashPin,
  verifyPin,
  hashNationalId,
  verifyNationalId,
  normalizeFullName,
  maskNationalId,
  maskNationalIdFromHash,
  validatePin,
  validatePassword,
  hashPassword,
  verifyPassword,
};
