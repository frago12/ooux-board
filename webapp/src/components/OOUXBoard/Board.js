// @flow
import * as React from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { css } from "@emotion/core";

import AddSystemObject from "./AddSystemObject";
import AddCTA from "./AddCTA";
import AddElement from "./AddElement";
import List from "./List";
import SystemObject from "./SystemObject";
import { useOOUX } from "./OOUXContext";
import { ITEM_SIZE, ITEM_BOTTOM_MARGIN, ITEM_CONTROLS_SIZE } from "./constants";

import type { BoardData } from "./types";

type Props = {|
  onChange: (data: BoardData) => void,
|};

function Board({ onChange }: Props) {
  const {
    state: { data },
    dispatch,
  } = useOOUX();
  const [isInitUpdate, setIsInitUpdate] = React.useState(true);

  React.useEffect(() => {
    isInitUpdate ? setIsInitUpdate(false) : onChange(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const ctasHeight = React.useMemo(() => {
    let maxCtas = 0;
    data.forEach(column => {
      if (column.ctas.length > maxCtas) maxCtas = column.ctas.length;
    });

    return (
      maxCtas * (ITEM_SIZE + ITEM_BOTTOM_MARGIN) +
      ITEM_CONTROLS_SIZE +
      ITEM_BOTTOM_MARGIN
    );
  }, [data]);

  const onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    // dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === "board") {
      dispatch({
        type: "reorderColumns",
        payload: {
          sourceIndex: source.index,
          destinationIndex: destination.index,
        },
      });
    } else {
      /*
       * Droppable ids are structured in the following way:
       * `droppableId = columnId/group}`
       * so we can apply destructuring to grab the data we want
       */
      const [sourceColumnId, group] = source.droppableId.split("/");
      const [destinationColumnId] = destination.droppableId.split("/");

      dispatch({
        type: "reorderItems",
        payload: {
          sourceColumnId,
          sourceItemIndex: source.index,
          destinationColumnId,
          destinationItemIndex: destination.index,
          group,
        },
      });
    }
  };

  return (
    <div css={cssBoardContainer}>
      <DragDropContext {...{ onDragEnd }}>
        <Droppable droppableId="board" type="COLUMNS" direction="horizontal">
          {(provided, snapshot) => (
            <div
              css={cssBoard}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.map((column, index) => (
                <Draggable
                  draggableId={column.id}
                  index={index}
                  key={column.id}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div css={[cssCtasContainer, { height: ctasHeight }]}>
                        <AddCTA to={column.id} />
                        <List columnId={column.id} items={column.ctas} isCtas />
                      </div>
                      <SystemObject
                        id={column.id}
                        name={column.name}
                        dragHandleProps={provided.dragHandleProps}
                      />
                      <List columnId={column.id} items={column.elements} />
                      <AddElement to={column.id} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <div css={{ height: ctasHeight }} />
        <AddSystemObject />
      </div>
    </div>
  );
}

export default Board;

const cssBoardContainer = css`
  display: flex;
  width: 100%;
`;

const cssBoard = css`
  display: flex;
  > * {
    margin-right: 15px;
  }
`;

const cssCtasContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 0;
  > * {
    margin-bottom: 5px;
  }
`;
