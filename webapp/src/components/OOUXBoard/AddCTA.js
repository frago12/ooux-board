// @flow
import React from "react";

import styled from "@emotion/styled";
import uuidv1 from "uuid/v1";
import { css } from "@emotion/core";

import AutogrowInput from "./AutogrowInput";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";
import { useOOUX } from "./OOUXContext";

type Props = {|
  to: string,
|};

const CTA_COLOR = getColor("cta");

function AddCTA({ to }: Props) {
  const [isCreating, setIsCreating] = React.useState(false);

  const { dispatch } = useOOUX();

  const addNewElement = type => {
    setIsCreating(true);
  };

  const submit = value => {
    dispatch({
      type: "addCTA",
      payload: {
        columnId: to,
        item: { id: uuidv1(), name: value, type: "cta" },
      },
    });
    cancel();
  };

  const cancel = () => {
    setIsCreating(false);
  };

  return (
    <>
      {isCreating ? (
        <ElementContainer background={CTA_COLOR}>
          <AutogrowInput onCancel={cancel} onSubmit={submit} />
        </ElementContainer>
      ) : (
        <div css={cssButtonsContainer}>
          <Button background={CTA_COLOR} onClick={addNewElement}>
            +
          </Button>
        </div>
      )}
    </>
  );
}

export default AddCTA;

const cssButtonsContainer = css`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background: ${props => props.background};
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight bold;
  height: 25px;
  opacity: 0.5;
  width: 25px;

  :hover, :focus {
    opacity: 1;
  }
`;
