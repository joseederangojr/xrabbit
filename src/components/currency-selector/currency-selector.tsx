import { useCurrencySelectorStore } from "./currency-selector.store";

export const CurrencySelector = () => {
  const currencies = useCurrencySelectorStore((store) => store.currencies);
  const currency = useCurrencySelectorStore((store) => store.currency);
  const setCurrency = useCurrencySelectorStore((store) => store.setCurrency);

  return (
    <select value={currency} onChange={e => setCurrency(e.target.value as "USD" | "CNY" | "EUR")}>
      {currencies.map((currency) => (
        <option key={currency.id} value={currency.id}>
          {currency.name}
        </option>
      ))}
    </select>
  );
};
