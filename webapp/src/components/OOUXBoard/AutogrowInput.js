// @flow
import React from "react";

import TextareaAutosize from "react-autosize-textarea";

type Props = {|
  defaultValue?: string,
  placeholder?: string,
  onCancel: () => void,
  onSubmit: (value: string) => void,
  styles?: { [any]: any },
|};

function AutogrowInput({
  styles,
  onSubmit,
  onCancel,
  defaultValue,
  placeholder = "Entrer title",
}: Props) {
  const inputRef: { current: any } = React.useMemo(() => React.createRef(), []);

  React.useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, [inputRef]);

  const onClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  const onKeyPress = e => {
    const value = inputRef.current.value;
    if (e.key === "Enter" && value) {
      submit(value);
      e.preventDefault();
    } else if (e.key === "Enter" && !value) {
      e.preventDefault();
    }
  };

  const onKeyUp = e => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  const onBlur = () => {
    const name = inputRef.current.value;
    if (!name) onCancel();
    else {
      submit(name);
    }
  };

  const submit = name => {
    onSubmit(name);
    inputRef.current.value = "";
  };

  return (
    <TextareaAutosize
      css={[cssInput, styles]}
      placeholder={placeholder}
      ref={inputRef}
      onClick={onClick}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      defaultValue={defaultValue}
    />
  );
}

export default AutogrowInput;

const cssInput = {
  border: "none",
  color: "#333",
  fontSize: 11,
  textAlign: "center",
  resize: "none",
  outline: "none",
};
