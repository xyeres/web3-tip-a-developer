import { Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

/**
 * Return a contract signed by a ethers VoidSigner
 * @returns Contract
 */
export function getTipContract(): Contract {
  let defaultProvider = ethers.providers.getDefaultProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_RPC,
    {
      alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }
  );
  
  let signer = new ethers.VoidSigner(CONTRACT_ADDRESS, defaultProvider);

  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
