import { useState,useRef,useEffect } from "react"
import VideoJS from "./Video"
import { useMoralis } from "react-moralis";

export default function ViewPage() {
    const [livepeerStreamObject, setLivepeerStreamObject] = useState()
    const {user} = useMoralis()

    const [videoJsOptions, setVideoJsOptions] = useState({
        controls: true,
        responsive: true,
        fluid: true,
        poster: user.get('coverImg'),
      })
      const playerRef = useRef(null)
      const playbackRefURL = useRef()
      const handlePlayerReady = (player) => {
        playerRef.current = player
        // you can handle player events here
        player.on('waiting', () => {
          console.log('player is waiting')
        })
    
        player.on('dispose', () => {
          console.log('player will dispose')
        })
      }
      useEffect(() => {
        let livePeerObject = JSON.parse(user.get('stream'))
        let url = `https://cdn.livepeer.com/hls/${livePeerObject.playbackId}/index.m3u8`
        playbackRefURL.current = url
        alert(url)
        startPlayBack()
      }, [])
    
      //Start Play back of stream when it has started
      function startPlayBack() {
        var delayInMilliseconds = 12000 //12 seconds
    
        setTimeout(function () {
          //delay to ensure the stream is actually ready.
          playerRef.current.src({
            type: 'application/x-mpegURL',
            src: playbackRefURL.current,
          })
          playerRef.current.play()
        }, delayInMilliseconds)
      }    

      return (  <div
       
        className="bg-black  mx-auto mt-8 max-w-5xl  px-4 pb-4 sm:px-6 lg:px-8"
      > <VideoJS
        options={videoJsOptions}
        onReady={handlePlayerReady}
      /></div>)
}