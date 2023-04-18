import Image from "next/image";
import { CryptoInfoItem } from "./crypto-info-item";

type Props = {
  rank: number;
  description: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24Hour: number;
  details: { name: string; value: string }[];
  logo: string;
  currency: {
    code: string;
    symbol: string;
  };
};

export const CryptoInfo = (props: Props) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center text-2xl">
        <Image width={30} height={30} src={props.logo} alt={props.name} />{" "}
        <p className="pl-2">{props.name}</p> &mdash; <span>{props.symbol}</span>
      </div>
      <small>Rank #{props.rank}</small>
      <p className="mb-5 italic text-gray-700">{props.description}</p>

      <CryptoInfoItem
        name="Price"
        value={
          `${props.currency.symbol} ${props.price} – ` +
          (props.priceChange24Hour < 1 ? "↓" : "↑") +
          `${props.priceChange24Hour}%`
        }
      />
      <div className="flex w-full">
        {props.details.map((detail) => (
          <CryptoInfoItem key={detail.name} {...detail} />
        ))}
      </div>
    </div>
  );
};
