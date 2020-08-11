import cx from "classnames";
import { css } from "linaria";
import { move } from "ramda";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { transformRange } from "../../utils";

interface IProps {
  cities: string[];
  onChangeCities: (cities: string[]) => void;
}

const CIRCLE_SIZE = 50;

const listItemCss = css`
  padding: var(--gutter);

  display: grid;
  grid-gap: var(--gutter);
  align-items: center;
  justify-content: space-between;
  grid-auto-columns: auto;
  grid-auto-flow: column;

  background-color: var(--theme-bg-color);
  border-bottom: 1px solid var(--calendar-border-color);
`;

const listItemAnimatedCss = css`
  animation: slideUp 0.6s both;
  @keyframes slideUp {
    0% {
      transform: translateY(76px) scale(0.92);
      opacity: 0;
    }
  }
`;

const listCss = css`
  list-style: none;
`;
const circleCss = css`
  height: ${CIRCLE_SIZE}px;
  width: ${CIRCLE_SIZE}px;

  border-radius: var(--border-radius-rounded);
  border: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const scrollCss = css`
  max-height: calc(100vh - var(--header-height));
  overflow: auto;
`;

const droppableId = "droppableId";

function getBackgroundColor(temperature: number) {
  const MIN_TEMP = -5;
  const MAX_TEMP = 40;

  const MIN_HUE = 155;
  const MAX_HUE = 355;

  const hue = transformRange({
    value: temperature,
    inputRange: [MIN_TEMP, MAX_TEMP],
    outputRange: [MIN_HUE, MAX_HUE],
  });

  return `hsl(${360 - hue},80%,60%)`;
}

export function ClientOnlyFavoritesList(props: IProps) {
  const { cities, onChangeCities } = props;
  const [shouldAnimateList, setShouldAnimateList] = React.useState(true);

  function handleListAnimationEnd(e: React.AnimationEvent<HTMLLIElement>) {
    if (e.target === e.currentTarget) {
      setShouldAnimateList(false);
    }
  }

  function handleDragStart() {
    // Add a little vibration if the browser supports it.
    if (window.navigator.vibrate != null) {
      window.navigator.vibrate(100);
    }
  }

  function handleDragEnd(result: DropResult) {
    // combining item
    if (result.combine) {
      onChangeCities(cities.filter((_, i) => i !== result.source.index));
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const orderedCities = move(
      result.source.index,
      result.destination.index,
      cities
    );

    onChangeCities(orderedCities);
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Droppable droppableId={droppableId}>
        {(dropProvided) => {
          return (
            <div className={scrollCss}>
              <ul
                className={listCss}
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
              >
                {cities.map((c, index) => {
                  return (
                    <Draggable key={c} draggableId={c} index={index}>
                      {(
                        dragProvided: DraggableProvided,
                        _dragSnapshot: DraggableStateSnapshot
                      ) => {
                        const temperature = -20 + index * 6;
                        return (
                          <li
                            key={c}
                            className={cx(listItemCss, {
                              [listItemAnimatedCss]: shouldAnimateList,
                            })}
                            {...dragProvided.draggableProps}
                            style={{
                              ...dragProvided.draggableProps.style,
                              animationDelay: `${index * 0.14}s`,
                            }}
                            onAnimationEnd={
                              index === cities.length - 1
                                ? (e) => handleListAnimationEnd(e)
                                : undefined
                            }
                            ref={dragProvided.innerRef}
                          >
                            <div
                              className={circleCss}
                              style={{
                                backgroundColor: getBackgroundColor(
                                  temperature
                                ),
                              }}
                            >
                              icon
                            </div>
                            <div>{c}</div>
                            <div>{temperature} °C</div>
                            <div {...dragProvided.dragHandleProps}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" />
                              </svg>
                            </div>
                          </li>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </ul>
              <div>{dropProvided.placeholder}</div>
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
