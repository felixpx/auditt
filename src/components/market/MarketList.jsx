import { useState } from "react";
import PurchaseModal from "../modals/PurchaseModal";

const products = [
  {
    id: 1,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-50.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "50",
    color: "Collateral Art",
  },
  {
    id: 2,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-100.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "100",
    color: "Collateral Art",
  },
  {
    id: 3,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-500.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "500",
    color: "Collateral Art",
  },
  {
    id: 4,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-1000.png",

    imageAlt: "Front of men's Basic Tee in black.",
    price: "1000",
    color: "Collateral Art",
  },
  {
    id: 5,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-10000.png",

    imageAlt: "Front of men's Basic Tee in black.",
    price: "10000",
    color: "Collateral Art",
  },

  // More products...
];

const tabs = [
  { name: "Auditt Listings", href: "#", current: true },
  { name: "Collections", href: "#", current: false },
  // { name: "Insights", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Marketlist() {
  // TAB SECTION
  const [selectedTab, setSelectedTab] = useState("Auditt Listings");

  // LISTING SECTION
  const [openPurchase, setOpenPurchase] = useState(false);

  const [tokenId, setTokenId] = useState();
  function buyItem(id) {
    setOpenPurchase(true);
    setTokenId(id);
    if (openPurchase) {
      setOpenPurchase(false);
    }
  }
  return (
    <div className="bg-white z-50 rounded-xl overflow-y-scroll shadow-xl">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Listings
        </h2> */}
        {/* NAVIGATION INPUT TABS */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab.name);
                }}
                className={classNames(
                  selectedTab == tab.name
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    selectedTab == tab.name ? "bg-gray-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* NAVIGATION OUTPUT */}

        {/* AUDITT LISTINGS */}
        <div hidden={selectedTab != "Auditt Listings"} className="py-32">
          {openPurchase && <PurchaseModal tokenId={tokenId} />}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => buyItem(product.id)}
                key={product.id}
                className="group relative"
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-xl bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex z-20 justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    $ {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLLECTION ARTICLES */}
        <div hidden={selectedTab != "Collections"} className="py-16">
          {openPurchase && <PurchaseModal tokenId={tokenId} />}
          <h2 className=" font-bold text-gray-900 text-base mb-8">
            Livestreams
          </h2>

          <div className="flex items-center justify-evenly w-full">
            <iframe
              src="https://www.youtube.com/watch?v=lH_fXVYvkz0&list=PLLhOnau-tupQT_xy6MYwKoALhjUFUq-Ut&index=11"
              title="W3Schools Free Online Web Tutorials"
            ></iframe>
            <iframe
              src="https://www.youtube.com/watch?v=lH_fXVYvkz0&list=PLLhOnau-tupQT_xy6MYwKoALhjUFUq-Ut&index=11"
              title="W3Schools Free Online Web Tutorials"
            ></iframe>
            <iframe
              src="https://www.youtube.com/watch?v=lH_fXVYvkz0&list=PLLhOnau-tupQT_xy6MYwKoALhjUFUq-Ut&index=11"
              title="W3Schools Free Online Web Tutorials"
            ></iframe>
          </div>
          <h2 className=" my-8 font-bold text-gray-900 text-base">
            Collections
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => buyItem(product.id)}
                key={product.id}
                className="group relative"
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex z-20 justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
