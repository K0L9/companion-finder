import React from "react";
//@ts-ignore
import video from "../../../images/background_video.mp4";

const BackgroundVideo = () => {
  return (
    <video loop muted autoPlay id="background-video">
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
