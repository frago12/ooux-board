// @flow
import React from "react";

import { css } from "@emotion/core";

import NewBoard from "./NewBoard";

function MyBoards() {
  return (
    <div css={cssMyBoard}>
      <NewBoard />
    </div>
  );
}

export default MyBoards;

const cssMyBoard = css`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 0 auto;
  max-width: 1080px;
`;
