// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import Form from "./BoardForm";
import OOUXBoard from "./OOUXBoard";

type Props = {|
  boardId?: string,
  isNew?: Boolean,
|};

function Board({ boardId, isNew = false }: Props) {
  const { data: board } = useSWR(boardId ? `/api/boards/${boardId}` : null, {
    suspense: true,
  });

  return (
    <div css={cssBoard}>
      <Form title={board.data.title} isNew={isNew} />
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
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
