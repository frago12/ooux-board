// @flow
import React from "react";

const BOTTOM_KEY = 40;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;

function useGridEventHandlers(columnsLength: number, itemsInColumns: number[]) {
  const [columnIndex, setColumnIndex] = React.useState<number>(0);
  const [rowIndex, setRowIndex] = React.useState<number>(0);
  const [editableContent, setEditableContent] = React.useState<boolean>(false);

  const handleKeyDown = (keyCode: number) => {
    if (keyCode === LEFT_KEY && columnIndex > 0) {
      const nextColumnItemslLen = itemsInColumns[columnIndex - 1];
      if (nextColumnItemslLen >= rowIndex) {
        setColumnIndex(index => index - 1);
      }
    } else if (keyCode === UP_KEY && rowIndex > 0) {
      setRowIndex(index => index - 1);
    } else if (keyCode === RIGHT_KEY && columnIndex < columnsLength) {
      const nextColumnItemslLen = itemsInColumns[columnIndex + 1];
      if (nextColumnItemslLen >= rowIndex) {
        setColumnIndex(index => index + 1);
      }
    } else if (keyCode === BOTTOM_KEY) {
      const columnItems = itemsInColumns[columnIndex];
      if (rowIndex < columnItems) {
        setRowIndex(index => index + 1);
      }
    }
  };

  const handleClick = (columnIndex: number, rowIndex: number) => {
    setColumnIndex(columnIndex);
    setRowIndex(rowIndex);
  };

  return {
    rowIndex,
    columnIndex,
    editableContent,
    handleKeyDown,
    handleClick,
    setEditableContent,
  };
}

export default useGridEventHandlers;
