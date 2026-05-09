import Papa from 'papaparse';

export const parseVoterCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error('CSV parsing errors: ' + results.errors.map(e => e.message).join(', ')));
          return;
        }

        const voters = results.data
          .filter(row => row.wallet && row.wallet.trim())
          .map(row => row.wallet.trim());

        if (voters.length === 0) {
          reject(new Error('No valid wallet addresses found in CSV'));
          return;
        }

        // Validate wallet addresses
        const invalidAddresses = voters.filter(addr => !isValidEthereumAddress(addr));
        if (invalidAddresses.length > 0) {
          reject(new Error(`Invalid wallet addresses found: ${invalidAddresses.join(', ')}`));
          return;
        }

        resolve(voters);
      },
      error: (error) => {
        reject(new Error('Failed to parse CSV file: ' + error.message));
      }
    });
  });
};

export const isValidEthereumAddress = (address) => {
  if (!address) return false;
  
  // Remove whitespace
  const trimmed = address.trim();
  
  // Check if it's a valid Ethereum address format
  // Ethereum addresses are 42 characters long (including 0x prefix)
  // and contain only hexadecimal characters
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  
  return ethAddressRegex.test(trimmed);
};

export const generateSampleCSV = () => {
  const sampleData = [
    { wallet: '0x1234567890123456789012345678901234567890' },
    { wallet: '0x0987654321098765432109876543210987654321' },
    { wallet: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef' }
  ];
  
  return Papa.unparse(sampleData);
};