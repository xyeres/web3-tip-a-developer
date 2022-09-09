import React from "react";
import { MetaMaskState } from "../lib/store";
import PriceChoice from "./PriceChoice";

type Props = {
  state: MetaMaskState;
};

const PickTip = ({ state }: Props) => {
  const currentWalletAcc = state.account[0];

  // Handlers
  const onPriceChoiceClick = (amount: number) => {
    console.log('Tip amount:', amount)
  };

  const OPTIONS = [
    { amount: "3", conversion: "$2.4" },
    { amount: "5", conversion: "$4" },
    { amount: "10", conversion: "$8" },
  ];

  return (
    <div
      className={`mt-5 transition-all origin-bottom duration-500 w-[600px] h-[120px] 
            ${currentWalletAcc ? "scale-100" : "scale-0 h-0 overflow-hidden"}
            `}
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
