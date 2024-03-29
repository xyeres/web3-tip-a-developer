import { Contract, ethers } from "ethers";
import { ProviderRpcError } from "hardhat/types";
import React, { useContext, useEffect, useReducer } from "react";
import useMetamask from "../../hooks/useMetamask";
import useStepMessage from "../../hooks/useStepMessage";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../lib/constants";
import { StepsContext } from "../../lib/StepsProvider";
import { TipContext } from "../../lib/TipProvider";
import { parseErrorMessage } from "../../utils/parseErrorMessage";
import ChainCheck from "../ChainCheck";
import ConnectWallet from "../ConnectWallet";
import {
  sendTipReducer,
  TX_ACTION_TYPES,
  TX_INITIAL_STATE
} from "./sendTipReducer";
import StepButton, { StepButtonProps } from "./StepButton";
import TXLoading from "./transaction/TXLoading";

const ReviewTip = () => {
  // Set display message
  const { setStepMessage } = useStepMessage();
  const STEP_MESSAGE = "Review & sign";
  useEffect(() => setStepMessage(STEP_MESSAGE), [setStepMessage]);

  // Context
  const { tip } = useContext(TipContext);
  const { getPrevStep, getNextStep } = useContext(StepsContext);

  // Hooks
  const { metaState } = useMetamask();

  // State
  const [txState, txDispatch] = useReducer(sendTipReducer, TX_INITIAL_STATE);

  // Checks
  const isAcceptableChain =
    metaState.chain.id === "137" || metaState.chain.id === "80001";

  // Handlers
  async function handleConfirmTransaction() {
    try {
      txDispatch({
        type: TX_ACTION_TYPES.SEND_START,
        payload: "Waiting for user to sign transaction...",
      });

      console.log("Sending tip...");

      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        const sendTipOnChain = withContract(contract);
        const contractTx = await sendTipOnChain(
          tip.user,
          tip.message,
          tip.amount
        );

        txDispatch({
          type: TX_ACTION_TYPES.SEND_SUCCESS,
          payload: "Tip sent! Waiting for network confirmation...",
        });

        await contractTx.wait();
        console.log("Transaction mined at: ", contractTx.hash);
        getNextStep();
      }
    } catch (error) {
      const RpcError = error as ProviderRpcError;
      txDispatch({ type: TX_ACTION_TYPES.SEND_ERROR, payload: RpcError });
    }
  }

  function handleErrorDismiss() {
    txDispatch({ type: TX_ACTION_TYPES.SEND_ERROR, payload: null });
    setStepMessage(STEP_MESSAGE);
  }

  // Contract Wrapper
  function withContract(tipADeveloper: Contract) {
    return async function sendTipOnChain(
      name: string,
      message: string,
      amount: string
    ) {
      try {
        let reducedAmount = `${parseInt(amount) * 0.01}`;
        const contractTx = await tipADeveloper.tip(name, message, {
          value: ethers.utils.parseEther(reducedAmount),
        });
        return contractTx;
      } catch (error) {
        throw error;
      }
    };
  }

  // Error UI
  if (txState.error) {
    setStepMessage("Uh-oh");
    // Get message based on error code
    let message = parseErrorMessage(txState.error);
    return (
      <div className="mt-5 text-sm text-red-400 flex w-full flex-col items-center">
        {message}
        <button
          className="p-2 mt-3 text-gray-50 text-[.9rem] hover:bg-gray-500 active:bg-gray-600 bg-gray-600 w-full focus:ring ring-gray-300 outline-none"
          onClick={handleErrorDismiss}
        >
          Back
        </button>
      </div>
    );
  }

  // Loading UI
  if (txState.loading) return <TXLoading message={txState.message} />;

  // Default UI
  return (
    <div className="text-left mt-4 text-[0.85rem] gap-2 flex w-full flex-col items-start justify-between">
      {
        <>
          <div className="flex self-stretch bg-neutral-100 p-3 justify-between items-center ">
            <p>Name:</p>
            <p>{tip.user}</p>
          </div>
          <div className="flex self-stretch bg-neutral-100 p-3 gap-7 items-center justify-between">
            <p>Message:</p>
            <p className="break-all text-right">{tip.message}</p>
          </div>
          <div className="mb-5 flex self-stretch bg-neutral-100 p-3 items-center justify-between">
            <p>Tip amount:</p>
            <p>{parseInt(tip.amount).toFixed(2)} $MATIC</p>
          </div>
          {!metaState.isConnected ? (
            <ConnectWallet />
          ) : (
            <React.Fragment>
              {isAcceptableChain ? (
                <CustomButton
                  title="Looks good, sign transaction!"
                  onClick={handleConfirmTransaction}
                />
              ) : (
                <ChainCheck />
              )}{" "}
              <StepButton title="Prev" onClick={getPrevStep} />
            </React.Fragment>
          )}
        </>
      }
    </div>
  );
};

const CustomButton = ({ onClick, title, className }: StepButtonProps) => {
  return <StepButton title={title} onClick={onClick} className={className} />;
};

export default ReviewTip;
