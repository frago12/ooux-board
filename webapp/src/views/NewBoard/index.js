// @flow
import React from "react";

import { css } from "@emotion/core";

import BoardForm from "components/BoardForm";

function NewBoard() {
  return (
    <div css={cssBoard}>
      <BoardForm />
    </div>
  );
}

export default NewBoard;

const cssBoard = css`
  padding: 20px;
`;
