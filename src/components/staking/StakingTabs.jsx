import { useState } from "react";
import Stake from "./Stake";
import Unstake from "./Unstake";

const tabs = [
  { name: "Stake", href: "#", current: true },
  { name: "Unstake", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardTabs(props) {
  const [selectedTab, setSelectedTab] = useState("Stake");

  return (
    <div className="bg-white z-50 rounded-xl  shadow-xl">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
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
        <div hidden={selectedTab != "Stake"} className="py-9">
          <Stake nftApproval={props.nftApproval} />
        </div>

        {/* COLLECTION ARTICLES */}
        <div hidden={selectedTab != "Unstake"} className="py-9">
          <Unstake approvedADTT={props.approvedADTT}/>
        </div>
      </div>
    </div>
  );
}
