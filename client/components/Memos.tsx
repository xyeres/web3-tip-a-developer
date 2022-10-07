import { useState, useCallback, useEffect } from "react";
import Marquee from "react-marquee-slider";
import { getTipContract } from "../utils/getTipContract";

export type Memo = {
  address: string;
  timestamp: number;
  name: string;
  message: string;
  date: string;
};

const memosInitialState: Memo[] = [
  {
    address: "",
    timestamp: 1663783113800,
    name: "Tommy",
    message: "Another great website you did for us, thanks!",
    date: "8/20/22",
  },
  {
    address: "",
    timestamp: 1663783113400,
    name: "Matthew",
    message: "What a standup on Friday! lol",
    date: "8/27/22",
  },
  {
    address: "",
    timestamp: 1663783113300,
    name: "Ashley",
    message: "What a standup on Friday! lol",
    date: "9/10/22",
  },
];

const Memos = () => {

  // Hooks
  const tipADeveloper = getTipContract();

  // Component state
  const [memos, setMemos] = useState(memosInitialState);
  const getMemos = useCallback(async () => {
    try {
      let memos: Memo[] = await tipADeveloper.getMemos();

      // Add formated date to each memo
      memos = memos.map((memo) => {
        let memoWithDate = {
          ...memo,
          date: new Date(memo.timestamp * 1000).toLocaleDateString(),
        };
        return memoWithDate;
      });

      memos = memos.slice(-6);
      memos.sort((a, b) => b.timestamp - a.timestamp);
      setMemos(memos);
      
    } catch (error) {
      console.log(error);
    }
  }, [tipADeveloper]);

  /* useEffects: */

  useEffect(() => {
    getMemos();
  }, []);

  // new memo event handler
  function handleOnNewMemo() {
    getMemos();
  }

  useEffect(() => {
    tipADeveloper.on("NewMemo", handleOnNewMemo);
    return () => {
      if (tipADeveloper) {
        tipADeveloper.off("NewMemo", handleOnNewMemo);
      }
    };
  }, []);

  return (
    <div>
      <Marquee
        velocity={15}
        scatterRandomly={false}
        onFinish={() => { }}
        onInit={() => { }}
        direction="rtl"
        resetAfterTries={200}
      >
        {memos.map((memo: Memo) => (
          <div
            tabIndex={0}
            key={memo.timestamp.toString()}
            className="hover:opacity-100 focus:ring-4 outline-none ring-blue-400 hover:ring-blue-300 hover:ring-4 mc-shadow bg-white transition-all duration-150 opacity-75 mt-[43px] mb-4 ml-10 p-6 flex flex-col"
          >
            <p className="text-xl font-extralight">{memo.message}</p>
            <span className="self-end mt-3 text-[.675rem]">
              <>
                &mdash; {memo.name} on {memo.date}
              </>
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Memos;
