import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();

import "@nomicfoundation/hardhat-chai-matchers"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"

const {
  ALCHEMY_POLYGON_TESTNET_RPC,
  WALLET_PRIVATE_KEY,
  POLYGONSCAN_API_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  // networks: {
  //   mumbai: {
  //     url: ALCHEMY_POLYGON_TESTNET_RPC,
  //     // @ts-ignore
  //     accounts: [WALLET_PRIVATE_KEY],
  //   },
  // },
  // etherscan: {
  //   apiKey: POLYGONSCAN_API_KEY,
  // },
};

export default config;
