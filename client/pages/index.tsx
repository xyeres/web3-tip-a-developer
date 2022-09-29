// /* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Memo } from "../components/Memos";
import Memos from "../components/Memos";
import Pill from "../components/Pill";
import CurrentStep from "../components/CurrentStep";
import { getTipContract } from "../utils/getTipContract";
import github from "../public/imgs/github.svg";
import linkedin from "../public/imgs/linkedin.svg";
import twitter from "../public/imgs/twitter.svg";

const Profile: NextPage = () => {
  var memosInitialState: Memo[] = [
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

      // Set only last 3 memos
      setMemos(memos);

      console.log("Memos fetched!");
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
    console.log("event listener on");
    tipADeveloper.on("NewMemo", handleOnNewMemo);
    return () => {
      if (tipADeveloper) {
        console.log("event listener off");
        tipADeveloper.off("NewMemo", handleOnNewMemo);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Michael Carr | Tip A Developer</title>
        <meta
          name="description"
          content="Michael Carr profile on Tip a Developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[90vh]">
        <main className="header-bg-minimal max-w-lg min-w-full min-h-[100vh] md:min-h-0 py-24 md:py-48 justify-center text-gray-100 mx-auto my-0 flex flex-col md:flex-row gap-8 items-center">
          <Image
            className="rounded-full"
            alt="Michael Carr, front end developer"
            src="/imgs/profile.jpg"
            width={190}
            height={190}
          />
          <div className="flex flex-col items-center md:block text-center md:text-left">
            <h1 className="text-[2.1rem] font-semibold">Michael Carr</h1>
            <h2 className="ml-[1px] font-extralight text-[1.1rem]">
              Front end developer
            </h2>
            <p className="mt-5 mx-1 text-sm max-w-[390px]">
              Got a project you want to chat about? <br />Reach out
              with one of the following:
            </p>
            <div className="mt-4 md:mt-4 flex flex-row gap-2 flex-wrap justify-center md:justify-start">
              <Pill
                platform="github"
                link="https://github.com/xyeres"
                icon={github}
                title="xyeres"
              />
              <Pill
                platform="linkedin"
                link="https://www.linkedin.com/in/mxcarr/"
                icon={linkedin}
                title="mxcarr"
              />
              <Pill
                platform="twitter"
                link="https://twitter.com/xyeres"
                icon={twitter}
                title="xyeres"
              />
            </div>
          </div>
          <p className="text-gray-700 text-xl font-extralight animate-bounce absolute bottom-10 md:hidden">Scroll</p>
        </main>

        <section className="mx-auto w-full my-0 justify-center flex flex-col flex-wrap">
          <p className="text-center my-16 font-light text-3xl text-gray-300">
            Projects
          </p>
          <div className="flex flex-row mx-auto w-full my-0 justify-center gap-8">
            <div className="relative flex-shrink flex-grow-0">
              <div className="bg-gray-100 p-4 h-[130px] mb-4 flex flex-col">
                <p className="font-extralight text-2xl mt-auto">Streamy</p>
                <p className="font-extralight text-sm">United Pursuit Records</p>
              </div>
              {/* <Image src={'/imgs/streamy.png'} layout="fill" alt="bl" /> */}
            </div>

            <div className="relative">
              <div className="bg-neutral-800 h-[130px] mb-4"></div>
            </div>

            <div className="relative">
              <div className="bg-neutral-800 h-[130px] mb-4"></div>
            </div>
          </div>
        </section>

        <section className="mx-auto my-0 mt-28">
          <p className="text-center font-light text-xl text-gray-400">
            Some friend&apos;s are cheering...
          </p>
          <div className="mx-4 md:mx-0">
            <Memos memos={memos} />
          </div>
        </section>

        <section className="relative mx-auto h-full my-0 mt-28 text-center items-center justify-center flex flex-col ">
          <h2 className="text-[1.75rem] font-semibold">Want to cheers too?</h2>
          <CurrentStep />
        </section>
      </div>

      <footer className="min-h-[20vh] flex items-end justify-center">
        <p className="text-xs px-4 mb-4 text-center text-[#8a8a8a]">
          *By sending crypto to me using this form, you agree that this is a
          free-will donation with no promised return in goods or services. No
          refunds.
        </p>
      </footer>
    </>
  );
};

export default Profile;
