// @flow
import * as React from "react";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { css } from "@emotion/core";

// import AddCell from "./AddCell";
import List from "./List";
// import useGrid from "./useGrid";

import type { Type as ItemType } from "./Item";

export type Data = Array<{
  objectName: string,
  data: Array<{|
    name: string,
    type: ItemType,
    position: number,
  |}>,
}>;

type Props = {|
  data: Data,
|};

function Grid({ data }: Props) {
  // const {
  //   columns,
  //   columnIndex: currentColumnIndex,
  //   rowIndex: currentRowIndex,
  //   editableContent,
  //   setEditableContent,
  //   handleClick,
  //   handleKeyDown,
  // } = useGrid(data);

  // const onKeyDown = ({ keyCode }) => handleKeyDown(keyCode);

  return (
    <div css={cssGrid}>
      <DndProvider backend={HTML5Backend}>
        {data.map(list => (
          <List key={list.id} name={list.objectName} data={list.data} />
        ))}
      </DndProvider>
    </div>
  );
}

export default Grid;

const cssGrid = css`
  display: flex;
  width: 100%;
`;
