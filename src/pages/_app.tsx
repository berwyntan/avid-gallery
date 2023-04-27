import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { PageLayout } from "~/components/layout";
import Navbar from "~/components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <PageLayout>
        <Navbar />
        <Component {...pageProps} />
      </PageLayout>
    </>
  );
};

export default api.withTRPC(MyApp);
