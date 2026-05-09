# DeVote - Decentralized Voting System

A secure, transparent, and tamper-proof voting system built on Ethereum blockchain technology.

## Features

- **Smart Contract-Based Voting**: All votes are recorded on the Ethereum blockchain
- **Multi-Position Voting**: Support for multiple elective positions (President, Governor, Senator, etc.)
- **Voter Verification**: Secure voter registration and verification system
- **Real-Time Results**: Live vote counting and results display
- **Firebase Integration**: Optional backend for additional data storage
- **Responsive UI**: Modern React-based frontend with Tailwind CSS

## Project Structure

```
devote-voting-system/
├── contracts/          # Solidity smart contracts
│   ├── Inbox.sol
│   └── voting.sol
├── scripts/            # Deployment scripts
│   └── deploy.js
├── test/               # Smart contract tests
│   ├── Inbox.test.js
│   ├── Voting.test.js
│   └── helpers.js
├── devote-ui/          # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── pages/      # Application pages
│   │   ├── services/   # API services
│   │   ├── utils/      # Utility functions
│   │   ├── config.js   # Contract configuration
│   │   ├── firebase.js # Firebase setup
│   │   └── App.js      # Main application
│   └── package.json
├── hardhat.config.js   # Hardhat configuration
├── .env.example        # Environment variables template
└── package.json        # Root package.json
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Sepolia testnet ETH (for deployment)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Cliff9617/Blockchain-voting-system.git
cd Blockchain-voting-system
```

### 2. Install Dependencies

Install dependencies for both the smart contracts and the frontend:

```bash
# Install all dependencies (root + frontend)
npm run install:all

# Or install separately:
npm install              # Install root (Hardhat) dependencies
npm run ui:install       # Install frontend dependencies
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your values (NEVER commit this file!)
# Required for Hardhat/Sepolia deployment:
#   - SEPOLIA_RPC_URL
#   - PRIVATE_KEY
#   - ETHERSCAN_API_KEY (optional, for verification)
```

### 4. Update Contract Address

After deploying your contract, update the contract address in `devote-ui/src/config.js`:

```javascript
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddressHere";
```

## Development

### Smart Contracts

```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to Sepolia testnet
npm run deploy:sepolia

# Run local voting demo
npm run demo:voting
```

### Frontend (React UI)

```bash
# Start development server (runs on http://localhost:3000)
npm run ui:start

# Build for production
npm run ui:build

# Run tests
npm run ui:test
```

### Alternative: Separate Terminal Commands

If you prefer working in separate terminals:

**Terminal 1 - Smart Contracts:**
```bash
cd Blockchain-voting-system
npm install
npm run compile
```

**Terminal 2 - Frontend:**
```bash
cd Blockchain-voting-system/devote-ui
npm install
npm start
```

## Deployment to Sepolia

1. **Get Sepolia ETH**: Visit [Sepolia Faucet](https://sepoliafaucet.com/) to get test ETH

2. **Configure your private key** in `.env`:
   ```
   PRIVATE_KEY=your_wallet_private_key_here
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_api_key
   ```

3. **Deploy the contract**:
   ```bash
   npm run deploy:sepolia
   ```

4. **Copy the deployed contract address** from the output

5. **Update the frontend** (`devote-ui/src/config.js`) with the new address

## Team Workflow

### Daily Workflow

```bash
# Start of day - Pull latest changes
git pull origin main

# Make your changes, then:
git add .
git commit -m "Description of changes"
git push origin main
```

### Before Pushing

1. Make sure tests pass: `npm run test`
2. Build the frontend: `npm run ui:build`
3. Never commit `.env` files or private keys!

### Resolving Conflicts

If you encounter merge conflicts:
```bash
git pull origin main
# Resolve conflicts in your editor
git add <resolved_files>
git commit -m "Resolve merge conflicts"
git push origin main
```

## Security Notes

⚠️ **IMPORTANT SECURITY PRACTICES:**

1. **Never commit private keys** - Always use `.env` files
2. **Use separate wallets** for development and production
3. **Keep Sepolia and mainnet keys separate**
4. **Review smart contracts** before deploying real value
5. **Use Firebase Security Rules** to protect your database

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SEPOLIA_RPC_URL` | Sepolia RPC endpoint (Alchemy/Infura) | Yes (for deployment) |
| `PRIVATE_KEY` | Deployer wallet private key | Yes (for deployment) |
| `ETHERSCAN_API_KEY` | Etherscan API key for verification | No |
| `REACT_APP_FIREBASE_API_KEY` | Firebase API key | No |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | No |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID | No |
| `REACT_APP_CONTRACT_ADDRESS` | Override contract address | No |

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Push to your branch
5. Create a Pull Request

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Cliff9617/Blockchain-voting-system/issues)
- Documentation: Check the `docs/` folder for detailed guides