import Image from "next/image";
import React from "react";
import matic from "../public/imgs/matic.svg";

type Props = {
  amount: string;
  conversion: string;
  isWallet: boolean;
};

const PriceChoice = (props: Props) => {
  return (
    <div
      className={`cursor-pointer relative w-[110px]  border-white hover:border-purple-400 transition-all flex flex-col items-center delay-300 justify-center gap-1  ${
        props.isWallet ? "h-[110px]" : "h-[40px] overflow-hidden"
      }`}
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <Image src={matic} width={32} height={32} alt="$MATIC Polygon" />
        <span className="text-[1.5rem] font-bold">{props.amount}</span>
      </div>
      <span className="justify-self-stretch text-gray-400">
        ABOUT {props.conversion}
      </span>
    </div>
  );
};

export default PriceChoice;
