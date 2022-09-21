import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import useStepMessage from "../../hooks/useStepMessage";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../lib/constants";
import { StepsContext } from "../../lib/StepsProvider";
import { TipContext } from "../../lib/TipProvider";
import Spinner from "../Spinner";
import StepButton, { StepButtonProps } from "./StepButton";

const ReviewTip = () => {
  // Set display message
  const { setStepMessage } = useStepMessage();
  const STEP_MESSAGE = "Review & sign"
  useEffect(() => setStepMessage(STEP_MESSAGE), [setStepMessage]);

  const { tip, config: tipConfig } = useContext(TipContext);
  const { getPrevStep, getNextStep, getCurrentStep, getStep } = useContext(StepsContext)

  const [txLoading, setTxLoading] = useState(false);
  const [txMessage, setTxMessage] = useState(
    "Waiting for user to sign transaction..."
  );
  const [txError, setTxError] = useState<unknown | null | any>(null);

  function handleConfirmTransaction() {
    sendTipOnChain(tip.user, tip.message, tip.amount);
  }

  async function sendTipOnChain(name: string, message: string, amount: string) {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        setTxLoading(true);
        console.log("Sending tip...");

        let reducedAmount = `${parseInt(amount) * 0.01}`;
        const contractTx = await contract.tip(name, message, {
          value: ethers.utils.parseEther(reducedAmount),
        });
        setTxMessage("Tip sent! Waiting for network confirmation...");
        await contractTx.wait();
        console.log("Transaction mined at: ", contractTx.hash);
        getNextStep()
      }
    } catch (error) {
      console.log(error);
      setTxLoading(false);
      setTxError(error);
    }
  }

  if (txError) {
    setStepMessage("Uh oh")
    let message = "";
    if (txError?.code === "ACTION_REJECTED" || txError?.code === 4001) {
      message = "User rejected transaction";
    } else {
      message = "Unknown error occurred";
    }
    return (
      <div className="mt-5 text-sm text-red-400 flex w-full flex-col items-center">
        {message}
        <button
          className="p-2 mt-3 text-gray-50 text-[.9rem] hover:bg-gray-400 active:bg-gray-600 bg-gray-500 w-full focus:ring ring-gray-100 outline-none"
          onClick={() => {
            setTxError(null)
            setStepMessage(STEP_MESSAGE)
          }}
        >
          Back
        </button>
      </div>
    );
  }

  if (txLoading) {
    return (
      <div className="mt-5 flex w-full flex-col items-center">
        <Spinner />
        <p className="mt-4 text-xs font-bold">{txMessage}</p>
      </div>
    );
  }

  return (
    <div className="text-left mt-4 text-[0.85rem] gap-2 flex w-full flex-col items-start justify-between">
      {
        <>
          <div className="flex self-stretch justify-between">
            <p>Name:</p>
            <p>{tip.user}</p>
          </div>
          <div className="flex self-stretch gap-7 justify-between">
            <p>Message:</p>
            <p className="break-all text-right">{tip.message}</p>
          </div>
          <div className="mb-5 flex self-stretch justify-between">
            <p>Tip amount:</p>
            <p>{parseInt(tip.amount).toFixed(2)} $MATIC</p>
          </div>
          <CustomButton
            title="Yupp. Sign Transaction!"
            onClick={handleConfirmTransaction}
          />
          <StepButton
            title="Prev"
            onClick={getPrevStep} />
        </>
      }
    </div >
  );
};

const CustomButton = ({
  onClick,
  title,
  className,
}: StepButtonProps) => {
  return <StepButton title={title} onClick={onClick} className={className} />;
};

export default ReviewTip;
