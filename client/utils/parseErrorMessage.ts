import { ProviderRpcError } from "hardhat/types";

export function parseErrorMessage(error: ProviderRpcError) {
  var message = "";
  if (error.code === ("ACTION_REJECTED" as unknown)) {
    message = "User rejected transaction";
  } else if (error.code === -32000 || error.code === -32603) {
    message =
      "Insufficient funds, please add MATIC to your account or select a different account within MetaMask";
  } else {
    message = "Unknown error occurred";
  }
  return message;
}
