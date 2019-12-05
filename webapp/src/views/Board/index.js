// @flow
import React from "react";

import useSWR, { trigger } from "swr";
import { css } from "@emotion/core";
import { navigate } from "@reach/router";
import { MdDelete } from "react-icons/md";

import BoardForm from "components/BoardForm";
import OOUXBoard from "components/OOUXBoard";
import { Icon } from "styles/components";
import { API_URL } from "utils/constants";
import {
  updateBoard as _updateBoard,
  deleteBoard as _deleteBoard,
} from "utils/apiClient/boards";

import type { BoardData } from "components/OOUXBoard/types";

type Props = {|
  boardId: string,
|};

type DataToUpdate = {|
  title?: string,
  data?: BoardData,
|};

function Board({ boardId }: Props) {
  const { data: board } = useSWR(`${API_URL}/api/boards/${boardId}`);

  const onChangeBoardData = (data: BoardData) => {
    updateBoard({ data });
  };

  const onChangeBoardTitle = (title: string) => {
    updateBoard({ title });
  };

  const updateBoard = React.useCallback(
    ({ title, data }: DataToUpdate) => {
      _updateBoard(
        boardId,
        // $FlowFixMe
        title || board.data.title,
        data || board.data.data,
      ).then(() => {
        trigger(`${API_URL}/api/boards/${boardId}`);
      });
    },
    [board.data.data, boardId, board.data.title],
  );

  const deleteBoard = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this board?",
    );
    if (!confirmed) return;
    _deleteBoard(boardId).then(() => {
      navigate("/");
    });
  };

  return (
    <div css={cssBoard}>
      <div css={cssToolbar}>
        <BoardForm
          defaultValue={board.data.title}
          onSubmit={onChangeBoardTitle}
        />
        <Icon onClick={deleteBoard}>
          <MdDelete />
        </Icon>
      </div>
      <OOUXBoard initialData={board.data.data} onChange={onChangeBoardData} />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;

const cssToolbar = css`
  display: flex;
  margin-bottom: 40px;
  > form {
    flex-grow: 1;
  }
`;
