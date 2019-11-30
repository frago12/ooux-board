// @flow
import React from "react";

import styled from "@emotion/styled";
// $FlowFixMe
import { Draggable } from "react-beautiful-dnd";
import { css } from "@emotion/core";

import AutogrowInput from "./AutogrowInput";
import { useOOUX } from "./OOUXContext";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

import type { ElementTypes } from "./types";

type Props = {|
  index: number,
  name: string,
  id: string,
  type: ElementTypes,
  columnId: string,
|};

function Element({ index, name, id, type, columnId }: Props) {
  const [editMode, setEditMode] = React.useState(false);
  const { dispatch } = useOOUX();

  const onClickRemove = () => {
    dispatch({
      type: "removeItem",
      payload: {
        columnId,
        itemId: id,
        group: type === "cta" ? "ctas" : "elements",
      },
    });
  };

  const onDoubleClick = () => {
    setEditMode(true);
  };

  const submit = value => {
    dispatch({
      type: "editItem",
      payload: {
        columnId,
        item: { id, name: value, type },
        group: type === "cta" ? "ctas" : "elements",
      },
    });
    cancel();
  };

  const cancel = () => {
    setEditMode(false);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ElementContainer
          css={cssContainer}
          background={getColor(type)}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={onDoubleClick}
        >
          <CloseButton
            type="button"
            className="closeButton"
            onClick={onClickRemove}
          >
            x
          </CloseButton>
          {editMode ? (
            <AutogrowInput
              defaultValue={name}
              onSubmit={submit}
              onCancel={cancel}
            />
          ) : (
            name
          )}
        </ElementContainer>
      )}
    </Draggable>
  );
}

export default Element;

const CloseButton = styled.button`
  background: ${props => props.background || "transparent"};
  border: none;
  color: #333;
  cursor: pointer;
  display: none;
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 0;
`;

const cssContainer = css`
  :hover {
    .closeButton {
      display: block;
    }
  }
`;
