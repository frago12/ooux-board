// @flow
import * as React from "react";

import { css } from "@emotion/core";

type CellData = {
  columnIndex: number,
  rowIndex: number,
  [string]: any,
};

type Props = {|
  cellData: CellData,
  columnIndex: number,
  columnIndex: number,
  currentColumnIndex: number,
  currentRowIndex: number,
  editableContent: boolean,
  handleClick: (columnIndex: number, rowIndex: number) => void,
  handleRemove: (columnIndex: number, rowIndex: number) => void,
  itemRenderer: React.ComponentType<any>,
  rowIndex: number,
  setEditableContent: (editableContent: boolean) => void,
|};

const DELETE_KEY = 46;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function Cell({
  cellData,
  columnIndex,
  currentColumnIndex,
  currentRowIndex,
  editableContent,
  handleClick,
  handleRemove,
  itemRenderer: ItemRenderer,
  rowIndex,
  setEditableContent,
}: Props) {
  const refCell: { current: any } = React.useRef(null);

  const isSelected = React.useMemo(
    () => columnIndex === currentColumnIndex && rowIndex === currentRowIndex,
    [columnIndex, currentColumnIndex, currentRowIndex, rowIndex],
  );

  React.useEffect(() => {
    isSelected && refCell.current.focus();
  }, [isSelected]);

  const onKeyDown = e => {
    if (e.keyCode === ENTER_KEY && !editableContent) {
      e.stopPropagation();
      setEditableContent(true);
    } else if (e.keyCode === ESCAPE_KEY) {
      e.stopPropagation();
      disableCell();
    } else if (e.keyCode === DELETE_KEY) {
      e.stopPropagation();
      handleRemove(columnIndex, rowIndex);
    }
  };

  const disableCell = () => {
    setEditableContent(false);
    refCell.current.focus();
  };

  const onClick = () => {
    handleClick(columnIndex, rowIndex);
  };

  return (
    <div
      className={cssCell}
      tabIndex="0"
      ref={refCell}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <ItemRenderer
        {...cellData}
        canEditContent={isSelected && editableContent}
        disableCell={disableCell}
      />
    </div>
  );
}

export default Cell;

const cssCell = css`
  min-height: 30px;
  min-width: 100px;
  outline: none;
  :focus {
    outline-style: solid;
    outline-color: #333;
    outline-width: 1px;
  }
`;
