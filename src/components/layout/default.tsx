import { Footer } from "../common/footer";
import { Navbar } from "../common/navbar";

export const DefaultLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
