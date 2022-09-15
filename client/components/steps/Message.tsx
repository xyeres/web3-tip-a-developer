import React, { ChangeEvent, FormEvent, useEffect, useContext } from "react";
import useStepMessage from "../../hooks/useStepMessage";
import { StepsContext } from "../../lib/StepsProvider";
import { TipContext } from "../../lib/TipProvider";
import StepButton from "./StepButton";

const Message = () => {
  // Set display message
  const { setStepMessage } = useStepMessage();
  useEffect(() => setStepMessage("Leave your mark"), [setStepMessage]);

  // Context
  const { tip, config: tipConfig } = useContext(TipContext);
  const { getPrevStep, getNextStep } = useContext(StepsContext);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    tipConfig.setUser(e.target.value);
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const cleanMsg = e.target.value.substring(0, 121);
    tipConfig.setMessage(cleanMsg);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getNextStep();
  };

  return (
    <div className="">
      <form
        onSubmit={handleFormSubmit}
        className="mt-4 flex flex-col items-start"
      >
        <div className="flex flex-col w-full items-start gap-2">
          <label
            className="text-gray-200 uppercase text-xs font-extrabold"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            required
            className="bg-neutral-800 text-gray-200 p-2 pl-3 w-full focus:ring ring-purple-500 outline-none"
            value={tip.user}
            placeholder="Your name is cool"
            id="name"
            name="name"
            type="text"
            onChange={onNameChange}
          />
        </div>
        <div className="mt-4 mb-5 w-full flex flex-col items-start gap-2">
          <label
            className="text-gray-200 uppercase text-xs font-extrabold"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            required
            className="bg-neutral-800 text-gray-200 w-full p-2 pl-3 focus:ring ring-purple-500 outline-none"
            maxLength={120}
            placeholder="A little note... you know you want to (it's required, lol)"
            value={tip.message}
            id="message"
            rows={5}
            name="message"
            onChange={onMessageChange}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <StepButton
            title="Next"
            type="submit"
          />
          <StepButton
            title="Prev"
            onClick={() => getPrevStep()}
          />
        </div>
      </form>
    </div>
  );
};

export default Message;
