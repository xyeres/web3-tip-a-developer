import React, { useEffect, useState } from "react";
import PriceChoice from "./PriceChoice";
import { StepProps } from "./Web3Start";

const PickTip = ({ setTipmessage, setStep }: StepProps) => {
  useEffect(() => {
    setTipmessage("Pick tip amount");
  }, [setTipmessage]);

  // Handlers
  const onPriceChoiceClick = (amount: number) => {
    setStep("STEP2");
  };

  const OPTIONS = [
    { amount: "3", conversion: "$2.4" },
    { amount: "5", conversion: "$4" },
    { amount: "10", conversion: "$8" },
  ];

  return (
    <div
      className={`mt-5 transition-all origin-bottom duration-500 w-[600px] h-[120px]`}
    >
      <div
        className={`flex h-full flex-row flex-wrap items-center justify-center gap-4`}
      >
        {OPTIONS.map((option) => (
          <PriceChoice
            key={option.amount}
            amount={option.amount}
            conversion={option.conversion}
            onClick={() => onPriceChoiceClick(parseInt(option.amount))}
          />
        ))}
      </div>
    </div>
  );
};

export default PickTip;
