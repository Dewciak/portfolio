"use client";

import {AdvancedVideo} from "@cloudinary/react";
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";

interface CloudinaryVideoProps {
  cloudName: string;
  videoId: string | undefined;
  width?: number;
}
// Video player component
const CloudinaryVideo = ({cloudName, videoId, width = 600}: CloudinaryVideoProps) => {
  const cld = new Cloudinary({
    cloud: {cloudName},
  });

  const myVideo = cld.video(videoId).resize(fill().width(width));

  return <AdvancedVideo cldVid={myVideo} controls autoPlay muted className='z-40' playsInline />;
};

export default CloudinaryVideo;
