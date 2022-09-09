import Image from "next/image";
import React, { MouseEventHandler } from "react";
import matic from "../public/imgs/matic.svg";

type Props = {
  amount: string;
  conversion: string;
  onClick: MouseEventHandler;
};

const PriceChoice = (props: Props) => {
  return (
    <div onClick={props.onClick}
      className={`cursor-pointer relative w-[110px] active:translate-y-[3px] h-full border border-white hover:border-purple-400 transition-colors flex flex-col items-center justify-center gap-1}`}
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <Image src={matic} width={32} height={32} alt="$MATIC Polygon" />
        <span className="text-[1.5rem] font-bold">{props.amount}</span>
      </div>
      <span className="pt-5 text-xs text-gray-400">
        ABOUT {props.conversion}
      </span>
    </div>
  );
};

export default PriceChoice;
