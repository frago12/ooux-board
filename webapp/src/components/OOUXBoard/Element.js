// @flow
import React from "react";

import styled from "@emotion/styled";
// $FlowFixMe
import { Draggable } from "react-beautiful-dnd";
import { css } from "@emotion/core";

import AutogrowInput from "./AutogrowInput";
import { ActionsContext } from ".";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

export type ElementTypes = "object" | "coredata" | "metadata" | "cta";

type Props = {|
  index: number,
  name: string,
  id: string,
  type: ElementTypes,
  columnId: string,
|};

function Element({ index, name, id, type, columnId }: Props) {
  const [editMode, setEditMode] = React.useState(false);
  const { onRemoveElement, onEditElement } = React.useContext(ActionsContext);

  const onClickRemove = () => {
    onRemoveElement(columnId, id);
  };

  const onDoubleClick = () => {
    setEditMode(true);
  };

  const submit = value => {
    onEditElement(columnId, { id, name: value, type });
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
            className="closeButton"
            type="button"
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
