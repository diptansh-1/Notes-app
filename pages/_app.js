import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { ColorProvider } from "../components/ColorContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ColorProvider>
        <div className="root-container grid md:grid-cols-[10%_90%] md:grid-rows-[10%_90%] md:gap-10 h-screen w-screen overflow-x-hidden">
          <div className="md:col-span-1 md:row-span-2">
            <Navbar />
          </div>
          <Component {...pageProps} />
        </div>
      </ColorProvider>
    </>
  );
}
