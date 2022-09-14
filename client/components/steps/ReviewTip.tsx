import React, { useEffect } from "react";
import { StepProps } from "../Web3Start";

const ReviewTip = ({
  setStep,
  userName,
  userMessage,
  tipAmount,
  setTipmessage
}: StepProps) => {
  useEffect(() => {
    setTipmessage("Review and send");
  }, [setTipmessage]);

  function handleConfirmTransaction() {
    console.log("Transaction submitted:", [userName, tipAmount, userMessage]);
    setStep("thankyou");
  }

  function handleBackBtn() {
    setStep("writeMemo");
  }
  return (
    <div className="text-left mt-4 text-[0.85rem] gap-2 flex w-[270px] flex-col items-start justify-between">
      <div className="flex self-stretch justify-between">
        <p>Name:</p>
        <p>{userName}</p>
      </div>
      <div className="flex self-stretch gap-7 justify-between">
        <p>Message:</p>
        <p className="break-all text-right">{userMessage}</p>
      </div>
      <div className="mb-5 flex self-stretch justify-between">
        <p>Tip amount:</p>
        <p>{parseInt(tipAmount).toFixed(2)} $MATIC</p>
      </div>

      <button
        className="p-2 mb-2 text-[.9rem] hover:bg-purple-400 active:bg-purple-400 bg-purple-700 w-full focus:ring ring-purple-100 outline-none"
        onClick={handleConfirmTransaction}
      >
        Yupp. Sign Transaction!
      </button>
      <button
        className="p-2 text-[.9rem] hover:bg-gray-400 active:bg-gray-600 bg-gray-500 w-full focus:ring ring-purple-100 outline-none"
        onClick={handleBackBtn}
      >
        Back
      </button>
    </div>
  );
};

export default ReviewTip;
