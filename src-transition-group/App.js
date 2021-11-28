import React, { useCallback, useEffect, useState } from "react";
import { Swipeable } from "react-touch";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import Number from "./Number";

function App() {
  const [state, setState] = useState({
    currentIndex: 0,
    direction: "fromTop",
  });
  const { currentIndex, direction } = state;
  const values = [
    getItem(2000, "Mindful minutes"),
    getItem(20, "Current Streak"),
    getItem(0, "Longest Streak"),
  ];
  const currentItem = values[currentIndex] || { value: false };
  console.log(currentIndex, currentItem);
  const value = currentItem.value;
  const updateIndex = useCallback(
    function updateIndex(newIndex, direction) {
      setState({
        currentIndex: false,
        isReversed: true,
      });

      setTimeout(function timeout() {
        setState({
          currentIndex: newIndex,
          direction,
        });
      }, 400);
    },
    [setState]
  );
  const increase = useCallback(() => {
    if (state.currentIndex === values.length - 1) return;
    console.log(state.currentIndex);
    updateIndex(state.currentIndex + 1, "fromBottom");
  }, [state, updateIndex]);
  const decrease = useCallback(() => {
    if (state.currentIndex === 0) return;
    updateIndex(state.currentIndex - 1, "fromTop");
  }, [state, updateIndex]);

  return (
    <Swipeable onSwipeLeft={increase} onSwipeRight={decrease}>
      <div className="app">
        <TransitionGroup className="numbers">
          {value !== false ? (
            <CSSTransition
              classNames="number"
              key={value + direction}
              timeout={900}
            >
              <Number value={value} direction={direction} />
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    </Swipeable>
  );
}

function getItem(n) {
  return {
    value: n,
  };
}

export default App;
