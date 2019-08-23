// @flow
import React from "react";

// $FlowFixMe
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { css } from "@emotion/core";

import Element from "./Element";
import { ActionsContext } from ".";

import type { ElementTypes } from "./Element";

export type ElementType = {|
  id: string,
  name: string,
  type: ElementTypes,
|};

type Props = {|
  columnId: string,
  items: ElementType[],
|};

function List({ columnId, items }: Props) {
  const { onReorderElements } = React.useContext(ActionsContext);

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) return;

    onReorderElements(columnId, result.source.index, result.destination.index);
  };

  return (
    <DragDropContext {...{ onDragEnd }}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            css={cssList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Element
                key={item.id}
                index={index}
                name={item.name}
                id={item.id}
                type={item.type}
                columnId={columnId}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;

const cssList = css`
  > * {
    margin-bottom: 5px;
  }
`;
