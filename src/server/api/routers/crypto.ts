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
      return response?.data  as { status: Record<string, any>, data: any[]}
    }),
  getCryptoMetadata: publicProcedure
    .input(z.object({
      symbol: z.string()
    }))
    .query(async ({input}) => {
      const response = await getCryptoMetadata(input)
      return {status: response?.data?.status, data: response.data.data[input.symbol][0]} as { status: Record<string, any>, data: Record<any, any> }
    }),
    getCryptoQuotesLatest: publicProcedure
    .input(z.object({
      symbol: z.string(),
      convert: z.enum(['USD', 'CNY', 'EUR']),
    }))
    .query(async ({input}) => {
      const response = await getCryptoQuotesLatest(input)
      return {status: response?.data?.status, data: response.data.data[input.symbol][0]} as { status: Record<string, any>, data: Record<any, any> }
    })
});
