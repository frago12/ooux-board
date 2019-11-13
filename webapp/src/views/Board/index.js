// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import Form from "./BoardForm";
import OOUXBoard from "./OOUXBoard";
import { getBoard } from "utils/apiClient/boards";

type Props = {|
  boardId?: string,
|};

function Board({ boardId }: Props) {
  const { data: board } = useSWR("getBoard", boardId ? getBoard : null);

  return (
    <>
      {boardId && !board ? (
        <div>Loading...</div>
      ) : (
        <div css={cssBoard}>
          <Form title={board && board.data.title} isNew={!boardId} />
          {boardId && (
            <OOUXBoard
              initialData={[]}
              onAddElement={() => {}}
              onRemoveElement={() => {}}
              onEditElement={() => {}}
              onReorderElements={() => {}}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
