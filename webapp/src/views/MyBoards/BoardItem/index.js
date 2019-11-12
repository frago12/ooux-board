// @flow
import React from "react";

import { Link } from "@reach/router";
import { css } from "@emotion/core";

import { colors } from "styles/variables";

type Props = {|
  id: string,
  title: string,
|};

function BoardItem({ id, title }: Props) {
  return (
    <Link to={`b/${id}`} css={cssBoardItem}>
      {title}
    </Link>
  );
}

export default BoardItem;

const cssBoardItem = css`
  align-items: center;
  background: ${colors.primary};
  color: #fff;
  display: flex;
  height: 90px;
  justify-content: center;
  text-decoration: none;
`;
