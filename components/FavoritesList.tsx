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

import DeleteIcon from "../assets/delete-24px.svg";
import { ICityCurrentWeather } from "../types";
import { ButtonIcon } from "./ButtonIcon";
import { ConditionallyRender } from "./ConfitionallyRender";
import { getTemperatureBackgroundColor } from "./getTemperatureBackgroundColor";

interface IProps {
  cities: ICityCurrentWeather[];
  onChangeCities: (cities: ICityCurrentWeather[]) => void;
}

const CIRCLE_SIZE = 64;
const ICON_SIZE = 24;

const scrollCss = css`
  padding: var(--gutter);
  border-radius: var(--border-radius);
  max-height: calc(100vh - var(--header-height));
  overflow: auto;
`;

const listItemCss = css`
  padding: var(--gutter);

  display: grid;
  grid-gap: var(--gutter);
  align-items: center;
  grid-template-columns: auto 1fr auto;
  background-color: var(--theme-bg-color);

  border-bottom: 1px solid var(--calendar-border-color);
  margin-bottom: var(--gutter);
`;

const listCss = css`
  list-style: none;
  border-radius: var(--border-radius);
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

const temperatureCss = css`
  font-size: 14px;
  font-weight: 600;
  color: var(--main-color);
`;

const cityNameCss = css`
  font-size: var(--font-size-title);
  color: var(--body-color);
`;

const itemContentCss = css``;

const droppableId = "droppableId";

function ClientOnlyFavoritesList(props: IProps) {
  const { cities, onChangeCities } = props;

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

  function handleRemoveItemFromFavorites(itemToRemove: ICityCurrentWeather) {
    onChangeCities(cities.filter((c) => c.id !== itemToRemove.id));
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
                    <Draggable key={c.id} draggableId={`${c.id}`} index={index}>
                      {(
                        dragProvided: DraggableProvided,
                        _dragSnapshot: DraggableStateSnapshot
                      ) => {
                        const temperature = c.main.temp;
                        const name = c.name;
                        return (
                          <li
                            key={c.id}
                            className={listItemCss}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            style={{
                              ...dragProvided.draggableProps.style,
                              color: getTemperatureBackgroundColor(temperature),
                            }}
                            ref={dragProvided.innerRef}
                          >
                            <div
                              className={circleCss}
                              style={{
                                backgroundColor: getTemperatureBackgroundColor(
                                  temperature
                                ),
                              }}
                            >
                              {temperature}°
                            </div>
                            <div className={itemContentCss}>
                              <div className={cityNameCss}>{name}</div>
                              <div className={temperatureCss}>
                                {temperature}°
                              </div>
                            </div>
                            <ButtonIcon
                              onClick={() => handleRemoveItemFromFavorites(c)}
                            >
                              <DeleteIcon
                                height={ICON_SIZE}
                                width={ICON_SIZE}
                              />
                            </ButtonIcon>
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

export function FavoritesList(props: IProps) {
  return (
    <ConditionallyRender client>
      <ClientOnlyFavoritesList {...props} />
    </ConditionallyRender>
  );
}
