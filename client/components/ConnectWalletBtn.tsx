import Image from "next/image";
import { MouseEventHandler } from "react";
import metamask from "../public/imgs/metamask.svg";
import Spinner from "./Spinner";

type Props = {
  connectWallet: MouseEventHandler<HTMLButtonElement>;
  title: string;
  isLoading: boolean;
};

const ConnectWalletBtn = (props: Props) => {


  return (
    <button
      onClick={props.connectWallet}
      className="mt-[43px] font-bold flex flex-row items-center gap-[19px] bg-[#222222] hover:bg-[#2f2f2f] py-3 px-5 rounded-[10px] border-b-[3px] active:translate-y-[3px] hover:translate-y-[1px] hover:mt-[44px] hover:border-b-[2px] border-white transition-all active:border-b-0 active:mb-[2px]"
    >
      {
        props.isLoading ? <Spinner /> :
          <Image alt="MetaMask logo" src={metamask} width={35} height={33} />
      }
      {props.title}
    </button>
  );
};

export default ConnectWalletBtn;
