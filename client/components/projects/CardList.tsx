import Image from "next/image";
import { Card, cardData } from "./CardData";

function CardListItem(props: Card) {
  return (
    <a
      key={props.title}
      tabIndex={0}
      className={
        `outline-none focus:ring border mb-4 transition-all duration-300 hover:ring  hover:bg-opacity-0 bg-opacity-0  rounded-xl max-w-lg lg:max-w-xs flex flex-col` +
        ` ${props.classNames.container}` + ` ${props.published ? 'cursor-pointer' : 'cursor-not-allowed'}`
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
        <p className="text-xs mt-5 pt-5 border-t">{props.role}</p>
        <p
          className={
            `text-xs mt-3 inline-block text-gray-500 p-1` +
            ` ${props.classNames.stack}`
          }
        >
          {props.stack}
        </p>
      </div>
    </a>
  );
}

const CardList = () => {
  if (typeof window == undefined) {
    return <>Loading...</>;
  }

  const cardListItems = cardData.map((card) => (
    <CardListItem key={card.title} {...card} />
  ));

  return <>{cardListItems}</>;
};

export default CardList;
