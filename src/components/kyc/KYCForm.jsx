import { useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import Notifications from "../notifications/Notifications";

export default function KYCForm() {
  const { Moralis } = useMoralis();
  const { saveFile } = useMoralisFile();

  // NOTIFICATIONS functions
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationDescription, setNotificationDescription] = useState();
  const [dialogType, setDialogType] = useState(1);

  const [show, setShow] = useState(false);
  const close = async () => {
    setShow(false);
  };

  const saveKYC = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const emailAddress = document.getElementById("email-address").value;
    const country = document.getElementById("country").value;
    const streetAddress = document.getElementById("street-address").value;
    const city = document.getElementById("city").value;
    const region = document.getElementById("region").value;
    const postalCode = document.getElementById("postal-code").value;
    const birthCertificate = document.getElementById("file-upload").files[0];

    let ipfsCertificate = "";

    if (birthCertificate) {
      console.log("uploading birthCertificate");
      await saveFile("birthCertificate", birthCertificate, {
        saveIPFS: true,
      }).then(async (hash) => {
        ipfsCertificate = hash._ipfs;
      });
    }

    // NFT STORAGE - OPTIONAL

    // const metadata = await nftstorage.store({
    //   name: lastName,
    //   email: emailAddress,
    //   file: birthCertificate,
    // });

    //  CONTRACT CALL

    try {
      //   const KYCContract = new ethers.Contract(
      //     KYCContractAddress,
      //     KYCContractABI,
      //     web3.getSigner()
      //   );
      //   let transaction = await KYCContract
      //     .insertCALL
      //     // insert vars
      //     ();

      //   const receipt = await transaction.wait();

      const KYC = new Moralis.Object.extend("KYC");
      const kyc = new KYC();
      kyc.set("firstName", firstName);
      kyc.set("lastName", lastName);
      kyc.set("emailAddress", emailAddress);
      kyc.set("country", country);
      kyc.set("streetAddress", streetAddress);
      kyc.set("city", city);
      kyc.set("region", region);
      kyc.set("postalCode", postalCode);
      kyc.set("birthCertificate", ipfsCertificate);
      kyc.save().then((data) => {
        setDialogType(1); // Success
        setNotificationTitle("Successful");
        setNotificationDescription("KYC Submission Successful");
        setShow(true);
        // setSearch(new Date());
        // sendNotifications(data);
      });
    } catch (error) {
      setDialogType(2); // Failed
      setNotificationTitle("Failed");
      setNotificationDescription(error.message);
      setShow(true);
    }
  };
  return (
    <form className="space-y-6" action="#" method="POST">
      <Notifications
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />

      <div className="md:col-span-1 my-10">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Information
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          KYC is necessary to unstake collateral Auditt NFTs and enable creation
          of collections.
        </p>
      </div>
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="flex flex-col items-center ">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Birth Certificate
          </label>
          <div className="mt-1 flex justify-center rounded-md border-2 w-6/12 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
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
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveKYC}
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
