// @flow
import React from "react";

import { Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

import DraggableItem from "./DraggableItem";
import { ITEM_BOTTOM_MARGIN } from "./constants";

import type { Element as ElementType, CTA as CTAType } from "./types";

type Props = {|
  columnId: string,
  items: ElementType[] | CTAType[],
  isCtas?: boolean,
  styles: { [any]: any },
|};

function List({ columnId, items, styles, isCtas = false }: Props) {
  return (
    <Droppable
      droppableId={`${columnId}/${isCtas ? "ctas" : "elements"}`}
      type={isCtas ? "CTAS" : "ELEMENTS"}
      direction="vertical"
    >
      {(provided, snapshot) => (
        <StyledList
          css={styles}
          isEmpty={items.length === 0}
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {items.map((item, index) => (
            <DraggableItem
              key={item.id}
              index={index}
              name={item.name}
              id={item.id}
              type={item.type}
              columnId={columnId}
            />
          ))}
          {provided.placeholder}
        </StyledList>
      )}
    </Droppable>
  );
}

export default List;

const StyledList = styled.div`
  background: ${props =>
    props.isEmpty || props.isDraggingOver ? "#eee" : "transparent"};
  margin-bottom: ${props => (props.isEmpty ? "5px" : 0)};
  min-height: 20px;
  > .list-item {
    margin-bottom: ${ITEM_BOTTOM_MARGIN}px;
  }
`;
