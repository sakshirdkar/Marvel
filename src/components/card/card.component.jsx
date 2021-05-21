import React from "react";
import "./card.styles.css";
export const Card = (props) => {
  return (
    <div className="card-container">
      <img
        alt="hero"
        src={`${props.children.path}/standard_large.${props.children.extension}`}
      />
      <h2>{props.name}</h2>
    </div>
  );
};
