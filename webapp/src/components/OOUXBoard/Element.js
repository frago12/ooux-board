// @flow
import React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { useDrag, useDrop } from "react-dnd";

import { ActionsContext } from ".";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

export type ElementTypes = "object" | "coredata" | "metadata" | "cta";

type Props = {|
  index: number,
  name: string,
  id: string,
  type: ElementTypes,
  listId: string,
  move: (number, number) => void,
|};

function Element({ index, name, id, type, listId, move }: Props) {
  const { onRemoveElement } = React.useContext(ActionsContext);
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    // TODO: update this when working with multiple lists
    accept: listId,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: listId, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const onClickRemove = () => {
    onRemoveElement(listId, id);
  };

  return (
    <ElementContainer
      css={cssContainer}
      background={getColor(type)}
      isDragging={isDragging}
      ref={ref}
      tabIndex="0"
    >
      <CloseButton
        className="closeButton"
        type="button"
        onClick={onClickRemove}
      >
        x
      </CloseButton>
      {name}
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
