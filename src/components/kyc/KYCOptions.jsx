import { useState } from "react";
import ProofOfPersonForm from "./ProofOfPersonForm";
import KYCForm from "./KYCForm";

const tabs = [
  { name: "KYC", href: "#", current: false },
  { name: "Proof Of Person", href: "#", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Marketlist() {
  // TAB SECTION
  const [selectedTab, setSelectedTab] = useState("KYC");

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
        {/* NAVIGATION INPUT TABS */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
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
        <div hidden={selectedTab != "KYC"} className="py-8">
          <KYCForm />
        </div>
        <div hidden={selectedTab != "Proof Of Person"} className="py-8">
          <ProofOfPersonForm />
        </div>
      </div>
    </div>
  );
}
