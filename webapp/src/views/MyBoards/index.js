// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import NewBoard from "./NewBoard";
import BoardItem from "./BoardItem";
import { API_URL } from "utils/constants";

function MyBoards() {
  const { data: boards } = useSWR(`${API_URL}/api/boards`);

  return (
    <div css={cssMyBoard}>
      <NewBoard />
      {boards.data.map(({ id, title }) => (
        <BoardItem key={id} {...{ id, title }} />
      ))}
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
