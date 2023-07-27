import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "hardhat-gas-reporter"
import "solidity-coverage";
import "@nomicfoundation/hardhat-ethers"
import "@typechain/hardhat"

require("./tasks/block-number");
// require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL=process.env.RPC_URL;
const PRIVATE_KEY= process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_APIKEY= process.env.COINMARKETCAP_APIKEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia:{
url: SEPOLIA_RPC_URL,
accounts:[PRIVATE_KEY],
chainId:11155111,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey:ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled :true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap:COINMARKETCAP_APIKEY,
token:"ETH",

  }

};
