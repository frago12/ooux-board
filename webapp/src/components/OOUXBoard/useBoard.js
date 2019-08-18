// @flow
import React from "react";

import type { Data } from ".";

function useBoard(data: Data) {
  const { parsedData, maxCtas } = React.useMemo(() => {
    let maxCtas = 0;
    // $FlowFixMe
    const parsedData = data.map(list => {
      const items = [];
      const ctas = [];

      list.data.forEach(item => {
        item.type === "cta" ? ctas.push(item) : items.push(item);
      });

      if (ctas.length > maxCtas) maxCtas = ctas.length;

      return {
        id: list.id,
        objectName: list.objectName,
        items,
        ctas,
      };
    });

    return { parsedData, maxCtas };
  }, [data]);

  return { data: parsedData, maxCtas };
}

export default useBoard;
