// @flow
import React from "react";

import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

type Props = {
  addControlsSpace?: boolean,
  maxCtas: number,
  columnCtasCount: number,
};

function TopWhiteSpace({
  addControlsSpace = false,
  maxCtas,
  columnCtasCount,
}: Props) {
  return (
    <>
      {[...Array(maxCtas - columnCtasCount).keys()].map(i => (
        <ElementContainer key={i} background={getColor("empty")} />
      ))}
      {addControlsSpace && <div css={{ height: 50 }} />}
    </>
  );
}

export default TopWhiteSpace;
