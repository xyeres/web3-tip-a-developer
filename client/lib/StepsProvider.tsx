import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Steps } from "./enums";
import { STEPLIST, StepListItem } from "./stepList";

type StepsStrings = keyof typeof Steps;

interface StepsContext {
  getStep: (key: StepsStrings) => StepListItem | undefined;
  getNextStep: () => StepListItem | undefined;
  getPrevStep: () => StepListItem | undefined;
  getCurrentStep: () => StepListItem;
  stepMessage: string;
  setStepMessage: Dispatch<SetStateAction<string>>;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const initialStepListItem: StepListItem = {
  key: Steps.PICKTIP,
  render: () => <></>
}

const initialState = {
  getStep: () => undefined,
  getNextStep: () => initialStepListItem,
  getPrevStep: () => initialStepListItem,
  getCurrentStep: () => initialStepListItem,
  stepMessage: "Login with MetaMask to send tips*",
  setStepMessage: () => { },
  isFirstStep: true,
  isLastStep: false,
}

const StepsContext = createContext<StepsContext>(initialState);

function StepsProvider({ children }: any) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepMessage, setStepMessage] = useState(initialState.stepMessage)

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPLIST.length - 1;


  function getCurrentStep(): StepListItem {
    return STEPLIST[currentStepIndex]
  }

  function getNextStep(): StepListItem | undefined {
    let _nextIndex = (currentStepIndex + 1) % STEPLIST.length;

    // Don't allow user to round robin to first element
    if (_nextIndex === 0) return;

    setCurrentStepIndex(_nextIndex)
    return STEPLIST[_nextIndex]
  }

  function getPrevStep(): StepListItem | undefined {
    var _arrayLength = STEPLIST.length
    var _nextIndex: number;

    if (currentStepIndex == 0) {
      _nextIndex = _arrayLength - 1;
    } else {
      _nextIndex = (currentStepIndex - 1) % _arrayLength;
    }

    // Don't allow user to round robin to last element
    if (_nextIndex === _arrayLength - 1) return;

    setCurrentStepIndex(_nextIndex)
    return STEPLIST[_nextIndex]
  }

  function getStep(_key: StepsStrings): StepListItem | undefined {
    const _result = STEPLIST.find((e, index) => {
      setCurrentStepIndex(index);
      return e.key === _key;
    });

    return _result;
  }

  const context = {
    getCurrentStep,
    getStep,
    getNextStep,
    getPrevStep,
    stepMessage,
    setStepMessage,
    isFirstStep,
    isLastStep,
  };

  return (
    <StepsContext.Provider value={context}>{children}</StepsContext.Provider>
  );
}

export { StepsProvider, StepsContext };