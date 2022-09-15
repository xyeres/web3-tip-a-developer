import React, { useContext } from "react";
import { StepsContext } from "../lib/StepsProvider";

const StepsPage = () => {
  const stepsContext = useContext(StepsContext)

  return (
    <div className="m-6">
      <div className="m-4">{stepsContext.getCurrentStep().render()}</div>
    </div>
  );
};

export default StepsPage;
