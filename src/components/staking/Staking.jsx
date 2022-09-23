import StakingTabs from "./StakingTabs";

export default function Market() {
  return (
    <main className="-mt-32 z-50 overflow-hidden">
      <div className="mx-auto overflow-hidden max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <button         className="m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >Approve NFT</button>
        <StakingTabs />
      </div>
    </main>
  );
}
