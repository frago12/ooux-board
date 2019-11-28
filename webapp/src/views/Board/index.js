// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import Form from "./BoardForm";
import OOUXBoard from "../../components/OOUXBoard";
import { updateBoard } from "utils/apiClient/boards";

type Props = {|
  boardId?: string,
|};

const initialData = [
  {
    id: "1",
    name: "chef",
    elements: [],
    ctas: [],
  },
];

function Board({ boardId = null }: Props) {
  const { data: board } = useSWR(
    boardId !== null ? `/api/boards/${boardId}` : null,
    {
      suspense: true,
    },
  );

  const onChange = React.useCallback(
    boardData => {
      // TODO: do not call `updateBoard` the very first time
      updateBoard(board.data.id, board.data.title, boardData);
    },
    [board.data.id, board.data.title],
  );

  return (
    <div css={cssBoard}>
      {board ? (
        <>
          <Form boardId={boardId} boardName={board.data.title} />
          <OOUXBoard initialData={initialData} onChange={onChange} />
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
