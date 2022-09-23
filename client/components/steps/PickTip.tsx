import { useContext, useEffect } from "react";
import useStepMessage from "../../hooks/useStepMessage";
import { StepsContext } from "../../lib/StepsProvider";
import { TipContext } from "../../lib/TipProvider";
import PriceChoice from "../PriceChoice";

const PickTip = () => {
  // Set display message
  const { setStepMessage } = useStepMessage()
  useEffect(() => setStepMessage("Pick tip amount"), [setStepMessage])

  // Context
  const { getNextStep } = useContext(StepsContext)
  const { config: tipConfig } = useContext(TipContext);

  // Handlers
  const onPriceChoiceClick = (amount: string) => {
    tipConfig.setAmount(amount);
    getNextStep();
  };

  const OPTIONS = [
    { amount: "3", conversion: "$2.4" },
    { amount: "5", conversion: "$4" },
    { amount: "10", conversion: "$8" },
  ];


  return (
    <div
      className={`mt-5 w-full`}
    >
      <div
        className='flex h-full flex-row flex-wrap items-center mb-4 justify-center gap-4'
      >
        {OPTIONS.map((option) => (
          <PriceChoice
            key={option.amount}
            amount={option.amount}
            conversion={option.conversion}
            onClick={() => onPriceChoiceClick(option.amount)}
          />
        ))}
      </div>

    </div>
  );
};

export default PickTip;
