import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import "./App.css";

const DEFAULT_INDICATOR = 5;
const ACTIVE_INDICATOR = 15;

function App() {
  const [state, setState] = useState({
    index: 0,
    movedIndex: 0,
    down: false,
  });
  const { index, movedIndex, down } = state;
  const items = [
    { num: 1, text: "text" },
    { num: 2, text: "another" },
    { num: 3, text: "and" },
    { num: 4, text: "one more" },
  ];
  const itemsLastIndex = items.length - 1;
  const currentIndex = map(down ? movedIndex : index, 0, 1, 0, itemsLastIndex);

  // Set the drag hook and define component movement based on gesture data.
  const bind = useDrag((_state) => {
    const {
      down,
      movement: [mx],
    } = _state;
    const width = _state.target.clientWidth;
    const delta = Math.max(Math.min(mx / width, 1), -1) * 0.7;
    const moved = state.index + map(delta, -1, 1, 1, -1);
    let newIndex;
    if (delta < 0) {
      newIndex = Math.min(
        state.index +
          Math.round(map(delta, 0, -1, 0, itemsLastIndex)) / itemsLastIndex,
        1
      );
    } else {
      newIndex = Math.max(
        state.index -
          Math.round(map(delta, 0, 1, 1, itemsLastIndex)) / itemsLastIndex,
        0
      );
    }

    setState({
      ...state,
      down,
      index: !down ? newIndex : state.index,
      movedIndex: Math.max(Math.min(moved, 1), 0),
    });
  });

  return (
    <div className="app" {...bind()}>
      <div key="numbers" className="wrapper animated">
        {items.map(function mapNumbers({ num }, index) {
          let style;

          const isCurrent = index === currentIndex;
          if (isCurrent) {
            style = { transform: `translate3d(0, 0, 0)` };
          } else {
            const offsetY = map(index - currentIndex, -1, 1, -100, 100);
            style = { transform: `translate3d(0, ${offsetY}%, 0)` };
          }

          return (
            <div key={num} style={style} className="current">
              {num}
            </div>
          );
        })}
      </div>
      <div key="text" className="text-wrapper animated">
        {items.map(function mapText({ text }, index) {
          let style;

          const isCurrent = index === currentIndex;
          if (isCurrent) {
            style = { transform: `translate3d(0, 0, 0)` };
          } else {
            const offsetX = map(index - currentIndex, -1, 1, -30, 30);
            style = { transform: `translate3d(${offsetX}vw, 0, 0)` };
          }

          return (
            <div key={text} style={style} className="current">
              {text}
            </div>
          );
        })}
      </div>
      <div
        key="indicators"
        style={{
          display: "flex",
          paddingTop: "1rem",
          justifyContent: "center",
        }}
      >
        {items.map(function mapIndicators(item, index) {
          let style = {
            width: DEFAULT_INDICATOR + "px",
            transition: "width 300ms",
            height: "5px",
            margin: "0 2px",
            borderRadius: "5px",
            background: "black",
            display: "inline-block",
          };

          const isCurrent = index === currentIndex;
          const oneStep = 1 / itemsLastIndex;
          if (isCurrent) {
            style.width = ACTIVE_INDICATOR + "px";
          } else if (
            index - oneStep > currentIndex ||
            index + oneStep < currentIndex
          ) {
            style.width = DEFAULT_INDICATOR + "px";
          } else if (index < currentIndex) {
            const progress = (currentIndex - index) / oneStep;
            style.width =
              map(progress, 0, 1, ACTIVE_INDICATOR, DEFAULT_INDICATOR) + "px";
          } else if (index > currentIndex) {
            const progress = (index - currentIndex) / oneStep;
            style.width =
              map(progress, 0, 1, DEFAULT_INDICATOR, ACTIVE_INDICATOR) + "px";
          }

          return <div key={index} style={style}></div>;
        })}
      </div>
    </div>
  );
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

export default App;
