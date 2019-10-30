// @flow
import * as React from "react";

import { css } from "@emotion/core";

import AddMainObject from "./AddMainObject";
import Column from "./Column";
import { useOOUX } from "./OOUXContext";

import type { ElementType } from "./List";

export type Data = Array<{
  id: string,
  systemObject: string,
  elements: ElementType[],
  ctas: ElementType[],
}>;

type Props = {|
  initialData: Data,
|};

function Board({ initialData }: Props) {
  const {
    state: { data },
  } = useOOUX();

  const maxCtas = React.useMemo(() => {
    let maxCtas = 0;
    data.forEach(column => {
      if (column.ctas.length > maxCtas) maxCtas = column.ctas.length;
    });

    return maxCtas;
  }, [data]);

  return (
    <div css={cssBoard}>
      {data.map(column => (
        <Column
          key={column.id}
          id={column.id}
          name={column.systemObject}
          elements={column.elements}
          ctas={column.ctas}
          maxCtas={maxCtas}
        />
      ))}
      <AddMainObject />
    </div>
  );
}

export default Board;

const cssBoard = css`
  display: flex;
  width: 100%;

  > * {
    margin-right: 15px;
  }
`;
