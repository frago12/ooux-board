// @flow
import React from "react";

import { css } from "@emotion/core";

import OOUXBoard from "views/Board/OOUXBoard";
import { textColors } from "styles/variables";

type Props = {|
  boardId?: string,
|};

function Board({ boardId }: Props) {
  const [loading, setLoading] = React.useState(true);
  const inputRef = React.createRef();

  React.useEffect(() => {
    inputRef.current.focus();

    if (!boardId) setLoading(false);
    else {
      // TODO call api to retrieve board data
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (!inputRef.current.value) return;
  };

  return (
    <div css={cssBoard}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          css={cssInput}
          placeholder="Type a name for the board"
          ref={inputRef}
        />
      </form>
      <OOUXBoard
        initialData={[]}
        onAddElement={() => {}}
        onRemoveElement={() => {}}
        onEditElement={() => {}}
        onReorderElements={() => {}}
      />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;

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
