import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import useMetamask from "../hooks/useMetamask";
import ConnectWalletBtn from "./ConnectWalletBtn";
import PickTip from "./PickTip";
import ThankYou from "./ThankYou";

type Props = {};

const Web3Start = (props: Props) => {
  // Hooks
  const { connect, metaState, getStep } = useMetamask();

  // State
  const [error, setError] = useState<Error | any>();
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  function getStepElement(step: string): JSX.Element {
    const STEPS = {
      STEP1: <PickTip state={metaState} />,
      STEP2: <ThankYou />,
    }

    return STEPS[step]
  }

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
        } catch (err: any) {
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
          getStepElement(getStep())
        )}

        {error?.message && (
          <p className="mt-3 text-red-700">Error: {error?.message}</p>
        )}
      </>
    </div>
  );
};

export default Web3Start;
