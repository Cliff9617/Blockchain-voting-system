/**
 * Error Helper Utility for DeVote
 * Provides consistent error handling and user-friendly messages
 */

/**
 * Get a user-friendly error message from an error object
 * @param {Error|Object} err - The error object
 * @param {string} fallback - Fallback message if error cannot be parsed
 * @returns {string} User-friendly error message
 */
export const getReadableError = (err, fallback = "An unexpected error occurred") => {
  if (!err) return fallback;

  // Try to extract message from various error formats
  const message =
    err?.reason ||
    err?.shortMessage ||
    err?.info?.error?.message ||
    err?.message ||
    err?.data?.message ||
    fallback;

  const lower = String(message).toLowerCase();

  // Common blockchain/Web3 error patterns
  if (lower.includes("user rejected") || lower.includes("rejected transaction")) {
    return "Transaction rejected by user";
  }
  if (lower.includes("insufficient funds") || lower.includes("insufficient balance")) {
    return "Insufficient funds for transaction";
  }
  if (lower.includes("only admin")) {
    return "Only admin can perform this action";
  }
  if (lower.includes("invalid address")) {
    return "Invalid wallet address";
  }
  if (lower.includes("already registered")) {
    return "Voter already registered";
  }
  if (lower.includes("not a registered voter") || lower.includes("not registered")) {
    return "You are not a registered voter";
  }
  if (lower.includes("already voted for this position")) {
    return "You have already voted for this position";
  }
  if (lower.includes("already voted")) {
    return "You have already voted";
  }
  if (lower.includes("election not started")) {
    return "Election has not started yet";
  }
  if (lower.includes("election ended") || lower.includes("election already ended")) {
    return "Election has ended";
  }
  if (lower.includes("election already started")) {
    return "Election has already started";
  }
  if (lower.includes("no candidates added") || lower.includes("no candidates")) {
    return "No candidates have been added yet";
  }
  if (lower.includes("candidate name required")) {
    return "Candidate name is required";
  }
  if (lower.includes("invalid position")) {
    return "Invalid position selected";
  }
  if (lower.includes("county required")) {
    return "County is required for this position";
  }
  if (lower.includes("constituency required")) {
    return "Constituency is required for this position";
  }
  if (lower.includes("ward required")) {
    return "Ward is required for this position";
  }
  if (lower.includes("missing revert data") || lower.includes("call exception")) {
    return "Transaction failed. Please check your connection and try again.";
  }
  if (lower.includes("network") || lower.includes("connection")) {
    return "Network error. Please check your connection.";
  }
  if (lower.includes("timeout")) {
    return "Request timed out. Please try again.";
  }
  if (lower.includes("gas")) {
    return "Transaction failed due to gas estimation. Please try again.";
  }

  return message || fallback;
};

/**
 * Log detailed error information for debugging
 * @param {string} context - The context where the error occurred
 * @param {Error|Object} err - The error object
 */
export const logError = (context, err) => {
  console.error(`[${context}] Error:`, err);
  console.error(`[${context}] Full error object:`, JSON.stringify(err, Object.getOwnPropertyNames(err)));
  console.error(`[${context}] Stack trace:`, err?.stack);
};

/**
 * Display error in a user-friendly way
 * @param {Function} setStatus - Function to set status message
 * @param {Function} setError - Function to set error state
 * @param {Error|Object} err - The error object
 * @param {string} fallback - Fallback message
 */
export const displayError = (setStatus, setError, err, fallback = "An error occurred") => {
  const readableMessage = getReadableError(err, fallback);
  
  if (typeof setStatus === 'function') {
    setStatus(`Error: ${readableMessage}`);
  }
  
  if (typeof setError === 'function') {
    setError(readableMessage);
  }
  
  // Always log the full error for debugging
  logError('displayError', err);
};

/**
 * Validate that required fields are present
 * @param {Object} data - The data object to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {{ valid: boolean, missing: string[] }} Validation result
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missing = [];
  
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || 
        (typeof data[field] === 'string' && data[field].trim() === '')) {
      missing.push(field);
    }
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
};

/**
 * Create an error boundary-friendly error message
 * @param {string} message - The error message
 * @param {Object} details - Additional details
 * @returns {Object} Formatted error object
 */
export const createError = (message, details = {}) => {
  return {
    message,
    ...details,
    timestamp: new Date().toISOString(),
  };
};

export default {
  getReadableError,
  logError,
  displayError,
  validateRequiredFields,
  createError,
};