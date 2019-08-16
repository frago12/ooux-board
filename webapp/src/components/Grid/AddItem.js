// @flow
import React from "react";

import TextareaAutosize from "react-autosize-textarea";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { ItemContainer } from "./styledComponents";
import { getColor } from "./utils";

import type { Type } from "./Item";

export type NewItem = {|
  name: string,
  type: Type,
|};

type Props = {|
  onCreate: (string, NewItem) => void,
  to: string,
|};

function AddItem({ to, onCreate }: Props) {
  const [newItem, setNewItem] = React.useState({ creating: false, type: "" });
  const inputRef = React.createRef();

  React.useEffect(() => {
    if (newItem.creating && inputRef.current !== null) inputRef.current.focus();
  }, [newItem.creating, inputRef]);

  const addNewItem = type => () => {
    setNewItem({ creating: true, type });
  };

  const onBlur = () => {
    const name = inputRef.current.value;
    if (!name) cancel();
    else {
      onCreate(to, { name, type: newItem.type });
      cancel();
    }
  };

  const cancel = () => {
    setNewItem({ creating: false, type: "" });
  };

  return (
    <div>
      {newItem.creating ? (
        <ItemContainer background={getColor(newItem.type)}>
          <TextareaAutosize
            css={cssInput}
            placeholder="Enter title"
            ref={inputRef}
            onBlur={onBlur}
          />
        </ItemContainer>
      ) : (
        <div css={cssButtonsContainer}>
          <Button
            background={getColor("coredata")}
            onClick={addNewItem("coredata")}
          >
            +
          </Button>
          <Button
            background={getColor("metadata")}
            onClick={addNewItem("metadata")}
          >
            +
          </Button>
          <Button
            background={getColor("object")}
            onClick={addNewItem("object")}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default AddItem;

const cssButtonsContainer = css`
  display: flex;

  button:first-child {
    margin-right: 7.5px;
  }
  button:last-child {
    margin-left: 7.5px;
  }
`;

const cssInput = css`
  border: none;
  color: #333;
  font-size: 12px;
  text-align: center;
  resize: none;
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
