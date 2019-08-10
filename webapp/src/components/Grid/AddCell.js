import React from "react";

import { css } from "@emotion/core";

type Props = {
  columnId: string,
  handleAdd: (columnIndex: number) => void,
};

function AddCell({
  columnIndex,
  currentColumnIndex,
  currentRowIndex,
  handleAdd,
  rowIndex,
}: Props) {
  const ref: { current: any } = React.useRef(null);

  const isSelected = React.useMemo(
    () => columnIndex === currentColumnIndex && rowIndex === currentRowIndex,
    [columnIndex, currentColumnIndex, currentRowIndex, rowIndex],
  );

  React.useEffect(() => {
    isSelected && ref.current.focus();
  }, [isSelected]);

  const onClick = e => {
    e.stopPropagation();
    handleAdd(columnIndex);
  };

  return (
    <button className={cssAddCell} onClick={onClick} ref={ref}>
      +
    </button>
  );
}

const cssAddCell = css`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  height: 30px;
  width: 100%;

  :focus {
    outline-style: solid;
    outline-color: #333;
    outline-width: 1px;
  }
`;

export default AddCell;
