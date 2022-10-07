// /* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Memos from "../components/Memos";
import Pill from "../components/Pill";
import CurrentStep from "../components/CurrentStep";
import github from "../public/imgs/github.svg";
import linkedin from "../public/imgs/linkedin.svg";
import twitter from "../public/imgs/twitter.svg";
import CardList from "../components/projects/CardList";
import DesignCard from "../components/projects/DesignCard";
import HunterProj from "../components/projects/HunterProj";
import SplitsProj from "../components/projects/SplitsProj";

// Animations
import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);

// Modal
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Profile: NextPage = () => {
  const [openHunter, setOpenHunter] = useState(false);
  const onOpenHunterModal = () => setOpenHunter(true);
  const onCloseHunterModal = () => setOpenHunter(false);

  const [openSoundSplits, setOpenSoundSplits] = useState(false);
  const onOpenSoundSplitsModal = () => setOpenSoundSplits(true);
  const onCloseSoundSplitsModal = () => setOpenSoundSplits(false);

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

      <main
        id="header"
        className="header-bg-minimal max-w-lg min-w-full min-h-[100vh] md:min-h-0 py-24 md:py-48 justify-center text-gray-100 mx-auto my-0 flex flex-col md:flex-row gap-8 items-center"
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
            <span className="mt-3">
              <Pill
                platform="github"
                link="https://github.com/xyeres"
                icon={github}
                title="xyeres"
              />
            </span>

            <span className="mt-3">
              <Pill
                platform="linkedin"
                link="https://www.linkedin.com/in/mxcarr/"
                icon={linkedin}
                title="mxcarr"
              />
            </span>

            <span className="mt-3">
              <Pill
                platform="twitter"
                link="https://twitter.com/xyeres"
                icon={twitter}
                title="xyeres"
              />
            </span>
          </div>
        </div>
      </main>

      <section className="projects bg-white py-10 z-50 mx-auto px-7 w-full my-0 justify-center flex flex-col flex-wrap">
        <div className="text-center my-16">
          <h1 className="text-3xl">Projects</h1>
          <p className="text-gray-500 mt-2">
            Projects I&apos;m actively building &amp; maintaining
          </p>
        </div>

        <div className="flex flex-row flex-wrap mx-auto w-full my-0 justify-center gap-8">
          <CardList />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <h2 className="text-xl pt-14">UI Design</h2>
        <p className="text-gray-500 pb-6">User interface and design showcase</p>
        <div className="flex flex-wrap flex-row items-start justify-center">
          <div className="mx-2 px-0 md:mx-2 md:px-5">
            <DesignCard
              position="absolute top-9 right-16"
              bgSrc="/imgs/ss-thumb.png"
              layerSrc="/imgs/ss-thumb-layer.png"
              onClick={onOpenSoundSplitsModal}
            />
            <div className="pb-4 px-4">
              <p className="text-lg font-light text-gray-500">Sound Splits</p>
              <p className="text-sm text-gray-400">Landing page redesign</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 mx-2 px-0 md:mx-2 md:px-5">
            <DesignCard
              position="absolute top-9 right-[33%]"
              bgSrc="/imgs/hunter-thumb.png"
              layerSrc="/imgs/hunter-thumb-layer.png"
              onClick={onOpenHunterModal}
            />
            <div className="pb-4 px-4">
              <p className="text-lg font-light text-gray-500">
                Hunter Magazine
              </p>
              <p className="text-sm text-gray-400">Concept site design</p>
            </div>
          </div>
          <Modal
            classNames={{
              modal: "min-w-[80vw] rounded-lg min-h-[98vh]",
            }}
            open={openHunter}
            onClose={onCloseHunterModal}
            center
          >
            <HunterProj />
          </Modal>
          <Modal
            classNames={{
              modal: "min-w-[80vw] rounded-lg min-h-[98vh]",
            }}
            open={openSoundSplits}
            onClose={onCloseSoundSplitsModal}
            center
          >
            <SplitsProj />
          </Modal>
        </div>
      </section>

      <section className="mx-auto my-0 mt-20">
        <div className="text-center">
          <h1 className="text-3xl">Cheers</h1>
          <p className="text-gray-400">Some friend&apos;s are cheering...</p>
        </div>
        <div className="mx-0">
          <Memos />
        </div>
      </section>

      <section className="relative mx-auto h-full my-0 mt-32 text-center items-center justify-center flex flex-col ">
        <h2 className="text-3xl">Want to cheers too?</h2>
        <CurrentStep />
      </section>
      <footer className="footer-bg-minimal relative mt-32 bg-cover min-h-[36vh] flex flex-row bg-black justify-center">
        <div className="text-xs mt-8 flex flex-col px-4 justify-between text-center text-gray-500">
          <p>
            *By sending crypto to me using this form, you agree that this is a
            free-will donation with no promised return in goods or services. No
            refunds.
          </p>

          <p className="text-[.6rem] text-white mb-10">
            &copy;2022 Michael Carr
          </p>
        </div>
      </footer>
    </>
  );
};

export default Profile;
