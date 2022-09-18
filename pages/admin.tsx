import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Landing from "../src/components/Landing";
import MainAdmin from "../src/components/admin/MainAdmin";

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return <Landing />;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Auditt</title>
        <link rel="icon" href="/auditt-full.png" />
      </Head>

      <main className="flex w-full flex-1 overflow-y-scroll flex-col items-center justify-center text-center">
        <MainAdmin />
      </main>

      <footer className="flex h-24 w-full items-center text-gray-300 justify-evenly border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={"/ethglobal.png"} width={80} height={75} />
        </a>

        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={"/auditt-full.png"} width={75} height={75} />
        </a>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          FDD
        </a>
      </footer>
    </div>
  );
};

export default Home;
