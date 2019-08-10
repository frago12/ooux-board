// @flow
import React from "react";

import type { Data } from ".";

type Column = {
  name: string,
  data: Array<{}>,
};

function useGridData(data: Data) {
  const [state, setState] = React.useState({
    columns: [],
    cellsPerColumn: [],
  });

  React.useEffect(() => {
    // $FlowFixMe
    const parsedData = data.map((column: Data, columnIndex: number) => ({
      ...column,
      index: columnIndex,
      data: column.data.map((row, rowIndex) =>
        makeCell(row, rowIndex, columnIndex),
      ),
    }));
    setState({
      columns: parsedData,
      // $FlowFixMe
      cellsPerColumn: data.map((column: Column) => column.data.length),
    });
  }, [data]);

  const makeCell = (row, rowIndex, columnIndex) => ({
    rowIndex: rowIndex,
    columnIndex: columnIndex,
    ...row,
  });

  return { ...state };
}

export default useGridData;
