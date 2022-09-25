import { useState, useRef, useEffect } from "react";
import VideoJS from "./Video";
import { useMoralis } from "react-moralis";

const referenceVideo =
  "https://cdn.livepeer.com/hls/da4b1hsjv2fuwxx2/index.m3u8";
export default function ViewPage() {
  const [livepeerStreamObject, setLivepeerStreamObject] = useState();
  const { user } = useMoralis();

  const [videoJsOptions, setVideoJsOptions] = useState({
    controls: true,
    responsive: true,
    fluid: true,
    poster: user.get("coverImg"),
  });
  const playerRef = useRef(null);
  const playbackRefURL = useRef();
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  useEffect(() => {
    let livePeerObject = JSON.parse(user.get("stream"));
    let url = `https://cdn.livepeer.com/hls/da4b1hsjv2fuwxx2/index.m3u8`;
    playbackRefURL.current = url;
    startPlayBack();
  }, []);

  //Start Play back of stream when it has started
  function startPlayBack() {
    var delayInMilliseconds = 12000; //12 seconds

    // setTimeout(function () {
    //   playerRef.current.src({
    //     type: "application/x-mpegURL",
    //     src: playbackRefURL.current,
    //   });
    //   playerRef.current.play();
    // }, delayInMilliseconds);
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl h-96 px-4 pb-4 sm:px-6 lg:px-8">
      {/* <video className="video-js vjs-big-play-centered z-50 vjs-default-skin focus-within:ring-my-green bg-black  shadow-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 " /> */}
      <video width="320" height="240" controls>
        <source
          src="https://cdn.livepeer.com/hls/da4b1hsjv2fuwxx2/index.m3u8"
          type="video/mp4"
        />
        {/* <source src="movie.ogg" type="video/ogg"> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
