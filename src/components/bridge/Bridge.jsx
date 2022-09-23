import BridgeTabs from "./BridgeTabs";
import { useEffect } from "react";
import {covalentGetMetadataForContract, covalentGetTokenIds, covalentGetTokenMetadata, getUserAuDiTTNFT} from '../../utils/utils'
export default function Bridge() {
   useEffect(()=>{
       async function getTokens(){
         const data = await covalentGetMetadataForContract('0xcC45d6e2635eE872D38c156986abFA272c4e95Ed');
         console.log(data); 
         console.log("Test data")
        }
        getTokens()
   },[])
  return (
    <main className="-mt-32 z-50 ">
      <div className="mx-auto  max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <BridgeTabs />
      </div>
    </main>
  );
}
