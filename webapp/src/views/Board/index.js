// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import Form from "./BoardForm";
import OOUXBoard from "../../components/OOUXBoard";

type Props = {|
  boardId?: string,
|};

function Board({ boardId = null }: Props) {
  const { data: board } = useSWR(
    boardId !== null ? `/api/boards/${boardId}` : null,
    {
      suspense: true,
    },
  );

  return (
    <div css={cssBoard}>
      {board ? (
        <>
          <Form boardId={boardId} boardName={board.data.title} />
          <OOUXBoard
            initialData={[]}
            onAddElement={() => {}}
            onRemoveElement={() => {}}
            onEditElement={() => {}}
            onReorderElements={() => {}}
          />
        </>
      ) : (
        <Form />
      )}
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
