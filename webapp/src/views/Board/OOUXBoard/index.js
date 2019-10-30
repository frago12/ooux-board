// @flow
import * as React from "react";

import Board from "./Board";
import { OOUXProvider } from "./OOUXContext";

import type { ElementType } from "./List";
import type { NewElement } from "./AddElement";

export type Data = Array<{
  id: string,
  systemObject: string,
  elements: ElementType[],
  ctas: ElementType[],
}>;

type Props = {|
  initialData: Data,
  onAddElement: (columnId: string, item: NewElement) => void,
  onRemoveElement: (columnId: string, itemId: string) => void,
  onEditElement: (columnId: string, item: ElementType) => void,
  onReorderElements: (
    columnId: string,
    startIndex: number,
    endIndex: number,
  ) => void,
|};

function OOUXBoard({
  initialData,
  onAddElement,
  onRemoveElement,
  onEditElement,
  onReorderElements,
}: Props) {
  return (
    <OOUXProvider>
      <Board />
    </OOUXProvider>
  );
}

export default OOUXBoard;
