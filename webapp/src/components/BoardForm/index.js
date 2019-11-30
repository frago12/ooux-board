// @flow
import React from "react";

import { textColors } from "styles/variables";

type Props = {|
  defaultValue?: string,
  onSubmit: (title: string) => void,
|};

function BoardForm({ defaultValue, onSubmit }: Props) {
  const inputRef: { current: any } = React.createRef();

  React.useEffect(() => {
    inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async e => {
    e.preventDefault();
    submit();
  };

  const submit = () => {
    const title = inputRef.current.value;
    if (!title || title === defaultValue) return;
    onSubmit(title);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        css={cssInput}
        placeholder="Type a name for the board"
        ref={inputRef}
        defaultValue={defaultValue}
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
