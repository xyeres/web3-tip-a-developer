import { NextPage } from "next";
import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import Web3Start from "../components/Web3Start";
import useMetamask from "../hooks/useMetamask";

const Metatest: NextPage = () => {
  const { connect, metaState } = useMetamask();

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
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [metaState.isAvailable, metaState.isConnected, connectWithPermission]);

  function onConnectWallet() {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connectWithPermission(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4 min-h-screen">
      {!metaState.isConnected && metaState.isAvailable && (
        <button
          className="bg-blue-500 p-4 px-8 rounded-full"
          onClick={onConnectWallet}
        >
          connect wallet
        </button>
      )}
      {metaState.isAvailable ? (
        "You're in!"
      ) : (
        <div>
          <p>You dont have Metamask installed</p>
          <p>But wait, what is Metamask?</p>
          <p>
            <code>
              <a href="https://metamask.io/">https://metamask.io</a>
            </code>
          </p>
        </div>
      )}
    </div>
  );
};

export default Metatest;
