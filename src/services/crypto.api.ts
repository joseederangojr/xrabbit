import { axios } from "~/services/axios";

type DefaultStatusResponse = {
    status: number
};

type DefaultResponse<D> = {
  status: DefaultStatusResponse;
  data: D;
};

type GetCryptoListingLatestRequest = {
  start: number;
  limit: number;
  convert: "USD" | "CNY" | "EUR";
  sort?: "market_cap" | "name" | "symbol" | string; // and more;
  sort_dir?: "asc" | "desc";
  cryptocurrency_type: "all" | "coins" | "tokens";
  tag: "all" | "defi" | "filesharing";
};

type GetCryptoListingLatestResponse = {
  id: number;
  cmc_rank: number;
  symbol: string;
  quote: Record<
    "USD" | "CNY" | "EUR",
    { price: number; percent_change_24h: number }
  >;
};

type GetCryptoMetadataResponse = Record<
  string,
  {
    name: string;
    logo: string;
    description: string;
    symbol: string;
  }[]
>;

type GetCryptoQuotesLatestResponse = Record<
  string,
  {
    cmc_rank: number;
    quote: Record<
      "USD" | "CNY" | "EUR",
      {
        price: number;
        percent_change_24h: number;
        volume_24h: number;
        market_cap: number;
      }
    >;
    total_supply: number;
    max_supply: number;
  }[]
>;

type GetCryptoBySymbol = {
  symbol: string;
};

export const getCryptoListingLatest = (
  params?: GetCryptoListingLatestRequest
) => {
  return axios.get<DefaultResponse<GetCryptoListingLatestResponse[]>>(
    "/v1/cryptocurrency/listings/latest",
    { params: params }
  );
};

export const getCryptoMetadata = (params?: GetCryptoBySymbol) => {
  return axios.get<DefaultResponse<GetCryptoMetadataResponse>>(
    "/v2/cryptocurrency/info",
    { params: params }
  );
};

export const getCryptoQuotesLatest = (
  params?: GetCryptoBySymbol & { convert: "USD" | "CNY" | "EUR" }
) => {
  return axios.get<DefaultResponse<GetCryptoQuotesLatestResponse>>("/v2/cryptocurrency/quotes/latest", { params: params });
};
