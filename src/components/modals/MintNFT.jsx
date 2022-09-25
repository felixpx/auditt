/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ethers } from "ethers";
import {
  AuDiTTManagerAddress,
  AuDiTTManagerABI,
} from "../../Contracts/AuDiTTManagerContract";
import { NFTStorage } from "nft.storage";
import { useMoralis, useMoralisFile } from "react-moralis";
import Notification from "../Notification/Notification";

export default function CreateCollection(props) {
  const { web3, user, Moralis } = useMoralis();
  const { saveFile } = useMoralisFile();
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  // NOTIFICATIONS STUFF

  const [show, setShow] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationDescription, setNotificationDescription] = useState();
  const [dialogType, setDialogType] = useState(1);
  const close = async () => {
    setShow(false);
  };

  const [nftstorage] = useState(
    new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
    })
  );

  const mintNFT = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("desc").value;
    const file = document.getElementById("file-upload").files[0];

    let ipfsFile = "";
    if (file) {
      console.log("uploading file");
      await saveFile("file", file, { saveIPFS: true }).then(async (hash) => {
        ipfsFile = hash._ipfs;
      });
    }

    const metadata = await nftstorage.store({
      name: title,
      description: description,
      image: file,
    });

    alert(metadata.url);
    alert(AuDiTTManagerABI);
    try {
      const AuDiTTManagerContract = new ethers.Contract(
        AuDiTTManagerAddress,
        AuDiTTManagerABI,
        web3.getSigner()
      );

      let transaction = await AuDiTTManagerContract.mint(
        "0x4cf41b71225d04a2cacd5ee5ae0ca1798b63ab86",
        title,
        metadata.url,
        description
      );
      transaction.wait();

      setDialogType(1); //Success
      setNotificationTitle("minted nft ");
      setNotificationDescription(`Your NFT was minted successfully.`);
      setShow(true);
    } catch (error) {
      alert(error.message);
      setDialogType(2); //failed
      setNotificationTitle("Failed");
      setNotificationDescription(" something went wrong");
      setShow(true);
    }
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
                    <img src="/auditt-full.png" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex flex-col space-y-2 items-center justify-center">
                        <p>Mint NFT</p>
                      </div>
                    </Dialog.Title>
                    <div className="flex flex-col items-center justify-center space-y-2 py-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NFT Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NFT Description
                      </label>
                      <input
                        type="text"
                        name="desc"
                        id="desc"
                        autoComplete="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />

                      <label className="block text-sm font-medium text-gray-700">
                        NFT File
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 w-6/12 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 flex flex-col items-center text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    onClick={mintNFT}
                  >
                    Create
                  </button>
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
        <Notification
          type={dialogType}
          show={show}
          close={close}
          title={notificationTitle}
          description={notificationDescription}
        />
      </Dialog>
    </Transition.Root>
  );
}
