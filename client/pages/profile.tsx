import { ethers } from "ethers";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConnectWalletBtn from "../components/ConnectWalletBtn";
import type { Memo } from "../components/Memos";
import Memos from "../components/Memos";
import Pill from "../components/Pill";
import PriceChoice from "../components/PriceChoice";
import connectMetaMask from "../helpers/connectMetaMask";
import github from "../public/imgs/github.svg";
import linkedin from "../public/imgs/linkedin.svg";
import twitter from "../public/imgs/twitter.svg";
import abi from "../utils/BuyMeACoffee.json";

const Profile: NextPage = () => {
  var memosInitialState: Memo[] = [
    {
      msg: "Another great website you did for us, thanks!",
      author: "Tommy Bahama",
      amount: "4 MATIC",
    },
    {
      msg: "What a standup on Friday! lol",
      author: "Ding Dong",
      amount: "2 MATIC",
    },
  ];

  // Contract Address & ABI
  const contractAddress = "0x928514150f5914625CfBb6De11E432De4674c785";
  const contractABI = abi.abi;

  // Component state
  const [memos, setMemos] = useState(memosInitialState);
  const [currentAccount, setCurrentAccount] = useState();
  const [error, setError] = useState<Error | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const options = [
    { amount: "3", conversion: "$2.4" },
    { amount: "5", conversion: "$4" },
    { amount: "10", conversion: "$8" },
  ];

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });

      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);

        return true;
      } else {
        console.log("make sure MetaMask is connected");

        return false;
      }
    } catch (error) {
      console.error("Error, wallet is not connected: ", error);
    }
  };

  const onConnectMetaMask = async () => {
    setError(null);

    const [account, error] = await connectMetaMask();

    if (error) {
      setError(error);
      return;
    }

    setCurrentAccount(account);
  };

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..");
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    // try {
    //   const { ethereum } = window;
    //   if (ethereum) {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const buyMeACoffee = new ethers.Contract(
    //       contractAddress,
    //       contractABI,
    //       signer
    //     );
    //     console.log("fetching memos from the blockchain..");
    //     const memos = await buyMeACoffee.getMemos();
    //     console.log("fetched!");
    //     setMemos(memos);
    //   } else {
    //     console.log("Metamask is not connected");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    var buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
        },
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <>
      <div className="blob min-h-[90vh]">
        <div className="header-bg min-h-[62px] md:min-h-[32px] bgAnimation"></div>
        <main className="max-w-lg mx-auto my-0 mt-[60px] md:mt-[100px] flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0 aspect-square max-w-[170px] rounded-full grid place-content-center border-4 border-white">
            <Image
              className="rounded-full"
              alt="michael carr"
              src="/imgs/profile.jpg"
              width={170}
              height={170}
            />
          </div>
          <div className="flex flex-col items-center md:block text-center md:text-left">
            <h1 className="text-[2rem] font-semibold">Michael Carr</h1>
            <h3 className="font-bold mx-1 text-[.95rem]">
              Front end developer building web3
            </h3>
            <h2 className="mt-3 mx-1 text-sm max-w-[390px]">
              Got a project you want to chat about? Let&apos;s talk. Reach out
              with one of the following:
            </h2>
            <div className="mt-4 md:mt-2 flex flex-row gap-2 flex-wrap justify-center md:justify-start">
              <Pill
                platform="github"
                link="https://github.com/xyeres"
                icon={github}
                title="xyeres"
              />
              <Pill
                platform="linkedin"
                link="https://linkedin.com/mxcarr"
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
        </main>

        <section className="max-w-lg mx-auto my-0 mt-[84px]">
          <p className="text-center text-sm font-bold">
            Some friend&apos;s are cheering...
          </p>
          <div className="mx-4 md:mx-0">
            <Memos memos={memos} />
          </div>
        </section>

        <section className="relative mx-auto h-full my-0 mt-[96px] text-center items-center justify-center flex flex-col ">
          <h2 className="text-[1.75rem] font-semibold">Want to cheers too?</h2>
          <p className="text-[#AAAAAA]">Connect wallet to send a crypto tip*</p>

          <div
            className={`mt-5 transition-all origin-bottom duration-500 w-[600px] h-[120px]`}
          // ${
          //   isWallet ? "scale-100" : "scale-0 h-0 overflow-hidden"
          // }
          >
            <div
              className={`flex h-full flex-row flex-wrap items-center justify-center gap-4`}
            >
              {options.map((option) => (
                <PriceChoice
                  key={option.amount}
                  amount={option.amount}
                  conversion={option.conversion}
                />
              ))}
            </div>
          </div>

          <ConnectWalletBtn title="Connect with MetaMask" connectWallet={onConnectMetaMask} />

          {error && <p className="mt-3 text-red-700">Error: {error.message}</p>}

        </section>
      </div>

      <footer className="min-h-[30vh] footer-bg">
        <p className="text-xs pt-14 px-4 text-center text-[#8a8a8a]">
          * (Send $MATIC on Polygon only). By sending crypto to my address using
          this form, you agree that this is a free-will donation with no
          promised return in goods or services. No refunds.
        </p>
      </footer>
    </>
  );
};

export default Profile;
