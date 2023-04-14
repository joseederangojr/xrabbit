import { CurrencySelector } from "./currency-selector";

export const Navbar = () => {
  return (
    <div className="flex flex-col">
      <nav
        className="fixed left-0 right-0 top-0
            z-10 flex w-full
            justify-around bg-white/80 py-4 shadow-md backdrop-blur-md"
      >
        <div className="flex items-center">
          <h3 className="text-2xl font-medium">XRabbit</h3>
        </div>

        <div className="flex items-center space-x-5">
          <CurrencySelector />
        </div>
      </nav>
    </div>
  );
};
