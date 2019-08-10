// @flow
import useGridData from "./useGridData";
import useGridEventListener from "./useGridEventListener";

import type { Data } from ".";

function useGrid(data: Data) {
  const gridData = useGridData(data);
  const gridEventListeners = useGridEventListener(
    gridData.columns.length - 1,
    gridData.cellsPerColumn,
  );

  return { ...gridData, ...gridEventListeners };
}

export default useGrid;
