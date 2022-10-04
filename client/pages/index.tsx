// /* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import type { Memo } from "../components/Memos";
import Memos from "../components/Memos";
import Pill from "../components/Pill";
import CurrentStep from "../components/CurrentStep";
import { getTipContract } from "../utils/getTipContract";
import github from "../public/imgs/github.svg";
import linkedin from "../public/imgs/linkedin.svg";
import twitter from "../public/imgs/twitter.svg";

import { Tween, Timeline } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Profile: NextPage = () => {
  var pillConfig = {
    trigger: ".text-info",
    start: "-140px top",
    end: "300px 200px",
    scrub: 2,
  };

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

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
    tipADeveloper.on("NewMemo", handleOnNewMemo);
    return () => {
      if (tipADeveloper) {
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
          <Tween
            ease="slow(0.7, 0.7, false)"
            to={{
              y: "-180px",
              // opacity: 0,
              scrollTrigger: {
                trigger: ".text-info",
                start: "-170px top",
                end: "330px 200px",
                scrub: 1,
              },
            }}
          >
            <span className="profile-image">
              <Image
                className="rounded-full"
                alt="Michael Carr, front end developer"
                src="/imgs/profile.jpg"
                width={190}
                height={190}
              />
            </span>
          </Tween>
          <Tween
            to={{
              y: "-120px",
              scrollTrigger: {
                trigger: ".text-info",
                start: "-170px top",
                end: "300px 200px",
                scrub: 2,
              },
            }}
          >
            <div className="text-info flex flex-col items-center md:block text-center md:text-left">
              <h1 className="text-[2.1rem] font-semibold">Michael Carr</h1>
              <h2 className="ml-[1px] capitalize font-light text-[1.1rem]">
                Front end developer
              </h2>
              <p className="mt-5 mx-4 md:mx-1 text-sm font-light max-w-[390px]">
                Creatively solving UI design problems with modern tools such as
                Next.js, React, Ethers.js and Solidity Smart Contracts.
              </p>
              <p className="mt-4 mx-4 md:mx-0 text-sm">
                What projects are you working on currently?
                  <br />Let&apos;s chat!
              </p>
              <div className="mt-4 md:mt-4 flex flex-row gap-2 flex-wrap justify-center     md:justify-start">
                <Tween
                  to={{
                    // y: "-170px",
                    opacity: 0,
                    scrollTrigger: pillConfig,
                  }}
                >
                  <span className="mt-3">
                    <Pill
                      platform="github"
                      link="https://github.com/xyeres"
                      icon={github}
                      title="xyeres"
                    />
                  </span>
                </Tween>
                <Tween
                  to={{
                    // y: "-120px",
                    opacity: 0,
                    scrollTrigger: pillConfig,
                  }}
                >
                  <span className="mt-3">
                    <Pill
                      platform="linkedin"
                      link="https://www.linkedin.com/in/mxcarr/"
                      icon={linkedin}
                      title="mxcarr"
                    />
                  </span>
                </Tween>
                <Tween
                  to={{
                    // y: "-200px",
                    opacity: 0,
                    scrollTrigger: pillConfig,
                  }}
                >
                  <span className="mt-3">
                    <Pill
                      platform="twitter"
                      link="https://twitter.com/xyeres"
                      icon={twitter}
                      title="xyeres"
                    />
                  </span>
                </Tween>
              </div>
            </div>
          </Tween>
        </main>
        <Tween
          to={{
            y: "-70px",
            // opacity: 0,
            scrollTrigger: {
              trigger: ".projects",
              start: "0px center",
              end: "+=500px 200px",
              scrub: 1,
            },
          }}
        >
          <section className="projects bg-white z-50 mx-auto px-7 w-full my-0 justify-center flex flex-col flex-wrap">
            <div className="text-center my-16">
              <h1 className="text-3xl">Projects</h1>
              <p className="text-gray-500">
                Projects I&apos;m actively building or contributing to
              </p>
            </div>
            <div className="flex flex-row flex-wrap mx-auto w-full my-0 justify-center gap-8">
              {/* CARDS #1 */}
              <div className="mb-4 rounded-xl max-w-lg lg:max-w-xs ring ring-pink-500 p-7 flex flex-col">
                <div className="w-full flex-col flex items-start gap-2 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 flex">
                      <Image
                        src={"/imgs/constellation-logo.png"}
                        alt="Constellation labs"
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className="font-extralight text-2xl text-black">
                      Constellation Labs
                    </p>
                  </div>
                  <p className="font-extralight mt-2">
                    Anyone can fund their next project through decentralized
                    web3 crowdfunding
                  </p>
                </div>
                <div className="text-gray-500">
                  <p className="text-xs mt-5 pt-5 border-t">
                    UI Design, Development, Architecture
                  </p>
                  <p className="text-xs mt-3 inline-block bg-pink-300 text-gray-500 p-1">
                    Solidity, ethers.js, Next.js
                  </p>
                </div>
                <div className="flex flex-col mt-5 lg:mt-auto">
                  <button
                    disabled
                    className="cursor-not-allowed bg-pink-200 text-white font-bold px-4 py-2 rounded-full text-xs"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>

              {/* CARD #2 */}
              <div className="mb-4 rounded-xl max-w-lg lg:max-w-xs ring ring-blue-400 p-7 flex flex-col">
                <div className="flex flex-col justify-center items-start">
                  <div>
                    <Image
                      width={200}
                      height={46}
                      src="/imgs/ss-logo-full.svg"
                      alt="Sound Splits logo"
                    />
                    <p className="sr-only">Sound Splits Logo</p>
                  </div>
                  <p className="font-extralight">
                    SaaS processing 10M+ monthly rows of royalty data for labels
                    and publishers
                  </p>
                </div>
                <div className="text-gray-500">
                  <p className="text-xs mt-5 pt-5 border-t">
                    UI Design, Development, System Design
                  </p>
                  <p className="text-xs mt-3 inline-block bg-blue-200 text-gray-500 font p-1">
                    React, Django, PostgreSQL
                  </p>
                </div>
                <div className="flex flex-col mt-5 lg:mt-auto">
                  <a
                    href="https://www.soundsplits.com"
                    className="text-center font-bold hover:bg-blue-700 bg-blue-500 outline-none focus:ring-4 ring-blue-200 text-white px-4 py-2 rounded-full text-xs"
                  >
                    View
                  </a>
                </div>
              </div>

              {/* CARD #3 */}
              <div className="mb-4 rounded-xl ring max-w-lg lg:max-w-xs ring-yellow-400 p-7 flex flex-col">
                <div className="flex flex-col justify-center items-start">
                  <p className="font-extrabold text-2xl uppercase">StreamY</p>
                  <p className="font-extralight mt-4">
                    Subscribers-only music streaming for United Pursuit Records
                    delivering exclusive music to their most loyal fans
                  </p>
                </div>
                <div className="text-gray-500">
                  <p className="text-xs mt-5 pt-5 border-t">
                    Design &amp; Development, System Design
                  </p>
                  <p className="text-xs mt-3 inline-block bg-yellow-200 text-gray-500 p-1">
                    Next.js, React, Firebase
                  </p>
                </div>
                <div className="flex flex-col pt-5 mt-auto">
                  <a
                    href="https://listen.unitedpursuit.com"
                    className="hover:bg-yellow-700 outline-none focus:ring-4 ring-yellow-300 font-bold text-center bg-yellow-500 text-white px-4 py-2 rounded-full text-xs"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Tween>
        <section className="mx-auto my-0 mt-28">
          <p className="text-center font-light text-xl text-gray-400">
            Some friend&apos;s are cheering...
          </p>
          <div className="mx-0">
            <Memos memos={memos} />
          </div>
        </section>

        <section className="relative mx-auto h-full my-0 mt-32 text-center items-center justify-center flex flex-col ">
          <h2 className="text-3xl">Want to cheers too?</h2>
          <CurrentStep />
        </section>
      </div>

      <footer className="footer-bg-minimal relative mt-32 bg-cover min-h-[36vh] flex flex-row bg-black justify-center">
        <div className="text-xs mt-8 flex flex-col px-4 justify-between text-center text-gray-500">
          <Tween
            from={{ opacity: 0 }}
            to={{
              opacity: 1,
              scrollTrigger: {
                trigger: ".footer-bg-minimal",
                start: "150px bottom",
                end: "bottom end",
              },
            }}
            duration={0.65}
            target={0}
          >
            <p>
              *By sending crypto to me using this form, you agree that this is a
              free-will donation with no promised return in goods or services.
              No refunds.
            </p>
          </Tween>
          <Tween
            from={{ opacity: 0 }}
            to={{
              opacity: 1,
              scrollTrigger: {
                trigger: ".footer-bg-minimal",
                start: "91% bottom",
                end: "bottom end",
              },
            }}
            duration={0.75}
            target={1}
          >
            <p className="text-[.6rem] text-white mb-10">
              &copy;2022 Michael Carr
            </p>
          </Tween>
        </div>
        {/* <p className="text-gray-200 max-w-xs self-center font-light text-md">I am a Front End Developer focusing on building creative solutions for web and mobile. I have experience building multi-tiered SaaS and Single Page Apps in a React, Next.js stack.</p> */}
      </footer>
    </>
  );
};

export default Profile;
