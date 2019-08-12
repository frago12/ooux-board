// @flow
import * as React from "react";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { css } from "@emotion/core";

import List from "./List";
import useBoard from "./useBoard";

import type { Type as ItemValuesType } from "./Item";

export type Data = Array<{
  id: string,
  objectName: string,
  data: Array<{|
    id: number,
    name: string,
    type: ItemValuesType,
  |}>,
}>;

type Props = {|
  data: Data,
|};

function Grid({ data: _data }: Props) {
  const { data, maxCtas } = useBoard(_data);
  return (
    <div css={cssGrid}>
      <DndProvider backend={HTML5Backend}>
        {data.map(list => (
          <List
            key={list.id}
            id={list.id}
            name={list.objectName}
            items={list.items}
            ctas={list.ctas}
            maxCtas={maxCtas}
          />
        ))}
      </DndProvider>
    </div>
  );
}

export default Grid;

const cssGrid = css`
  display: flex;
  width: 100%;

  > * {
    margin-right: 15px;
  }
`;
