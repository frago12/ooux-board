// @flow
import * as React from "react";

import { css } from "@emotion/core";

import Column from "./Column";

import type { ElementType } from "./List";
import type { NewElement } from "./AddElement";

export type Data = Array<{
  id: string,
  systemObject: string,
  elements: ElementType[],
  ctas: ElementType[],
}>;

type Props = {|
  data: Data,
  onAddElement: (columnId: string, item: NewElement) => void,
  onRemoveElement: (columnId: string, itemId: string) => void,
  onEditElement: (columnId: string, item: ElementType) => void,
  onReorderElements: (
    columnId: string,
    startIndex: number,
    endIndex: number,
  ) => void,
|};

// $FlowFixMe
export const ActionsContext = React.createContext({});

function OOUXBoard({
  data,
  onAddElement,
  onRemoveElement,
  onEditElement,
  onReorderElements,
}: Props) {
  const maxCtas = React.useMemo(() => {
    let maxCtas = 0;
    data.forEach(column => {
      if (column.ctas.length > maxCtas) maxCtas = column.ctas.length;
    });

    return maxCtas;
  }, [data]);

  return (
    <div css={cssBoard}>
      <ActionsContext.Provider
        value={{
          onAddElement,
          onRemoveElement,
          onEditElement,
          onReorderElements,
        }}
      >
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
      </ActionsContext.Provider>
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
