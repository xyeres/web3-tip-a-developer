import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { StepProps } from "../Web3Start";

const WriteMessage = ({
  userName,
  userMessage,
  setUserName,
  setUserMessage,
  setStep,
  setTipmessage,
}: StepProps) => {
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const cleanMsg = e.target.value.substring(0, 121);
    setUserMessage(cleanMsg);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("review");
  };

  function handleBackBtn() {
    setStep("pickTip");
  }

  useEffect(() => {
    setTipmessage("Write a note and give yourself a name");
  }, [setTipmessage]);

  return (
    <div className="w-[270px]">
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
            value={userName}
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
            value={userMessage}
            id="message"
            rows={5}
            name="message"
            onChange={onMessageChange}
          />
        </div>
        <button
          className="p-2 text-[.9rem] mb-2 hover:bg-purple-400 active:bg-purple-400 bg-purple-700 w-full focus:ring ring-purple-100 outline-none"
          type="submit"
        >
          Next
        </button>
        <button
          className="p-2 text-[.9rem] hover:bg-gray-400 active:bg-gray-600 bg-gray-500 w-full focus:ring ring-purple-100 outline-none"
          onClick={handleBackBtn}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default WriteMessage;
