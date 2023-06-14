import React, { useEffect, useState } from "react";
//@ts-ignore
// import video from "/videos/background_video.mp4";
import video from "../../../images/background_video.mp4";
// import { Player } from "video-react";
// import  from "react-background-video-player"
//@ts-ignore
import VideoPlayer from "react-background-video-player";
import axios from "axios";

// declare module "*.mp4" {
//   const src: string;
//   export default src;
// }

const BackgroundVideo = () => {
  // const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    // axios
    //   .get(`${process.env.PUBLIC_URL}/videos/background_video.mp4`, {
    //     headers: {
    //       Accept: "video/mp4;charset=UTF-8",
    //     },
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     const URL = window.URL || window.webkitURL;
    //     const url = URL.createObjectURL(
    //       new Blob([result.data], { type: "video/mp4" })
    //     );
    //     setVideo(url);
    //   });
  }, []);

  // console.log("video: ", video);
  return (
    /* <Player
      src="/videos/background_video.mp4"
      fluid={false}
      width={480}
      height={272}
      autoPlay
    >
      <source src="/videos/background_video.mp4" /> 
    </Player>*/

    <video loop muted autoPlay id="background-video">
      <source src={video} type="video/mp4" />
    </video>

    // <VideoPlayer
    //   className="video"
    //   src={`${process.env.PUBLIC_URL}/videos/background_video.mp4`}
    //   autoPlay={true}
    //   muted={true}
    // />
  );
};

export default BackgroundVideo;

// src={`${process.env.PUBLIC_URL}/videos/background_video.mp4`}
