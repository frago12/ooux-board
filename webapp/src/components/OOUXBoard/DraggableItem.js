// @flow
import React from "react";

// $FlowFixMe
import { Draggable } from "react-beautiful-dnd";

import Item from "./Item";
import { getColor } from "./utils";
import { useOOUX } from "./OOUXContext";

import type { ElementTypes } from "./types";

type Props = {|
  index: number,
  name: string,
  id: string,
  type: ElementTypes,
  columnId: string,
|};

function DraggableItem({ index, name, id, type, columnId }: Props) {
  const { dispatch } = useOOUX();

  const submitItem = value => {
    dispatch({
      type: "editItem",
      payload: {
        columnId,
        item: { id, name: value, type },
        group: type === "cta" ? "ctas" : "elements",
      },
    });
  };

  const removeItem = () => {
    dispatch({
      type: "removeItem",
      payload: {
        columnId,
        itemId: id,
        group: type === "cta" ? "ctas" : "elements",
      },
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className="list-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Item
            name={name}
            backgroundColor={getColor(type)}
            isDragging={snapshot.isDragging}
            onSubmit={submitItem}
            onRemove={removeItem}
          />
        </div>
      )}
    </Draggable>
  );
}

export default DraggableItem;
