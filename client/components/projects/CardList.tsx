import { cardData } from "./CardData";
import CardListItem from "./CardListItem";

const CardList = () => {
  const cardListItems = cardData.map((card) => (
    <CardListItem key={card.title} {...card} />
  ));

  return <>{cardListItems}</>;
};

export default CardList;
