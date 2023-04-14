import { axios } from '~/services/axios';

type GetCryptoListingLatest = {
    start: number;
    limit: number;
    convert: 'USD' | 'CNY' | 'EUR';
    sort?: 'market_cap' | 'name' | 'symbol' | string // and more;
    sort_dir?: 'asc' | 'desc';
    cryptocurrency_type: 'all' | 'coins' | 'tokens';
    tag: 'all' | 'defi' | 'filesharing';
}

type GetCryptoBySymbol = {
    symbol: string;
}

export const getCryptoListingLatest = (params?: GetCryptoListingLatest) => {
    return axios.get('/v1/cryptocurrency/listings/latest', { params: params })
}


export const getCryptoMetadata = (params?: GetCryptoBySymbol) => {
    return axios.get('/v2/cryptocurrency/info', { params: params })
}

export const getCryptoQuotesLatest = (params?: GetCryptoBySymbol & { convert: 'USD' | 'CNY' | 'EUR'; }) => {
    return axios.get('/v2/cryptocurrency/quotes/latest', { params: params })
} 