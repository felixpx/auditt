import { useState } from "react";

export default function DeBridge() {
  const [selectedfromSwap, setSelectedfromSwap] = useState();
  const [selectedtoSwap, setSelectedtoSwap] = useState("USDC");
  const [selectedfromChain, setSelectedfromChain] = useState();
  const [selectedtoChain, setSelectedtoChain] = useState();
  const [tokens, setTokens] = useState([
    { id: 1, Name: "ADTT" },
    { id: 2, Name: "USDC" },
  ]);
  const [fromChain, setFromChain] = useState([
    { id: 1, Name: "Mumbai" },
    { id: 2, Name: "Polygon" },
    { id: 3, Name: "Ethereum" },
    { id: 4, Name: "Avalanche" },
    { id: 5, Name: "Cronos" },
  ]);
  const [toChain, setToChain] = useState([
    { id: 1, Name: "Mumbai" },
    { id: 2, Name: "Polygon" },
    { id: 3, Name: "Ethereum" },
    { id: 4, Name: "Avalanche" },
    { id: 5, Name: "Cronos" },
  ]);

  const handleChangefromSwap = (event) => {
    setSelectedfromSwap(event.target.value);
  };
  const handleChangetoSwap = (event) => {
    setSelectedtoSwap(event.target.value);
  };
  const handleChangefromChain = (event) => {
    setSelectedfromChain(event.target.value);
  };
  const handleChangetoChain = (event) => {
    setSelectedtoChain(event.target.value);
  };

  function confirmSwap() {
    // add logic
  }
  function confirmBrdiging() {
    // add logic
  }

  //   ADD USEEFFECT TO FETCH TOKENS + BALANCE

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justifify-evenly space-y-4">
        <div className="text-base tracking-widest font-bold text-gray-500">
          SWAP
        </div>
        <div className="flex flex-row items-center justify-around w-4/12">
          <input
            id="fromSwap"
            name="fromSwap"
            type="number"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          />

          <select
            id="token"
            value={selectedfromSwap}
            onChange={handleChangefromSwap}
            name="token"
            autoComplete="token-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          >
            {tokens.map((token, index) => (
              <option value={token.id}>{token.Name}</option>
            ))}
          </select>
        </div>
        <div className="text-sm tracking-widest font-bold text-gray-500">
          T O
        </div>

        <div className="flex flex-row items-center justify-around w-4/12">
          <input
            id="toSwap"
            name="toSwap"
            type="number"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          />
          <select
            id="token"
            value={selectedtoSwap}
            onChange={handleChangetoSwap}
            name="token"
            autoComplete="token-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          >
            {tokens.map((token, index) => (
              <option value={token.id}>{token.Name}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={confirmSwap}
        className="mt-8 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Submit
      </button>
      <div className="w-full flex mt-8 flex-col items-center space-y-4">
        <div className="text-base tracking-widest font-bold text-gray-500">
          BRIDGE
        </div>

        <div className="flex flex-row items-center justify-around w-4/12">
          <input
            id="fromChain"
            name="fromChain"
            type="number"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          />
          <select
            id="token"
            value={selectedfromChain}
            onChange={handleChangefromChain}
            name="token"
            autoComplete="token-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          >
            {fromChain.map((chain, index) => (
              <option value={chain.id}>{chain.Name}</option>
            ))}
          </select>
        </div>
        <div className="text-sm tracking-widest font-bold text-gray-500">
          T O
        </div>
        <div className="flex flex-row items-center justify-around w-4/12">
          <input
            id="toChain"
            name="toChain"
            type="number"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          />
          <select
            id="toChain"
            value={selectedtoChain}
            onChange={handleChangetoChain}
            name="toChain"
            autoComplete="chain-name"
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:max-w-xs sm:text-sm"
          >
            {toChain.map((chain, index) => (
              <option value={chain.id}>{chain.Name}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={confirmBrdiging}
        className="mt-8 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </div>
  );
}
