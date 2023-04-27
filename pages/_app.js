import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatsappFAB from "../components/WatsappFAB";
import Auth from "../components/auth";
let persistor = persistStore(store);
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Norahairforest</title>
        <meta
          name="title"
          content="Shop High-Quality Hair Wigs and Braids at Norahairforest - Your Ultimate Hair Accessory Destination"
        />
        <meta
          name="description"
          content="Discover the perfect hair wig or braid to enhance your style with Norahairforest. Our premium-quality products are available in a range of styles and colors, ensuring that you'll find the perfect fit for your look. From natural-looking wigs to vibrant braids, we offer exceptional customer service and satisfaction. Shop now and discover your new favorite hair accessory at Norahairforest."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PayPalScriptProvider deferLoading={true}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <WatsappFAB/>
     {Component.auth ? (
      <Auth role={Component.auth.role}>
        <Component {...pageProps} />
      </Auth>
    ) : (
      <Component {...pageProps} />
    )}
            </PayPalScriptProvider>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
