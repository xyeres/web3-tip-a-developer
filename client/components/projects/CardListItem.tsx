import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card } from "./CardData";

const CardListItem = (props: Card) => {
  const [stackItems, setStackItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const items = props.stack.map((el, i) => (
      <li
        className={`px-2 py-1 border rounded-full opacity-75 ${props.classNames.stack}`}
        key={i}
      >
        {el}
      </li>
    ));

    setStackItems(items);
  }, [props.classNames.stack, props.stack]);

  return (
    <a
      key={props.title}
      tabIndex={0}
      href={props.href}
      className={
        `outline-none focus:ring border mb-4 transition-all duration-300 hover:ring  hover:bg-opacity-0 bg-opacity-0  rounded-xl max-w-lg lg:max-w-xs flex flex-col` +
        ` ${props.classNames.container}` +
        ` ${props.published ? "cursor-pointer" : "cursor-not-allowed"}`
      }
    >
      <div className="w-full flex-col flex items-start gap-2 px-7 pt-7 justify-center">
        <div className="flex items-center gap-2">
          {props.imgSrc ? (
            <>
              <div data-atropos-offset="10" className="flex-shrink-0 flex">
                <Image
                  src={props.imgSrc}
                  alt={props.title}
                  width={props.imgWidth}
                  height={props.imgHeight}
                />
              </div>
              <p
                data-atropos-offset="2"
                className={`font-extralight text-2xl text-black ${props.logoOnly && " sr-only"
                  }`}
              >
                {props.title}
              </p>
            </>
          ) : (
            <p className="font-extrabold text-2xl uppercase">{props.title}</p>
          )}
        </div>

        <p data-atropos-offset="1" className="font-extralight mt-2">
          {props.desc}
        </p>
      </div>
      <div data-atropos-offset="1" className="text-gray-500 px-7 pb-5">
        <p className="text-xs mt-3 pt-3 border-t border-dashed border-gray-100">{props.role}</p>
        <div className="text-xs mt-3 rounded-md text-gray-600">
          <ul className="flex flex-row gap-2">{stackItems}</ul>
        </div>
      </div>
    </a>
  );
};

export default CardListItem;
