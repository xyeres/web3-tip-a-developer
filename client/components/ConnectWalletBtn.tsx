import Image from "next/image";
import { MouseEventHandler } from "react";
import metamask from "../public/imgs/metamask.svg";
import Spinner from "./Spinner";

type Props = {
  connectWallet: MouseEventHandler<HTMLButtonElement>;
  title: string;
  isLoading: boolean;
  disabled?: boolean;
};

const ConnectWalletBtn = ({
  title,
  isLoading,
  disabled,
  connectWallet,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={connectWallet}
      className="disabled:cursor-not-allowed disabled:grayscale mt-[23px] font-bold flex flex-row items-center gap-[19px] bg-gray-100 hover:bg-gray-200 py-3 px-5 rounded-[10px] border-b-[3px] active:translate-y-[3px] hover:translate-y-[1px] hover:mt-[24px] hover:border-b-[2px] border-gray-400 transition-all active:border-b-0 active:mb-[2px]"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Image alt="MetaMask logo" src={metamask} width={35} height={33} />
      )}
      {title}
    </button>
  );
};

export default ConnectWalletBtn;
