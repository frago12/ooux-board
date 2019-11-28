// @flow
import React from "react";

import { css } from "@emotion/core";

import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

type Props = {|
  name: string,
|};

function MainObject({ name }: Props) {
  return (
    <div css={cssMainObject}>
      <ElementContainer background={getColor("object")}>
        {name}
      </ElementContainer>
    </div>
  );
}

export default MainObject;

const cssMainObject = css`
  font-weight: bold;
  text-transform: uppercase;
`;
