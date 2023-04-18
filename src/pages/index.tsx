import { type NextPage } from "next";
import { CryptoItem } from "~/components/crypto-item";
import { CryptoList } from "~/components/crypto-list";
import { useCurrencySelectorStore } from "~/components/currency-selector";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [currency, currencySymbol] = useCurrencySelectorStore((store) => [
    store.currency,
    store.currencies.find((currency) => currency.id === store.currency)?.symbol,
  ]);
  const cryptoListingLatestQuery = api.crypto.getCryptoListingLatest.useQuery({
    convert: currency,
    limit: 100,
    start: 1,
    sort: "market_cap",
    tag: "all",
    cryptocurrency_type: "all",
  });

  if (cryptoListingLatestQuery.isLoading) return <h1>Loading</h1>;

  return (
    <section className="w-full max-w-4xl">
      <h1 className="mb-12 text-center text-3xl">Top 100</h1>
      <button
        className="mb-5"
        onClick={() => cryptoListingLatestQuery.refetch()}
      >
        Refresh
      </button>
      {cryptoListingLatestQuery.isLoading ? (
        <h1>Loading</h1>
      ) : (
        <CryptoList>
          {cryptoListingLatestQuery?.data?.map((crypto) => {
            return (
              <CryptoItem
                key={crypto.id}
                rank={crypto.rank}
                symbol={crypto.symbol}
                price={Number(crypto.price.toFixed(2))}
                currency={currencySymbol as string}
                last24HRChange={`${crypto.last24HourChange.toFixed(2)} %`}
              />
            );
          })}
        </CryptoList>
      )}
    </section>
  );
};

export default Home;
