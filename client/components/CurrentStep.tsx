import React, { useContext } from "react";
import { StepsContext } from "../lib/StepsProvider";

const CurrentStep = () => {
  const steps = useContext(StepsContext);
  return (
    <React.Fragment>
      <p className="text-[#AAAAAA]">{steps.stepMessage}</p>
      <div className="flex flex-col items-center w-2/3 md:w-1/2 lg:w-1/3">
        {steps.getCurrentStep().render()}
      </div>
    </React.Fragment>
  );
};

export default CurrentStep;
