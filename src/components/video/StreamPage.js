import VideoJS from "./Video";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { Client } from "@livepeer/webrtmp-sdk";

import { VideoCameraIcon, XIcon } from "@heroicons/react/outline";
const CALL_OPTIONS = {
  iframeStyle: {
    width: "100%",
    height: "100%",
    border: "1px solid #e6eaef",
    borderRadius: "6px 6px 0 0",
  },
  showLeaveButton: true,
  showFullscreenButton: true,
  //   showLocalVideo: false,
  //   showParticipantsBar: false,
};

const DEFAULT_HEIGHT = 400;

export default function StreamPage() {
  const { user, Moralis } = useMoralis();
  const router = useRouter();
  const { id } = router.query;
  const [vchat, setVideoChat] = useState();
  const videoRef = useRef(null);
  const videoCallRef = useRef(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [callframe, setCallframe] = useState(null);
  const stream = useRef(null);
  const clientRef = useRef(null);
  const sessionRef = useRef(null);
  const [livepeerStreamObject, setLivepeerStreamObject] = useState();
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    setLivepeerStreamObject(JSON.parse(user.get("stream")));
  }, []);
  const streamButtonClicked = async () => {
    if (!isLive) {
      videoRef.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (!stream.current) {
        /* setOpenNotification(true);
             setNotificationHeader("ERROR LOADING MEDIA DEVICE")
             setNotificationBody("Your stream cannot be started.");
             setNotificationType(2); //Error
             setEventNotFound(true);
             */
        return;
      }

      videoRef.current.srcObject = stream.current;
      videoRef.current.play();
      clientRef.current = new Client({
        opt: { baseUrl: "nyc-rtmp.livepeer.com/live" },
      });
      sessionRef.current = clientRef.current.cast(
        stream.current,
        livepeerStreamObject.streamKey
      );

      sessionRef.current.on("open", () => {
        console.log("Stream started.");
      });

      sessionRef.current.on("close", () => {
        console.log("Stream stopped.");
      });

      sessionRef.current.on("error", (err) => {
        console.log("Stream error.", err.message);
      });
      setIsLive(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();

        stream.current.getTracks().forEach(function (track) {
          track.stop();
        });
        videoRef.current.srcObject = null;
        stream.current = null;
      }
      setIsLive(false);
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <div className="h-96 w-72 space-y-6 xl:space-y-6">
        <video className="w-500 h-full bg-gray-800" ref={videoRef}>
          <img
            className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
            src={
              "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
            }
            alt=""
          />
        </video>

        <div className="flex h-max flex-row items-center justify-center px-4">
          <button
            className="flex flex-row items-center justify-center rounded-xl border-2"
            onClick={streamButtonClicked}
          >
            {!isLive ? (
              <div className="mx-2 flex flex-row items-center justify-center p-1">
                Start Stream
                <VideoCameraIcon className="h-10 rounded-full bg-white p-2 text-green-500" />
              </div>
            ) : (
              <div className="mx-2 flex flex-row items-center justify-center p-1">
                End Stream
                <XIcon className="h-10 rounded-full bg-white p-2 text-red-500" />
              </div>
            )}
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
