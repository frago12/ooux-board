// @flow
import React from "react";

import { textColors } from "styles/variables";

type Props = {|
  boardId?: string,
  title?: string,
  onUpdate?: (title: string) => void,
  onCreate?: (title: string) => void,
|};

function BoardForm({ boardId = null, title, onCreate, onUpdate }: Props) {
  const inputRef: { current: any } = React.createRef();

  React.useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    submit();
  };

  const submit = () => {
    const newTitle = inputRef.current.value;
    if (!newTitle || newTitle === title) return;
    // $FlowFixMe
    boardId === null ? onCreate(newTitle) : onUpdate(newTitle);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        css={cssInput}
        placeholder="Type a name for the board"
        ref={inputRef}
        defaultValue={title}
        onBlur={submit}
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
