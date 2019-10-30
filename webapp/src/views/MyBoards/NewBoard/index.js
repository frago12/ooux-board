// @flow
import React from "react";

import { Link } from "@reach/router";
import { css } from "@emotion/core";

import { textColors } from "styles/variables";

function NewBoard() {
  return (
    <Link to="b/new" css={cssNewBoard}>
      Create new board
    </Link>
  );
}

export default NewBoard;

const cssNewBoard = css`
  align-items: center;
  background: #eee;
  color: ${textColors.black};
  display: flex;
  height: 90px;
  justify-content: center;
  text-decoration: none;
`;
