// @flow
import React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/core";

import AutogrowInput from "./AutogrowInput";
import { ElementContainer } from "./styledComponents";

type Props = {|
  name: string,
  backgroundColor: string,
  onSubmit: (value: string) => void,
  onRemove: () => void,
  isDragging?: boolean,
  styles?: { [any]: any },
|};

function Element({
  name,
  backgroundColor,
  onSubmit,
  onRemove,
  isDragging = false,
  styles = {},
}: Props) {
  const [editMode, setEditMode] = React.useState(false);

  const onDoubleClick = () => {
    setEditMode(true);
  };

  const submitHandler = value => {
    onSubmit(value);
    cancel();
  };

  const cancel = () => {
    setEditMode(false);
  };

  return (
    <ElementContainer
      css={[cssContainer, styles]}
      background={backgroundColor}
      onDoubleClick={onDoubleClick}
      isDragging={isDragging}
    >
      <CloseButton type="button" className="closeButton" onClick={onRemove}>
        x
      </CloseButton>
      {editMode ? (
        <AutogrowInput
          defaultValue={name}
          onSubmit={submitHandler}
          onCancel={cancel}
        />
      ) : (
        name
      )}
    </ElementContainer>
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
