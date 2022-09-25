import { useState } from "react";

export default function Swap() {
  return (
    <div className="flex flex-col items-center justify-center">
      <iframe
        src="https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=0x6b175474e89094c44da98b954eedeac495271d0f"
        height="660px"
        width="100%"
        className="m-auto mb-2 block"
      />
      <div className="flex flex-col text-gray-500 text-sm space-y-2 py-4 items-center justify-center ">
        <p>ADTT TOKEN ADDRESS</p>
        <p>0xB1Db7D38F2359ff1c0619087B9e798F07b1Cd3A1</p>
        <p>USDC TOKEN ADDRESS</p>
        <p>0x9aa7fEc87CA69695Dd1f879567CcF49F3ba417E2</p>
      </div>
    </div>
  );
}
