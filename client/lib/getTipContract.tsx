import { Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

/**
 * Given no provider param, will return a contract signed by a ethers VoidSigner
 * Given a signed provider it will return a contract signed by that account
 * @param provider 
 * @returns Contract
 */
export function getTipContract(
  provider?:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): Contract {
  var signer = null;
  if (provider) {
    const externalProvider = new ethers.providers.Web3Provider(provider, "any");
    signer = externalProvider.getSigner();
  } else {
    let defaultProvider = ethers.providers.getDefaultProvider(
      process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_RPC,
      {
        alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      }
    );
    signer = new ethers.VoidSigner(CONTRACT_ADDRESS, defaultProvider);
  }
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
