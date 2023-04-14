import { create } from "zustand";

type CurrencySelectorStore = {
  currency: string;
  currencies: {
    id: string;
    name: string;
  }[];
  setCurrency: (currency: string) => void;
  setCurrencies: (currencies: { id: string; name: string }[]) => void;
};

export const useCurrencySelectorStore = create<CurrencySelectorStore>(
  (set) => ({
    currency: "usd",
    currencies: [
      {
        id: "usd",
        name: "USD",
      },
      {
        id: "eur",
        name: "EUR",
      },
      {
        id: "cny",
        name: "CNY",
      },
    ],
    setCurrency: (currency: string) => set({ currency }),
    setCurrencies: (currencies: { id: string; name: string }[]) =>
      set({ currencies }),
  })
);
