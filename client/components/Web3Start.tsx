import { ethers } from "ethers";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useMetamask from "../hooks/useMetamask";
import ChainCheck from "./ChainCheck";
import ConnectWalletBtn from "./ConnectWalletBtn";
import PickTip from "./PickTip";
import ThankYou from "./ThankYou";

export type StepProps = {
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
  tipmessage: string;
  setTipmessage: Dispatch<SetStateAction<string>>;
};

const Web3Start = ({ step, setStep, tipmessage, setTipmessage }: StepProps) => {
  // Hooks
  const { connect, metaState } = useMetamask();

  // State
  const [error, setError] = useState<Error | any>();
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  const isAcceptableChain = metaState.chain.id === '137' || metaState.chain.id === '80001'


  function getStepElement(pickedStep: string): JSX.Element {
    const STEPS = {
      STEP1: <PickTip step={step} setStep={setStep} tipmessage={tipmessage} setTipmessage={setTipmessage} />,
      STEP2: <ThankYou step={step} setStep={setStep} tipmessage={tipmessage} setTipmessage={setTipmessage} />,
    };

    return STEPS[pickedStep as keyof typeof STEPS];
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
    console.log('ran')
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
        {!metaState.isConnected
          ? metaState.isAvailable && (
            <ConnectWalletBtn
              isLoading={isWalletLoading}
              title="Connect with MetaMask"
              connectWallet={handleConnectMetaMask}
              setTipmessage={setTipmessage}
            />
          ) : isAcceptableChain ? getStepElement(step) : <ChainCheck setTipmessage={setTipmessage} />
        }

        {error?.message && (
          <p className="mt-3 text-red-700">Error: {error?.message}</p>
        )}
      </>
    </div>
  );
};

export default Web3Start;
