import "@nomicfoundation/hardhat-toolbox"

import { HardhatUserConfig, vars } from "hardhat/config"

// infura api key
const INFURA_API_KEY = vars.get("INFURA_API_KEY")

// sepolia private key for deploy smart contract
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY")

// etherscan api key
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY")
const BASE_ETHERSCAN_API_KEY = vars.get("BASE_ETHERSCAN_API_KEY")

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ["base-mainnet"]: {
      url: `https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      base: BASE_ETHERSCAN_API_KEY,
    },
  },
}

export default config
