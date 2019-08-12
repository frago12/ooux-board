// @flow
import React from "react";

import { css } from "@emotion/core";

import Grid from "components/Grid";

const data = [
  {
    id: "123",
    objectName: "Chef",
    data: [
      { id: 1, type: "coredata", name: "Name" },
      { id: 2, type: "coredata", name: "Profile pic" },
      { id: 3, type: "object", name: "Recipes" },
      { id: 4, type: "metadata", name: "# of chef followers" },
      { id: 5, type: "cta", name: "Follow" },
      { id: 6, type: "cta", name: "Favorite" },
      { id: 7, type: "cta", name: "Create, Edit, Delete" },
    ],
  },
  {
    id: "456",
    objectName: "Recipe",
    data: [
      { id: 1, type: "coredata", name: "Title" },
      { id: 2, type: "coredata", name: "Images" },
      { id: 3, type: "metadata", name: "Level of dificulty" },
      { id: 4, type: "cta", name: "Favorite" },
      { id: 5, type: "cta", name: "Create, Edit, Delete" },
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
