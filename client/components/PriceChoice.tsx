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
    <button
      onClick={props.onClick}
      tabIndex={0}
      className="relative w-[115px] h-[120px]  active:translate-y-[3px] bg-neutral-200 hover:shadow-xl transition-all flex flex-col items-center justify-center
      focus:ring-4 hover:ring-4 outline-none my-2 rounded-xl ring-purple-700 header-bg"
    >
      <div className="flex flex-row items-center justify-center gap-1">
        <Image src={matic} width={32} height={32} alt="$MATIC Polygon" />
        <span className="text-[1.5rem] text-gray-100 font-bold">
          {props.amount}
        </span>
      </div>
      <span className="pt-5 text-xs text-gray-200">
        ABOUT {props.conversion}
      </span>
    </button>
  );
};

export default PriceChoice;
