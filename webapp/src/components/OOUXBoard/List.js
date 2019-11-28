// @flow
import React from "react";

// $FlowFixMe
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { css } from "@emotion/core";

import Element from "./Element";
import { useOOUX } from "./OOUXContext";

import type { Element as ElementType, CTA as CTAType } from "./types";

type Props = {|
  columnId: string,
  items: ElementType[] | CTAType[],
|};

function List({ columnId, items }: Props) {
  const { dispatch } = useOOUX();

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) return;

    dispatch({
      type: "reorderElements",
      payload: {
        columnId,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      },
    });
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
