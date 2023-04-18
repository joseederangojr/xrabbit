import { create } from "zustand";

type CurrencySelectorStore = {
  currency: 'USD' | 'CNY' | 'EUR';
  currencies: {
    id: string;
    name: string;
    symbol: string
  }[];
  setCurrency: (currency:  "USD" | "CNY" | "EUR") => void;
  setCurrencies: (currencies: { id: string; name: string, symbol: string }[]) => void;
};

export const useCurrencySelectorStore = create<CurrencySelectorStore>(
  (set) => ({
    currency: "USD",
    currencies: [
      {
        id: "USD",
        name: "USD",
        symbol: '$'
      },
      {
        id: "EUR",
        name: "EUR",
        symbol: '€'
      },
      {
        id: "CNY",
        name: "CNY",
        symbol: '¥'
      },
    ],
    setCurrency: (currency: 'USD' | 'CNY' | 'EUR') => set({ currency }),
    setCurrencies: (currencies: { id: string; name: string; symbol: string }[]) =>
      set({ currencies }),
  })
);
