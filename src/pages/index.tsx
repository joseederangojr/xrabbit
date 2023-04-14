import { type NextPage } from "next";
import { CryptoItem } from "~/components/crypto-item";
import { CryptoList } from "~/components/crypto-list";
import { useCurrencySelectorStore } from '~/components/currency-selector';
import { api } from '~/utils/api';

const Home: NextPage = () => {
  const [currency, currencySymbol] = useCurrencySelectorStore(store => [store.currency, store.currencies.find(currency => currency.id === store.currency)?.symbol])
  const cryptoListingLatestQuery = api.crypto.getCryptoListingLatest.useQuery({
    convert: currency,
    limit: 100,
    start: 1,
    sort: 'market_cap',
    tag: 'all',
    cryptocurrency_type: 'all',
  })

  if(cryptoListingLatestQuery.isLoading) return <h1>Loading</h1>
  
  return (
    <section className="w-full max-w-4xl">
      <h1 className="text-3xl text-center mb-12">Top 100</h1>
      <button className="mb-5" onClick={() => cryptoListingLatestQuery.refetch()}>Refresh</button>
      {
        cryptoListingLatestQuery.isLoading ? <h1>Loading</h1> : <CryptoList>
        {
          cryptoListingLatestQuery.data?.data?.map((crypto) => {
            return <CryptoItem key={crypto.id} rank={crypto.cmc_rank} symbol={crypto.symbol} price={crypto.quote[currency]?.price.toFixed(2)} currency={currencySymbol} last24HRChange={crypto.quote[currency]?.percent_change_24h.toFixed(2) + ' %'} />
          })
        }
      </CryptoList>
      }
      
    </section>
  )
};

export default Home;
