import { NextPage } from "next";
import PriceChoice from "../components/PriceChoice";

const Price: NextPage = () => {
const options = [
  { amount: "3", conversion: "$2.4" },
  { amount: "5", conversion: "$4" },
  { amount: "10", conversion: "$8" },
];
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
      {options.map((option) => (
        <PriceChoice
          key={option.conversion}
          amount={option.amount}
          conversion={option.conversion}
        />
      ))}
    </div>
  );
};

export default Price;
