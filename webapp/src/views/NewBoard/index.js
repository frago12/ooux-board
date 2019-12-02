// @flow
import React from "react";

import { css } from "@emotion/core";
import { createBoard as _createBoard } from "utils/apiClient/boards";
import { navigate } from "@reach/router";

import BoardForm from "components/BoardForm";

function NewBoard() {
  const createBoard = async name => {
    const { data } = await _createBoard(name);
    navigate(`/b/${data.id}`, { replace: true });
  };

  return (
    <div css={cssBoard}>
      <BoardForm onSubmit={createBoard} />
    </div>
  );
}

export default NewBoard;

const cssBoard = css`
  padding: 20px;
`;
