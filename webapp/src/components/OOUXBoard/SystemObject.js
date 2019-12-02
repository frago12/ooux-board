// @flow
import React from "react";

import Item from "./Item";
import { getColor } from "./utils";
import { useOOUX } from "./OOUXContext";

type Props = {|
  id: string,
  name: string,
|};

function SystemObject({ id, name }: Props) {
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
    <Item
      name={name}
      backgroundColor={getColor("object")}
      onSubmit={submitItem}
      onRemove={removeItem}
      styles={{ textTransform: "uppercase", fontSize: 12 }}
    />
  );
}

export default SystemObject;
