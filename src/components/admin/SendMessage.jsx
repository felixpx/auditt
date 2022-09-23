import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/outline";
import { ethers } from "ethers";
import { useState } from "react";
import { useMoralis } from "react-moralis";

import {
  AuDiTTManagerAddress,
  AuDiTTManagerABI,
} from "../../Contracts/AuDiTTManagerContract";
import Notifications from "../notifications/Notifications";

export default function SendMessage() {
  const { web3, user, Moralis } = useMoralis();

  const [show, setShow] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState();
  const [notificationDescription, setNotificationDescription] = useState();
  const [dialogType, setDialogType] = useState(1);
  const close = async () => {
    setShow(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("tell me");
    const receipient = document.getElementById("receiptAddress").value;
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;

    console.log("tell me more");

    const sendEPNSMessage = new ethers.Contract(
      AuDiTTManagerAddress,
      AuDiTTManagerABI,
      web3.getSigner()
    );
    console.log("tell me more x2");

    try {
      let transaction = await sendEPNSMessage.sendNotification(
        receipient,
        title,
        message
      );
      await transaction.wait();
      setDialogType(1); //Success
      setNotificationTitle("Purchase Player Successful");
      setNotificationDescription(`Your purchase was successful.`);
      setShow(true);
    } catch (error) {
      setDialogType(2); //failed
      setNotificationTitle("Failed");
      setNotificationTitle("Sending Notification failed");
    }
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
      <div className="mx-auto max-w-lg lg:max-w-none">
        <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="full-name" className="sr-only">
              Address
            </label>
            <input
              type="text"
              name="receiptAddress"
              id="receiptAddress"
              autoComplete="name"
              className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="User Address"
            />
          </div>
          <div>
            <label htmlFor="full-name" className="sr-only">
              Title{" "}
            </label>
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Title"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Message"
              defaultValue={""}
            />
          </div>
          <div>
            <button
              onClick={sendMessage}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Notifications
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
    </div>
  );
}
