import { type AppType } from "next/dist/shared/lib/utils";
import { DefaultLayout } from "~/components/layout/default";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
};

export default MyApp;
