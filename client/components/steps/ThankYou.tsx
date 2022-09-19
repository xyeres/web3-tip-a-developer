import { useEffect } from "react";
import useStepMessage from "../../hooks/useStepMessage";

const ThankYou = () => {
  // Set display message
  const { setStepMessage } = useStepMessage();
  useEffect(() => setStepMessage(""), [setStepMessage]);

  return (
    <div className='max-w-xs mt-4 text-sm'>
      Wow, thank you! Your kindness will appear in the memo list above shortly.
    </div>
  )
}

export default ThankYou