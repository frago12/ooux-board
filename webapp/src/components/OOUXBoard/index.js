// @flow
import * as React from "react";

import Board from "./Board";
import { OOUXProvider } from "./OOUXContext";

import type { BoardData } from "./types";

type Props = {|
  initialData: BoardData,
  onChange: (data: BoardData) => void,
|};

function OOUXBoard({ initialData, onChange }: Props) {
  return (
    <OOUXProvider {...{ initialData }}>
      <Board {...{ onChange }} />
    </OOUXProvider>
  );
}

export default OOUXBoard;
