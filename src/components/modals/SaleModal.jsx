/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { CreditCardIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";

import { useMoralis } from "react-moralis";

export default function PurchaseModal() {
  const { web3, user } = useMoralis();
  const [open, setOpen] = useState(true);

  const [approveSale, setApproveSale] = useState();

  const cancelButtonRef = useRef(null);

  // APPROVE SALES FOR MARKETPLACE
  //   const approveSales = async () => {
  //     const approveMarketSale = new ethers.Contract(
  //       WildCardAddress,
  //       WildCardABI,
  //       web3.getSigner()
  //     );
  //     let approval = await approveMarketSale.setApprovalForAll(
  //       MarketplaceAddress,
  //       true
  //     );
  //     await approval.wait().then(() => setApproveSale(true));
  //   };

  //  CHECK IF APPROVAL HAS BEEN DONE
  //   useEffect(() => {
  //     const approvalForAll = async () => {
  //       const approveMarketSale = new ethers.Contract(
  //         WildCardAddress,
  //         WildCardABI,
  //         web3.getSigner()
  //       );
  //       let approval = await approveMarketSale.isApprovedForAll(
  //         user.get("ethAddress"),
  //         MarketplaceAddress
  //       );
  //       setApproveSale(approval);
  //     };
  //     approvalForAll();
  //   }, []);

  // CONTRACT CALL SELL PLAYER

  const purchaseItem = async () => {
    const amount = document.getElementById("amount").value;

    alert("try again");

    // const sellPlayerContract = new ethers.Contract(
    //   MarketplaceAddress,
    //   MarketplaceABI,
    //   web3.getSigner()
    // );

    // let transaction = await sellPlayerContract.listToken(
    //   WildCardAddress,
    //   parseInt(props.tokenId),
    //   1,
    //   // ethers.utils.parseEther(sellingPrice.toString())
    //   "2"
    // );
    // await transaction
    //   .wait()
    //   .then(() => alert("player successfully listed on the marketplace"));
    // setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    {/* <CreditCardIcon
                      className="h-6 w-6 text-cyan-600"
                      aria-hidden="true"
                    /> */}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Sell Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Select a price for your item.
                      </p>
                      <div className="my-8">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                            {/* <span className="text-gray-500 sm:text-sm">$</span> */}
                          </div>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            placeholder=""
                            // defaultValue={1}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-16 flex items-center pr-3">
                            <span className="text-gray-500 sm:text-sm">
                              $ ADTT
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  {!approveSale ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      onClick={purchaseItem}
                    >
                      Sell Item
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                      //   onClick={sellPlayer}
                    >
                      Sell Player
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
