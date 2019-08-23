// @flow
import React from "react";

import { css } from "@emotion/core";

import AddElement from "./AddElement";
import List from "./List";
import MainObject from "./SystemObject";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

import type { ElementTypes } from "./Element";

type ElementProps = {|
  id: string,
  name: string,
  type: ElementTypes,
|};

type Props = {|
  id: string,
  name: string,
  elements: ElementProps[],
  ctas: ElementProps[],
  maxCtas: number,
|};

function Column({ id, name, elements, ctas, maxCtas }: Props) {
  return (
    <div css={cssColumn}>
      {[...Array(maxCtas - ctas.length).keys()].map(i => (
        <ElementContainer key={i} background={getColor("empty")} />
      ))}
      <List columnId={id} items={ctas} dragEndAction="reorderCtas" />
      <MainObject name={name} />
      <List columnId={id} items={elements} dragEndAction="reorderElements" />
      <AddElement to={id} />
    </div>
  );
}

export default Column;

const cssColumn = css`
  > * {
    margin-bottom: 5px;
  }
`;
