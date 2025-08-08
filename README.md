# SkillChain dApp

A Web3 educational platform for minting NFT badges and transferring skill tokens on Polygon Mumbai testnet.

---

## 🛠️ Project Structure

```mermaid
graph TD
    A[Root] --> B[src/]
    B --> C[components/]
    B --> D[hooks/]
    B --> E[lib/]
    B --> F[pages/]
    A --> G[contracts/]
    A --> H[public/]
    A --> I[config files]

    ## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MetaMask browser extension
- Polygon Mumbai testnet setup

### 1. Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd skillchain-dapp

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### 2. MetaMask Setup

1. Install MetaMask extension
2. Add Polygon Mumbai testnet:
   - Network Name: `Polygon Mumbai Testnet`
   - RPC URL: `https://rpc-mumbai.maticvigil.com/`
   - Chain ID: `80001`
   - Currency Symbol: `MATIC`
   - Block Explorer: `https://mumbai.polygonscan.com/`

3. Get free testnet MATIC from [Mumbai Faucet](https://faucet.polygon.technology/)

### 3. Smart Contract Deployment

#### Deploy NFT Badge Contract

1. Install Hardhat and dependencies:
```bash
npm install --save-dev hardhat @openzeppelin/contracts @nomiclabs/hardhat-ethers ethers
```

2. Create `hardhat.config.js`:
```javascript
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ["YOUR_PRIVATE_KEY_HERE"] // Add your private key
    }
  }
};
```

3. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network mumbai
```

#### Deploy Script (`scripts/deploy.js`)

```javascript
async function main() {
  // Deploy SkillBadge (NFT) contract
  const SkillBadge = await ethers.getContractFactory("SkillBadge");
  const skillBadge = await SkillBadge.deploy();
  await skillBadge.deployed();
  console.log("SkillBadge deployed to:", skillBadge.address);

  // Deploy SkillToken (ERC20) contract
  const SkillToken = await ethers.getContractFactory("SkillToken");
  const skillToken = await SkillToken.deploy();
  await skillToken.deployed();
  console.log("SkillToken deployed to:", skillToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### 4. Update Contract Addresses

After deployment, update the contract addresses in:

- `src/components/MintBadgeForm.tsx` - Update `NFT_CONTRACT_ADDRESS`
- `src/components/SendTokensForm.tsx` - Update `TOKEN_CONTRACT_ADDRESS`

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 6. Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy to [Netlify](https://netlify.com):
   - Drag and drop the `dist` folder
   - Or connect your Git repository
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔧 Configuration

### Environment Variables (Optional)

Create `.env.local` for additional configuration:

```env
VITE_INFURA_PROJECT_ID=your_infura_project_id
VITE_NETWORK_NAME=mumbai
```

### Smart Contract ABIs

The contract ABIs are embedded in the components. For production, consider:
1. Storing ABIs in separate JSON files
2. Using a contract registry
3. Implementing proper error handling

## 🧪 Testing

### Test the dApp

1. Connect MetaMask to Mumbai testnet
2. Ensure you have test MATIC
3. Test minting NFT badges
4. Test sending skill tokens
5. Check transactions on [Mumbai PolygonScan](https://mumbai.polygonscan.com/)

### Common Issues

**"User rejected the request"**
- User cancelled the transaction in MetaMask

**"Insufficient funds"**
- Need more test MATIC from the faucet

**"Wrong network"**
- Switch to Polygon Mumbai in MetaMask

**"Contract not deployed"**
- Update contract addresses after deployment

## 📚 Contract Documentation

### SkillBadge (ERC-721)

- `mintBadge(address recipient, string badgeName)` - Mint a new badge
- `getBadgesByOwner(address owner)` - Get all badges owned by an address
- `totalSupply()` - Get total number of badges minted

### SkillToken (ERC-20)

- `transfer(address recipient, uint256 amount)` - Transfer tokens
- `rewardTokens(address recipient, uint256 amount, string reason)` - Owner rewards tokens
- `getTokenBalance(address account)` - Get readable token balance

## 🔐 Security Notes

- Never commit private keys to version control
- Use environment variables for sensitive data
- Test thoroughly on testnet before mainnet deployment
- Consider implementing additional access controls for production

## 🎯 Next Steps

1. Add proper metadata for NFTs (IPFS integration)
2. Implement role-based access control
3. Add batch operations for efficiency
4. Create a comprehensive testing suite
5. Add real-time transaction tracking
6. Implement proper error handling and user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details.