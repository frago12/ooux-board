// @flow
import React from "react";

import { navigate } from "@reach/router";

import { createBoard, updateBoard } from "utils/apiClient/boards";
import { textColors } from "styles/variables";

type Props = {|
  boardId?: string,
  boardName?: string,
|};

function BoardForm({ boardId = null, boardName }: Props) {
  const inputRef: { current: any } = React.createRef();

  React.useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const name = inputRef.current.value;
    if (!name) return;
    boardId === null ? onCreateBoard(name) : updateBoard(boardId, name);
  };

  const onCreateBoard = async boardName => {
    const { data } = await createBoard(boardName);
    navigate(`/b/${data.id}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        css={cssInput}
        placeholder="Type a name for the board"
        ref={inputRef}
        defaultValue={boardName}
      />
    </form>
  );
}

export default BoardForm;

const cssInput = {
  background: "transparent",
  border: "none",
  color: textColors.black,
  fontSize: 16,
  fontWeight: "bold",
  outline: "none",
  marginBottom: 40,
  width: "100%",
};