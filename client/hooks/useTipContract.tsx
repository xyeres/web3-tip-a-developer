import { Contract, ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/constants";

export function useTipContract(): Contract {

  const provider = ethers.providers.getDefaultProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_TESTNET_RPC,
    {
      alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }
  );
  const signer = new ethers.VoidSigner(CONTRACT_ADDRESS, provider);

  const tipADeveloper = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );


  return tipADeveloper;
}
