import React from "react";
import _ from "underscore";
import "./TagList.css";

const TagList = ({ tagData = [] }) => {
  return (
    <div className="TagList__container">
      {_.map(tagData, (item, index) => {
        return (
          <div key={index} className="TagList__item">
            <a href={item?.link ?? "#"} className="" target="_blank" rel="noreferrer">
              {item.label}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
