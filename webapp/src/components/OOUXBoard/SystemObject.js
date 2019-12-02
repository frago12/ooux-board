// @flow
import React from "react";

import Item from "./Item";
import { getColor } from "./utils";
import { useOOUX } from "./OOUXContext";
import { ITEM_BOTTOM_MARGIN } from "./constants";

import type { DragHandleProps } from "react-beautiful-dnd";

type Props = {|
  id: string,
  name: string,
  dragHandleProps: DragHandleProps,
|};

function SystemObject({ id, name, dragHandleProps }: Props) {
  const { dispatch } = useOOUX();

  const submitItem = value => {
    dispatch({
      type: "editSystemObject",
      payload: { id, name: value },
    });
  };

  const removeItem = () => {
    dispatch({
      type: "removeSystemObject",
      payload: { id },
    });
  };

  return (
    <div className="list-item" {...dragHandleProps}>
      <Item
        name={name}
        backgroundColor={getColor("object")}
        onSubmit={submitItem}
        onRemove={removeItem}
        styles={{
          textTransform: "uppercase",
          fontSize: 12,
          marginBottom: ITEM_BOTTOM_MARGIN,
        }}
      />
    </div>
  );
}

export default SystemObject;
