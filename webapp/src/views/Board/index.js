// @flow
import React from "react";

import useSWR, { trigger } from "swr";
import { css } from "@emotion/core";

import BoardForm from "components/BoardForm";
import OOUXBoard from "components/OOUXBoard";
import { updateBoard as _updateBoard } from "utils/apiClient/boards";

import type { BoardData } from "components/OOUXBoard/types";

type Props = {|
  boardId: string,
|};

type DataToUpdate = {|
  title?: string,
  data?: BoardData,
|};

function Board({ boardId }: Props) {
  const { data: board } = useSWR(`/api/boards/${boardId}`);

  const onChangeBoardData = (data: BoardData) => {
    updateBoard({ data });
  };

  const onChangeBoardTitle = (title: string) => {
    updateBoard({ title });
  };

  const updateBoard = React.useCallback(
    ({ title, data }: DataToUpdate) => {
      // TODO: do not call `updateBoard` the very first time
      _updateBoard(
        boardId,
        title || board.data.title,
        data || board.data.data,
      ).then(() => {
        trigger(`/api/boards/${boardId}`);
      });
    },
    [board.data.data, boardId, board.data.title],
  );

  return (
    <div css={cssBoard}>
      <BoardForm
        boardId={boardId}
        title={board.data.title}
        onUpdate={onChangeBoardTitle}
      />
      <OOUXBoard initialData={board.data.data} onChange={onChangeBoardData} />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
