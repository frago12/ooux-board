// @flow
import React from "react";

import { css } from "@emotion/core";

import Grid from "components/Grid";

const data = [
  {
    name: "Chef",
    data: [
      { id: 1, type: "core", name: "Name" },
      { id: 1, type: "core", name: "Profile pic" },
    ],
  },
];

function Board() {
  return (
    <div css={cssBoard}>
      <Grid
        data={data}
        itemRenderer={ItemRenderer}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
}

function ItemRenderer(props) {
  console.log(props);
  return <div>renderer</div>;
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
