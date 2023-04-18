import { type NextPage } from "next";
import { useRouter } from "next/router";
import { CryptoInfo } from "~/components/crypto-info";
import { useCurrencySelectorStore } from "~/components/currency-selector";
import { api } from "~/utils/api";

const CryptoPage: NextPage = () => {
  const router = useRouter();
  const [currency, currencySymbol] = useCurrencySelectorStore((store) => [
    store.currency,
    store.currencies.find((currency) => currency.id === store.currency)?.symbol ?? '',
  ]);
  const getCryptoMetadataQuery = api.crypto.getCryptoMetadata.useQuery({
    symbol: router.query.symbol as string,
  });
  const getCryptoQuotesLatestQuery = api.crypto.getCryptoQuotesLatest.useQuery({
    symbol: router.query.symbol as string,
    convert: currency,
  });

  const refresh = async () => {
    await getCryptoMetadataQuery.refetch();
    await getCryptoQuotesLatestQuery.refetch();
  };
  if (getCryptoMetadataQuery.isLoading && getCryptoQuotesLatestQuery.isLoading)
    return <h1>Loading</h1>;

  return (
    <div>
      <button onClick={refresh} className="mb-5">
        Refresh
      </button>

      {
        getCryptoMetadataQuery.data && getCryptoQuotesLatestQuery.data && <CryptoInfo
        rank={getCryptoQuotesLatestQuery.data.rank}
        name={getCryptoMetadataQuery.data.name}
        logo={getCryptoMetadataQuery.data.logo}
        description={getCryptoMetadataQuery.data?.description}
        price={Number(getCryptoQuotesLatestQuery.data?.price.toFixed(2))}
        priceChange24Hour={Number(getCryptoQuotesLatestQuery.data?.last24HourChange.toFixed(
          2
        ))}
        symbol={getCryptoMetadataQuery.data?.symbol}
        currency={{ code: currency, symbol: currencySymbol }}
        details={[
          {
            name: "24 Hour volume",
            value: `${currencySymbol} ${getCryptoQuotesLatestQuery.data?.volume24Hour.toFixed(0)}`,
          },

          {
            name: "Market Cap",
            value:
              currencySymbol +
              getCryptoQuotesLatestQuery.data.marketCap.toFixed(0),
          },
          {
            name: "Total Supply",
            value: getCryptoQuotesLatestQuery.data.totalSupply.toFixed(0),
          },
          {
            name: "Max Supply",
            value: getCryptoQuotesLatestQuery.data.maxSupply?.toFixed(0) ?? "---",
          },
        ]}
      />
      }
    </div>
  );
};

export default CryptoPage;
