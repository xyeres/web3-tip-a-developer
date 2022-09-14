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
import PickTip from "./steps/PickTip";
import ReviewTip from "./steps/ReviewTip";
import ThankYou from "./steps/ThankYou";
import WriteMemo from "./steps/WriteMemo";

export type StepProps = {
  step: string;
  setStep: Dispatch<SetStateAction<string>>;
  tipmessage: string;
  setTipmessage: Dispatch<SetStateAction<string>>;
  tipAmount: string;
  setTipAmount: Dispatch<SetStateAction<string>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  userMessage: string;
  setUserMessage: Dispatch<SetStateAction<string>>;
};

const Web3Start = ({
  userName,
  userMessage,
  setUserName,
  setUserMessage,
  step,
  setStep,
  tipmessage,
  setTipmessage,
  tipAmount,
  setTipAmount
}: StepProps) => {
  // Hooks
  const { connect, metaState } = useMetamask();

  // State
  const [error, setError] = useState<Error | any>();
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  const isAcceptableChain =
    metaState.chain.id === "137" || metaState.chain.id === "80001";

  const stepList = [
    {
      key: "pickTip",
      render: () => {
        return (
          <PickTip
            setUserName={setUserName}
            userName={userName}
            step={step}
            setStep={setStep}
            tipmessage={tipmessage}
            setTipmessage={setTipmessage}
            setTipAmount={setTipAmount}
            tipAmount={tipAmount}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
          />
        );
      },
    },
    {
      key: "writeMemo",
      render: () => {
        return (
          <WriteMemo
            setUserName={setUserName}
            userName={userName}
            step={step}
            setStep={setStep}
            tipmessage={tipmessage}
            setTipmessage={setTipmessage}
            setTipAmount={setTipAmount}
            tipAmount={tipAmount}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
          />
        );
      },
    },
    {
      key: "review",
      render: () => {
        return (
          <ReviewTip
            setUserName={setUserName}
            userName={userName}
            step={step}
            setStep={setStep}
            tipmessage={tipmessage}
            setTipmessage={setTipmessage}
            setTipAmount={setTipAmount}
            tipAmount={tipAmount}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
          />
        );
      },
    },
    {
      key: "thankyou",
      render: () => {
        return (
          <ThankYou
            setUserName={setUserName}
            userName={userName}
            step={step}
            setStep={setStep}
            tipmessage={tipmessage}
            setTipmessage={setTipmessage}
            setTipAmount={setTipAmount}
            tipAmount={tipAmount}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
          />
        );
      },
    },
  ];

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
    console.log("ran");
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
              setTipmessage={setTipmessage}
            />
          )
        ) : isAcceptableChain ? (
          stepList.find((s) => s.key === step)?.render()
        ) : (
          <ChainCheck setTipmessage={setTipmessage} />
        )}

        {error?.message && (
          <p className="mt-3 text-red-700">Error: {error?.message}</p>
        )}
      </>
    </div>
  );
};

export default Web3Start;
