// @flow
import * as React from "react";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { css } from "@emotion/core";

import List from "./List";

import type { ElementTypes } from "./Element";
import type { NewElement } from "./AddElement";

type Element = {|
  id: string,
  name: string,
  type: ElementTypes,
|};

export type Data = Array<{
  id: string,
  systemObject: string,
  elements: Element[],
  ctas: Element[],
}>;

type Props = {|
  data: Data,
  onAddElement: (listId: string, item: NewElement) => void,
  onRemoveElement: (listId: string, itemId: string) => void,
  onEditElement: (listId: string, item: Element) => void,
|};

// $FlowFixMe
export const ActionsContext = React.createContext({});

function OOUXBoard({
  data,
  onAddElement,
  onRemoveElement,
  onEditElement,
}: Props) {
  const maxCtas = React.useMemo(() => {
    let maxCtas = 0;
    data.forEach(list => {
      if (list.ctas.length > maxCtas) maxCtas = list.ctas.length;
    });

    return maxCtas;
  }, [data]);

  return (
    <div css={cssBoard}>
      <ActionsContext.Provider
        value={{ onAddElement, onRemoveElement, onEditElement }}
      >
        <DndProvider backend={HTML5Backend}>
          {data.map(list => (
            <List
              key={`${list.systemObject}-${list.elements.length}-${list.ctas.length}`}
              id={list.id}
              name={list.systemObject}
              elements={list.elements}
              ctas={list.ctas}
              maxCtas={maxCtas}
            />
          ))}
        </DndProvider>
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
