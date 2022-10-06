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
import CardList from "../components/projects/CardList";

// Animations
import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

// Modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
gsap.registerPlugin(ScrollTrigger);

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
    thumbnailClass: ""
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

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
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
      <main className="header-bg-minimal max-w-lg min-w-full min-h-[100vh] md:min-h-0 py-24 md:py-48 justify-center text-gray-100 mx-auto my-0 flex flex-col md:flex-row gap-8 items-center">
        <Tween
          ease="slow(0.7, 0.7, false)"
          to={{
            // y: "-180px",
            opacity: 0,
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
            opacity: 0,
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
              <br />
              Let&apos;s chat!
            </p>
            <div className="mt-4 md:mt-4 flex flex-row gap-2 flex-wrap justify-center     md:justify-start">
              <Tween
                to={{
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
          y: "-250px",
          scrollTrigger: {
            trigger: ".projects",
            start: "0px center",
            end: "+=100% 20px",
            scrub: 1,
          },
        }}
      >
        <section className="projects bg-white py-10 z-50 mx-auto px-7 w-full my-0 justify-center flex flex-col flex-wrap">
          <div className="text-center my-16">
            <h1 className="text-3xl">Projects</h1>
            <p className="text-gray-500 mt-2">
              Projects I&apos;m actively building &amp; contributing to
            </p>
          </div>
          <div className="flex flex-row flex-wrap mx-auto w-full my-0 justify-center gap-8">
            <CardList />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center">
          <h2 className="text-xl pt-14">UI Design</h2>
          <p className="text-gray-500 pb-6">
            Examples of my design work
          </p>
          <div className="flex flex-row items-center justify-center my-4">
            <button
              className="hover:bg-purple-300 outline-none focus:ring-4 ring-purple-200 font-bold text-center bg-purple-200 text-white px-4 py-2 rounded-full text-xs"
              onClick={onOpenModal}>View Project 1</button>
            <Modal
              classNames={{
                modal: "min-w-[92vw] rounded-lg min-h-[90vh]",
              }}
              open={open}
              onClose={onCloseModal}
              center
            >
              <div className="grid pt-7 w-full h-full place-items-center">
                <ImageGallery slideDuration={180} showNav={false} showPlayButton={false} items={images} />
                {/* <Image
                  src="/imgs/proj-home.jpg"
                  width={620}
                  height={1401}
                  alt="project screenshot"
                /> */}
                <p className="py-10 max-w-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Fuga voluptate odio consectetur, accusantium minima optio,
                  est blanditiis incidunt repellat aut sequi dolorum dolor in
                  nam nobis. Vel placeat dicta inventore. Dolorem sunt,
                  quaerat ducimus hic ullam ab laudantium omnis a consectetur
                  facilis similique nisi earum quasi sapiente eius, voluptate
                  debitis expedita sequi architecto eligendi cupiditate
                  quisquam ratione temporibus doloribus. Quasi. Corporis
                  facilis quo vitae in deserunt tempore dolor, temporibus quas
                  harum rerum tempora excepturi sed soluta accusamus et
                  recusandae animi necessitatibus dignissimos! Iure accusamus
                  placeat hic dolore ex omnis vero!</p>
              </div>
            </Modal>
          </div>
        </section>
      </Tween>

      <Tween
        to={{
          y: "-200px",
          scrollTrigger: {
            trigger: ".projects",
            endTrigger: ".footer-bg-minimal",
            start: "0px center",
            end: "top top",
            scrub: 1.25,
          },
        }}
      >

        <section className="mx-auto my-0 mt-20">
          <div className="text-center">
            <h1 className="text-3xl">Cheers</h1>
            <p className="text-gray-400">Some friend&apos;s are cheering...</p>
          </div>
          <div className="mx-0">
            <Memos memos={memos} />
          </div>
        </section>

        <section className="relative mx-auto h-full my-0 mt-32 text-center items-center justify-center flex flex-col ">
          <h2 className="text-3xl">Want to cheers too?</h2>
          <CurrentStep />
        </section>
      </Tween>
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
        {/* <p className="text-gray-200 max-w-xs self-center font-light text-md">I am a Front End Developer focusing on building creative solutions for web and mobile. I have experience building multi-tiered SaaS and Single Page Apps in a React, Next.js stacks.</p> */}
      </footer>

    </>
  );
};

export default Profile;
