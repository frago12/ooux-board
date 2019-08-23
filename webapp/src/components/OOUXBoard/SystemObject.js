// @flow
import React from "react";

import { css } from "@emotion/core";

import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

type Props = {|
  name: string,
|};

function SystemObject({ name }: Props) {
  return (
    <div css={cssSystemObject}>
      <ElementContainer background={getColor("object")}>
        {name}
      </ElementContainer>
    </div>
  );
}

export default SystemObject;

const cssSystemObject = css`
  font-weight: bold;
  text-transform: uppercase;
`;
