// @flow
import React from "react";

import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

type Props = {
  maxCtas: number,
  columnCtasCount: number,
};

function TopWhiteSpace({ maxCtas, columnCtasCount }: Props) {
  return (
    <>
      {[...Array(maxCtas - columnCtasCount).keys()].map(i => (
        <ElementContainer key={i} background={getColor("empty")} />
      ))}
    </>
  );
}

export default TopWhiteSpace;
