import { useContext, useEffect, useState } from "react";
import { DIRECTION } from "../../lib/enums";
import { StepListItem } from "../../lib/StepList";
import { StepsContext } from "../../lib/StepsProvider";
import StepButton from "./StepButton";


export type DirectionStrings = keyof typeof DIRECTION;


export default function DefaultButtons() {
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPrevDisabled, setPrevDisabled] = useState(false);

  const stepsContext = useContext(StepsContext);

  useEffect(() => {
    if (stepsContext.isFirstStep) {
      setNextDisabled(false);
      setPrevDisabled(true);
    } else if (stepsContext.isLastStep) {
      setNextDisabled(true);
      setPrevDisabled(false);
    } else {
      setNextDisabled(false);
      setPrevDisabled(false);
    }
  }, [stepsContext.isFirstStep, stepsContext.isLastStep]);

  function handleStepBtn(direction: DirectionStrings): void {
    var stepItem: StepListItem | undefined;

    if (direction === "NEXT") {
      stepItem = stepsContext.getNextStep();
    } else {
      stepItem = stepsContext.getPrevStep();
    }
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <StepButton
        title="Next"
        disabled={isNextDisabled}
        onClick={() => handleStepBtn("NEXT")}
        className="bg-blue-700 py-2 text-sm px-6 disabled:opacity-50"
      />
      {!isPrevDisabled && <StepButton
        title="Prev"
        disabled={isPrevDisabled}
        onClick={() => handleStepBtn("PREV")}
      />}
    </div>
  );
};