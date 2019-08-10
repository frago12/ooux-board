// @flow
import * as React from "react";

import { css } from "@emotion/core";

import AddCell from "./AddCell";
import Cell from "./Cell";
import Column from "./Column";
import useGrid from "./useGrid";

export type Data = Array<{
  name: string,
  data: Array<{}>,
  [string]: any,
}>;

type Props = {|
  data: Data,
  itemRenderer: React.ComponentType<any>,
  onAdd: (columnIndex: number) => void,
  onRemove: (columnIndex: number, rowIndex: number) => void,
|};

function Grid({ data, itemRenderer, onAdd, onRemove }: Props) {
  const {
    columns,
    columnIndex: currentColumnIndex,
    rowIndex: currentRowIndex,
    editableContent,
    setEditableContent,
    handleClick,
    handleKeyDown,
  } = useGrid(data);

  const onKeyDown = ({ keyCode }) => handleKeyDown(keyCode);

  return (
    <div className={cssGrid} onKeyDown={onKeyDown}>
      {columns.map(column => (
        <Column key={column.index}>
          {column.data.map(cell => (
            <Cell
              key={`${cell.rowIndex}${cell.columnIndex}`}
              {...{
                currentRowIndex,
                currentColumnIndex,
                editableContent,
                setEditableContent,
                handleClick,
                itemRenderer,
              }}
              columnIndex={cell.columnIndex}
              handleRemove={onRemove}
              rowIndex={cell.rowIndex}
              cellData={cell}
            />
          ))}
          <AddCell
            handleAdd={onAdd}
            columnIndex={column.index}
            rowIndex={column.data.length}
            {...{ currentColumnIndex, currentRowIndex }}
          />
        </Column>
      ))}
    </div>
  );
}

export default Grid;

const cssGrid = css`
  display: flex;
  width: 100% "";
`;
