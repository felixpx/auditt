import DashboardTabs from "./DashboardTabs";

export default function Dashboard() {
  return (
    <main className="-mt-32 z-50 overflow-hidden">
      <div className="mx-auto overflow-hidden max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <DashboardTabs />
      </div>
    </main>
  );
}
