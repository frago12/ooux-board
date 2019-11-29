// @flow
import React from "react";

import useSWR from "swr";
import { css } from "@emotion/core";

import Form from "../../components/BoardForm";
import OOUXBoard from "../../components/OOUXBoard";
import { updateBoard } from "utils/apiClient/boards";

type Props = {|
  boardId: string,
|};

function Board({ boardId }: Props) {
  const { data: board } = useSWR(`/api/boards/${boardId}`, {
    suspense: true,
  });

  const onChange = React.useCallback(
    boardData => {
      // TODO: do not call `updateBoard` the very first time
      updateBoard(board.data.id, board.data.title, boardData);
    },
    [board.data.id, board.data.title],
  );

  return (
    <div css={cssBoard}>
      <Form boardId={boardId} boardName={board.data.title} />
      <OOUXBoard initialData={[]} onChange={onChange} />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
