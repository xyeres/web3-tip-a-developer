import { ethers } from "ethers";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useMetamask from "../hooks/useMetamask";
import { StepsContext } from "../lib/StepsProvider";
import ConnectWalletBtn from "./ConnectWalletBtn";

const Web3Start = () => {
  // Context
  const stepsContext = useContext(StepsContext);

  // Hooks
  const { connect, metaState } = useMetamask();

  // State
  const [error, setError] = useState<Error | any>();
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  const isAcceptableChain =
    metaState.chain.id === "137" || metaState.chain.id === "80001";

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
        {!metaState.isConnected
          ? metaState.isAvailable && (
            <ConnectWalletBtn
              isLoading={isWalletLoading}
              title="Connect with MetaMask"
              connectWallet={handleConnectMetaMask}
            />
          )
          : stepsContext.getCurrentStep().render()}

        {error?.message && (
          <p className="mt-3 text-red-700">Error: {error.message}</p>
        )}
      </>
    </div>
  );
};

export default Web3Start;

// : isAcceptableChain ? (
// stepList.find((s) => s.key === step)?.render()
// ) : (
//   <ChainCheck setTipmessage={setTipmessage} />
// )
