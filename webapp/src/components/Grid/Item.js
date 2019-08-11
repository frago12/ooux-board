// @flow
import React from "react";

import { useDrag, useDrop } from "react-dnd";

import { ItemContainer } from "./styledComponents";
import { getColor } from "./utils";

export type Type = "object" | "coredata" | "metadata" | "cta";

type Props = {|
  index: number,
  name: string,
  position: number,
  type: Type,
  move: (dragIndex, hoverIndex) => void,
|};

function Item({ index, name, position, type, move }: Props) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    // TODO: update this when working with multiple lists
    accept: "items",
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
    item: { type: "items", position, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ItemContainer
      background={getColor(type)}
      isDragging={isDragging}
      ref={ref}
    >
      {name}
    </ItemContainer>
  );
}

export default Item;
