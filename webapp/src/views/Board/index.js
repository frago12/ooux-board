// @flow
import React from "react";

import { css } from "@emotion/core";

import Grid from "components/Grid";

const data = [
  {
    id: "123",
    objectName: "Chef",
    data: [
      { position: 1, type: "coredata", name: "Profile pic" },
      { position: 2, type: "metadata", name: "Name" },
      { position: 3, type: "object", name: "Recipes" },
      { position: 4, type: "cta", name: "Follow" },
    ],
  },
];

function Board() {
  return (
    <div css={cssBoard}>
      <Grid data={data} />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
