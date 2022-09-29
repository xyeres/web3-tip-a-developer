import { ethers } from "ethers";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useMetamask from "../hooks/useMetamask";
import ConnectWalletBtn from "./ConnectWalletBtn";

const ConnectWallet = () => {
  const BTN_LABEL = "Connect with MetaMask"
  // Hooks
  const { metaState, connect } = useMetamask();

  // State
  const [error, setError] = useState<Error | any>();
  const [isWalletLoading, setIsWalletLoading] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaState.isAvailable, metaState.isConnected]);

  function handleConnectMetaMask(): void {
    if (!metaState.isConnected) {
      (async function connectMetaMaskWallet() {
        try {
          setError(null);
          setIsWalletLoading(true);
          await connectWithPermission(true);
        } catch (err: any) {
          setError(err);
        } finally {
          setIsWalletLoading(false);
        }
      })();
    }
  }

  return (
    <div className="flex items-center w-full flex-col">
      {metaState.isAvailable ? (
        <React.Fragment>
          <ConnectWalletBtn
            isLoading={isWalletLoading}
            title={BTN_LABEL}
            connectWallet={handleConnectMetaMask}
          />
          {error?.message && (
            <p className="mt-3 text-red-600">Error: {error.message}</p>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ConnectWalletBtn
            connectWallet={() => null}
            isLoading={false}
            disabled
            title={BTN_LABEL}
          />
          <div className="mt-6 text-sm">
            <p>
              You&apos;ll need to have Metamask installed to continue with
              this web3 interaction. But wait, what is a MetaMask you say?{" "}
              <Link href="https://metamask.io/">
                <a className="underline text-orange-500">
                  Learn about it here
                </a>
              </Link>
            </p>

          </div>

        </React.Fragment>
      )}
    </div>
  );
};

export default ConnectWallet;
