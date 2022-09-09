import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import useMetamask from "../hooks/useMetamask";
import ConnectWalletBtn from "./ConnectWalletBtn";
import PickTip from "./PickTip";

type Props = {

}

const Web3Start = (props: Props) => {
  // Hooks
  const { connect, metaState } = useMetamask();

  // State
  const [error, setError] = useState<Error | unknown | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const currentWalletAcc = metaState.account[0] || "";

  // Wallet Connect
  const connectWithPermission = useCallback(
    async (withPermission: boolean = false) => {
      return await connect(
        ethers.providers.Web3Provider,
        "any",
        withPermission
      );
    },
    [connect]
  );

  useEffect(() => {
    if (metaState.isAvailable) {
      (async () => {
        try {
          await connectWithPermission(false);
        } catch (err) {
          setError(err);
        }
      })();
    }
  }, [metaState.isAvailable, metaState.isConnected]);

  function handleConnectMetaMask() {
    if (!metaState.isConnected) {
      (async () => {
        try {
          setIsWalletLoading(true);
          await connectWithPermission(true);
        } catch (err) {
          setError(err);
        } finally {
          setIsWalletLoading(false);
        }
      })();
    }
  }

  return (
    <div className="flex flex-col items-center">
      <>
        {!metaState.isConnected ? (
          metaState.isAvailable && (
            <ConnectWalletBtn
              isLoading={isWalletLoading}
              title="Connect with MetaMask"
              connectWallet={handleConnectMetaMask}
            />
          )
        ) : (
          <>
            <PickTip state={metaState} />
            {currentWalletAcc && (
              <p className="mt-5 text-xs text-gray-500">
                Logged in as {currentWalletAcc}
              </p>
            )}
          </>
        )}

        {error?.message && (
          <p className="mt-3 text-red-700">Error: {error?.message}</p>
        )}
      </>
    </div>
  );
};

export default Web3Start;
