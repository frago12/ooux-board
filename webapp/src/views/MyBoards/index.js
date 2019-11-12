// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import NewBoard from "./NewBoard";
import BoardItem from "./BoardItem";
import { getBoards } from "utils/apiClient/boards";

function MyBoards() {
  const { data: boards } = useSWR("getBoards", getBoards);

  return (
    <>
      {!boards ? (
        <div>Loading...</div>
      ) : (
        <div css={cssMyBoard}>
          <NewBoard />
          {boards.data.map(({ id, title }) => (
            <BoardItem {...{ id, title }} />
          ))}
        </div>
      )}
    </>
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
