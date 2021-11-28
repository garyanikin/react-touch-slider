import React from "react";
import cx from "classnames";
import "./Number.css";

function Number({ value, direction }) {
  const numbers = Array.from(String(value));
  const classes = cx("number", direction);
  return <div className={classes}>{numbers.map(renderNumber)}</div>;
}

function renderNumber(n, index, ns) {
  const style = {
    animationDelay: getDelay(index, ns.length) + "ms",
  };
  return (
    <span key={index} style={style}>
      {n}
    </span>
  );
}

function getDelay(index, max) {
  // TODO add easing
  return (index / (max - 1)) * 200;
}

export default Number;
