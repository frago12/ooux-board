// @flow
import * as React from "react";

import { css } from "@emotion/core";

type Props = {|
  children: React.Node,
|};

function Column({ children }: Props) {
  return <div className={cssColumn}>{children}</div>;
}

export default Column;

const cssColumn = css`
  border-right: 1px solid #ddd;
  min-width: 270px;
`;
