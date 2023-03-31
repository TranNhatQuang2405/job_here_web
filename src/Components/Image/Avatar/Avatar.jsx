import React from "react";
import { Image } from "react-bootstrap";
import default_image from "Assets/Images/avatar_jobhere.png";
import "./Avatar.css";

const Avatar = ({ width, url, className, children, roundedCircle = true }) => {
  return (
    <div className={`image-square ${className || ""}`} style={{ width: `${width}` }}>
      <Image
        src={url ? url : default_image}
        alt="Avatar"
        roundedCircle={roundedCircle}
        className={"avatar__img"+ (roundedCircle ? "" : " avatar_square")}
      ></Image>
      <div>{children}</div>
    </div>
  );
};

export default Avatar;
