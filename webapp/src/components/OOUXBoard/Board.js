// @flow
import * as React from "react";

import { css } from "@emotion/core";

import AddMainObject from "./AddMainObject";
import AddElement from "./AddElement";
import List from "./List";
import MainObject from "./MainObject";
import TopWhiteSpace from "./TopWhiteSpace";
import { useOOUX } from "./OOUXContext";

import type { BoardData } from "./types";

type Props = {|
  onChange: (data: BoardData) => void,
|};

function Board({ onChange }: Props) {
  const {
    state: { data },
  } = useOOUX();

  React.useEffect(() => {
    onChange(data);
  }, [data, onChange]);

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
        <div css={cssColumn} key={column.id}>
          <TopWhiteSpace
            maxCtas={maxCtas}
            columnCtasCount={column.ctas.length}
          />
          <List columnId={column.id} items={column.ctas} />
          <MainObject name={column.name} />
          <List columnId={column.id} items={column.elements} />
          <AddElement to={column.id} />
        </div>
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

const cssColumn = css`
  > * {
    margin-bottom: 5px;
  }
`;
