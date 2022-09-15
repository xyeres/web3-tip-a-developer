import Message from "../components/steps/Message";
import PickTip from "../components/steps/PickTip";
import ReviewTip from "../components/steps/ReviewTip";
import ThankYou from "../components/steps/ThankYou";
import { Steps } from "./enums";

export interface StepListItem {
  key: Steps;
  render: () => JSX.Element;
}

export const STEPLIST: StepListItem[] = [
  {
    key: Steps.PICKTIP,
    render: () => {
      return <PickTip />;
    },
  },
  {
    key: Steps.MESSAGE,
    render: () => {
      return <Message />;
    },
  },
  {
    key: Steps.REVIEW,
    render: () => {
      return <ReviewTip />;
    },
  },
  {
    key: Steps.THANKYOU,
    render: () => {
      return <ThankYou />;
    },
  },
];
