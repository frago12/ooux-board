// @flow
import React from "react";

import { Link } from "@reach/router";
import { css } from "@emotion/core";

import { textColors } from "styles/variables";

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
  background: #eee;
  color: ${textColors.black};
  display: flex;
  font-size: 14px;
  font-weight: bold;
  height: 90px;
  justify-content: center;
  text-decoration: none;
`;
