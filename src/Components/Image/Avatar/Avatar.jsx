import React from "react";
import { Image } from "react-bootstrap";
import default_image from "Assets/Images/avatar_jobhere.png";
import "./Avatar.css";

const Avatar = (props) => {
  const { width, url, className, children } = props;
  console.log('------url',url);
  return (
    <div className={`image-square ${className || ""}`} style={{ width: `${width}` }}>
      <Image
        src={url ? url : default_image}
        alt="Avatar"
        roundedCircle
        className="avatar__img"
      ></Image>
      <div>{children}</div>
    </div>
  );
};

export default Avatar;
