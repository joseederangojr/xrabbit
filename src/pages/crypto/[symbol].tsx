import { type NextPage } from "next";
import { useRouter } from "next/router";
import { CryptoInfo } from "~/components/crypto-info";
import { useCurrencySelectorStore } from "~/components/currency-selector";
import { api } from "~/utils/api";



const CryptoPage: NextPage = () => {
    const router = useRouter()
    const [currency, currencySymbol] = useCurrencySelectorStore(store => [store.currency, store.currencies.find(currency => currency.id === store.currency)?.symbol])
    const getCryptoMetadataQuery = api.crypto.getCryptoMetadata.useQuery({symbol: router.query.symbol})
    const getCryptoQuotesLatestQuery = api.crypto.getCryptoQuotesLatest.useQuery({symbol: router.query.symbol, convert: currency})

    const refresh = () => {
        getCryptoMetadataQuery.refetch()
        getCryptoQuotesLatestQuery.refetch()
    }
    if(getCryptoMetadataQuery.isLoading && getCryptoQuotesLatestQuery.isLoading) return <h1>Loading</h1>
    
    return (
        <div>
            <button onClick={refresh} className="mb-5">Refresh</button>

<CryptoInfo
        rank={getCryptoQuotesLatestQuery.data.data.cmc_rank}
        name={getCryptoMetadataQuery.data.data.name}
        logo={getCryptoMetadataQuery.data.data.logo}
        description={getCryptoMetadataQuery.data.data.description}
        price={getCryptoQuotesLatestQuery.data.data.quote[currency].price.toFixed(2)}
        priceChange24Hour={getCryptoQuotesLatestQuery.data.data.quote[currency].percent_change_24h.toFixed(2)}
        symbol={getCryptoMetadataQuery.data.data.symbol}
        currency={{code: currency, symbol: currencySymbol}}
        details={[
            {
                name: '24 Hour volume',
                value: currencySymbol + getCryptoQuotesLatestQuery.data.data.quote[currency].volume_24h.toFixed(0)
            },
           
            {
                name: 'Market Cap',
                value: currencySymbol +  getCryptoQuotesLatestQuery.data.data.quote[currency].market_cap.toFixed(0)
            },
            {
                name: 'Total Supply',
                value: getCryptoQuotesLatestQuery.data.data.total_supply.toFixed(0)
            },
            {
                name: 'Max Supply',
                value: getCryptoQuotesLatestQuery.data.data.max_supply ?? '---'
            },
        ]}
    />
        </div>
    )
}

export default CryptoPage