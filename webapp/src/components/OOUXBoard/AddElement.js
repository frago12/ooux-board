// @flow
import React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/core";

import AutogrowInput from "./AutogrowInput";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";
import { ActionsContext } from ".";

import type { ElementTypes } from "./Element";

export type NewElement = {|
  name: string,
  type: ElementTypes,
|};

type Props = {|
  to: string,
|};

const DEFAULT_ELEMENT_TYPE = "coredata";

function AddElement({ to }: Props) {
  const [newElement, setNewElement] = React.useState({
    creating: false,
    type: DEFAULT_ELEMENT_TYPE,
  });

  const { onAddElement } = React.useContext(ActionsContext);

  const addNewElement = type => () => {
    setNewElement({ creating: true, type });
  };

  const submit = value => {
    onAddElement(to, { name: value, type: newElement.type });
    cancel();
  };

  const cancel = () => {
    setNewElement({ creating: false, type: DEFAULT_ELEMENT_TYPE });
  };

  return (
    <div>
      {newElement.creating ? (
        <ElementContainer background={getColor(newElement.type)}>
          <AutogrowInput onCancel={cancel} onSubmit={submit} />
        </ElementContainer>
      ) : (
        <div css={cssButtonsContainer}>
          <Button
            background={getColor("coredata")}
            onClick={addNewElement("coredata")}
          >
            +
          </Button>
          <Button
            background={getColor("metadata")}
            onClick={addNewElement("metadata")}
          >
            +
          </Button>
          <Button
            background={getColor("object")}
            onClick={addNewElement("object")}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default AddElement;

const cssButtonsContainer = css`
  display: flex;

  button:first-child {
    margin-right: 7.5px;
  }
  button:last-child {
    margin-left: 7.5px;
  }
`;

const Button = styled.button`
  background: ${props => props.background};
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight bold;
  height: 25px;
  opacity: 0.5;
  width: 25px;

  :hover, :focus {
    opacity: 1;
  }
`;
