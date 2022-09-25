import dynamic from "next/dynamic";
import { WidgetProps } from "@worldcoin/id";
import { useMoralis } from "react-moralis";

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);
export default function ProofOfPersonForm() {
  const { Moralis, user } = useMoralis();

  const saveProofOfPerson = async (pop) => {
    user?.set("pop", JSON.stringify(pop));
    await user?.save();
  };
  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
     {!user.get("pop") &&  <WorldIDWidget
        actionId="wid_staging_46073474af6cd7b33113cc5e3800e6f2" // obtain this from developer.worldcoin.org
        signal="AuDiTT"
        enableTelemetry
        onSuccess={(verificationResponse) =>
          saveProofOfPerson(verificationResponse)
        }
        onError={(error) => console.error(error)}
        debug={true} // to aid with debugging, remove in production
      />}

{user?.get("pop") && <div className="mb-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Proof of Person Verified
          </h1>
          <p ><img src="https://worldcoin.org/icons/logo.svg" /></p>
          <p className="mt-2 text-sm text-gray-700">
You have been verified with Worldcoin          </p>
        </div>
      </div>}
      ;
    </div>
  );
}
