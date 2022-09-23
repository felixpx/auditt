import BridgeTabs from "./BridgeTabs";
import { useMoralis } from "react-moralis";

export default function Bridge() {
  const {user} = useMoralis()

  return (
    <main className="-mt-32 z-50 ">
      <div className="mx-auto  max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <BridgeTabs />
        
      </div>
    </main>
  );
}
