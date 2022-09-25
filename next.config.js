/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.moralis.io", "www.youtube.com"],
  },
  env: {
    //  APP ID & SERVER URL

    NEXT_APP_MORALIS_SERVER_URL: "",
    NEXT_APP_MORALIS_APP_ID: "",
    NEXT_PUBLIC_LIVEPEER_API_KEY: "da927d9f-f559-45f2-b487-7bc0f2fb760c",
    NEXT_PUBLIC_COVALENT_KEY: "ckey_28e144556c844a9cbf7d252abbf",
  },
};
