import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Landing from "../src/components/Landing";
import Main from "../src/components/Main";

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return <Landing />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Auditt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <Main />
      </main>

      <footer className="flex h-24 w-full items-center text-gray-300 justify-evenly border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH GLOBAL
        </a>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          ETH ONLINE 2022
        </a>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          AUDITT
        </a>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Dominic Hackett, Felix Prabitz and Devin Lamoreux
        </a>
      </footer>
    </div>
  );
};

export default Home;
