// @flow
import React from "react";

import uuid from "uuid/v1";

import AutogrowInput from "./AutogrowInput";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";
import { textColors } from "styles/variables";
import { useOOUX } from "./OOUXContext";

type Props = {|
  styles?: string,
|};

function AddMainObject({ styles }: Props) {
  const { dispatch } = useOOUX();

  const submit = value => {
    dispatch({ type: "addMainObject", payload: { id: uuid(), name: value } });
  };

  return (
    <ElementContainer
      background={getColor("empty")}
      css={[cssAddObject, styles]}
    >
      <AutogrowInput
        styles={{
          cursor: "pointer",
          background: "transparent",
        }}
        placeholder="Add Object"
        onSubmit={submit}
        onCancel={() => {}}
      />
    </ElementContainer>
  );
}

export default AddMainObject;

const cssAddObject = {
  border: "2px dashed #ccc",
  boxSizing: "border-box",
  color: textColors.gray,
};
