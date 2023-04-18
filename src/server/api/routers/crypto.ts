

import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { getCryptoListingLatest, getCryptoMetadata, getCryptoQuotesLatest } from "~/services/crypto.api";

export const crypto = createTRPCRouter({
  getCryptoListingLatest: publicProcedure
    .input(z.object({
      start: z.number(),
      limit: z.number(),
      convert: z.enum(['USD', 'CNY', 'EUR']),
      sort: z.enum(['market_cap', 'name', 'symbol']).optional(),
      sort_dir: z.enum(['asc', 'desc']).optional(),
      cryptocurrency_type: z.enum(['all', 'coins', 'tokens']),
      tag: z.enum(['all', 'defi', 'filesharing'])
    }))
    .query(async ({ input }) => {
      const response = await getCryptoListingLatest(input)
      return response.data.data.map((crypto) => ({
        id: crypto.id,
        rank: crypto.cmc_rank,
        symbol: crypto.symbol,
        price: crypto.quote[input.convert].price,
        last24HourChange: crypto.quote[input.convert].percent_change_24h,
      }))
    }),
  getCryptoMetadata: publicProcedure
    .input(z.object({
      symbol: z.string(),
    }))
    .query(async ({input}) => {
      const response = await getCryptoMetadata(input)
      const data = response.data.data?.[input.symbol]?.[0]
      return {
        name: data?.name ?? '',
        logo: data?.logo ?? '',
        description: data?.description ?? '',
        symbol: data?.symbol ?? ''
      }
    }),
    getCryptoQuotesLatest: publicProcedure
    .input(z.object({
      symbol: z.string(),
      convert: z.enum(['USD', 'CNY', 'EUR']),
    }))
    .query(async ({input}) => {
      const response = await getCryptoQuotesLatest(input)
      const data = response.data.data?.[input.symbol]?.[0]
      return  {
        rank: data?.cmc_rank ?? 0,
        price: data?.quote[input.convert]?.price ?? 0,
        last24HourChange: data?.quote[input.convert]?.percent_change_24h ?? 0,
        volume24Hour: data?.quote[input.convert]?.volume_24h ?? 0,
        marketCap: data?.quote[input.convert]?.market_cap ?? 0,
        totalSupply: data?.total_supply ?? 0,
        maxSupply: data?.max_supply
      }
    })
});

