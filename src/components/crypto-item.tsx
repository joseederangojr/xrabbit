import { useRouter } from "next/router";

type Props = {
  rank: number;
  symbol: string;
  price: number;
  last24HRChange: string;
  currency: string;
};

export const CryptoItem = (props: Props) => {
  const router = useRouter()
  const handleNavigateCryptoPage = () => router.push('/crypto/'  + props.symbol)
  return (
    <tr className="text-center hover:bg-slate-200 cursor-pointer" onClick={handleNavigateCryptoPage}>
      <td>{props.rank}</td>
      <td>{props.symbol}</td>
      <td>
        {props.currency}{' '}{props.price}
      </td>
      <td>{props.last24HRChange}</td>
    </tr>
  );
};
