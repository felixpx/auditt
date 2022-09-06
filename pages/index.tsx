import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Landing from "../src/components/Landing";
import Dashboard from "../src/components/Dashboard";

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
        <Dashboard />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Auditt
        </a>
      </footer>
    </div>
  );
};

export default Home;
