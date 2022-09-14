import Image from "next/image";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect } from "react";
import useMetamask from "../hooks/useMetamask";
import metamask from "../public/imgs/metamask.svg";
import Spinner from "./Spinner";

type Props = {
  connectWallet: MouseEventHandler<HTMLButtonElement>;
  title: string;
  isLoading: boolean;
  disabled?: boolean;
  setTipmessage: Dispatch<SetStateAction<string>>;
};

const ConnectWalletBtn = ({ setTipmessage, title, isLoading, disabled, connectWallet }: Props) => {
  useEffect(() => {
    setTipmessage("Login with MetaMask to send tip*");
  }, [setTipmessage])

  return (
    <button
      disabled={disabled}
      onClick={connectWallet}
      className="disabled:cursor-not-allowed disabled:grayscale mt-[23px] font-bold flex flex-row items-center gap-[19px] bg-[#222222] hover:bg-[#2f2f2f] py-3 px-5 rounded-[10px] border-b-[3px] active:translate-y-[3px] hover:translate-y-[1px] hover:mt-[24px] hover:border-b-[2px] border-white transition-all active:border-b-0 active:mb-[2px]"
    >
      {
        isLoading ? <Spinner /> :
          <Image alt="MetaMask logo" src={metamask} width={35} height={33} />
      }
      {title}
    </button>
  );
};

export default ConnectWalletBtn;
