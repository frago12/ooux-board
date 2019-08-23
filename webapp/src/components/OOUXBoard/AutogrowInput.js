// @flow
import React from "react";

import TextareaAutosize from "react-autosize-textarea";
import { css } from "@emotion/core";

type Props = {|
  defaultValue?: string,
  onCancel: () => void,
  onSubmit: (value: string) => void,
|};

function AutogrowInput({ onSubmit, onCancel, defaultValue }: Props) {
  const inputRef: { current: any } = React.createRef();

  React.useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
  }, [inputRef]);

  const onKeyPress = e => {
    const value = inputRef.current.value;
    if (e.key === "Enter" && value) {
      onSubmit(value);
    } else if (e.key === "Enter" && !value) {
      e.preventDefault();
    }
  };

  const onBlur = () => {
    const name = inputRef.current.value;
    if (!name) onCancel();
    else {
      onSubmit(name);
    }
  };

  return (
    <TextareaAutosize
      css={cssInput}
      placeholder="Enter title"
      ref={inputRef}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    />
  );
}

export default AutogrowInput;

const cssInput = css`
  border: none;
  color: #333;
  font-size: 12px;
  text-align: center;
  resize: none;
`;
