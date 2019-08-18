// @flow
import * as React from "react";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { css } from "@emotion/core";

import List from "./List";
import useBoard from "./useBoard";

import type { Type as ItemValuesType } from "./Item";
import type { NewItem } from "./AddItem";

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
  handleCreate: (string, NewItem) => void,
|};

function OOUXBoard({ data: _data, handleCreate }: Props) {
  const { data, maxCtas } = useBoard(_data);
  return (
    <div css={cssBoard}>
      <DndProvider backend={HTML5Backend}>
        {data.map(list => (
          <List
            key={`${list.objectName}-${list.items.length}-${list.ctas.length}`}
            id={list.id}
            name={list.objectName}
            items={list.items}
            ctas={list.ctas}
            maxCtas={maxCtas}
            handleCreate={handleCreate}
          />
        ))}
      </DndProvider>
    </div>
  );
}

export default OOUXBoard;

const cssBoard = css`
  display: flex;
  width: 100%;

  > * {
    margin-right: 15px;
  }
`;