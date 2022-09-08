import Image from "next/image";
import React from "react";
import matic from "../public/imgs/matic.svg";

type Props = {
  amount: string;
  conversion: string;
};

const PriceChoice = (props: Props) => {
  return (
    <div
      className={`cursor-pointer relative w-[110px] h-full border border-white hover:border-purple-400 transition-colors flex flex-col items-center justify-center gap-1}`}
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <Image src={matic} width={32} height={32} alt="$MATIC Polygon" />
        <span className="text-[1.5rem] font-bold">{props.amount}</span>
      </div>
      <span className="pt-2 text-gray-400">
        ABOUT {props.conversion}
      </span>
    </div>
  );
};

export default PriceChoice;
