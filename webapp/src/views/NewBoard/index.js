// @flow
import React from "react";

import { css } from "@emotion/core";
import { createBoard } from "utils/apiClient/boards";
import { navigate } from "@reach/router";

import BoardForm from "components/BoardForm";

function NewBoard() {
  const onCreate = async name => {
    const { data } = await createBoard(name);
    navigate(`/b/${data.id}`);
  };

  return (
    <div css={cssBoard}>
      <BoardForm onCreate={onCreate} />
    </div>
  );
}

export default NewBoard;

const cssBoard = css`
  padding: 20px;
`;
