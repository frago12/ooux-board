// @flow
import React from "react";

import { css } from "@emotion/core";

import { ItemContainer } from "./styledComponents";
import { colors } from "./utils";

type Props = {|
  name: string,
|};

function MainObject({ name }: Props) {
  return (
    <div css={cssMainObject}>
      <ItemContainer background={colors.blue}>{name}</ItemContainer>
    </div>
  );
}

export default MainObject;

const cssMainObject = css`
  font-weight: bold;
  text-transform: uppercase;
`;
