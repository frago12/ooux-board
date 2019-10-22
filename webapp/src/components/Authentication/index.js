// @flow
import React from "react";

import { css } from "@emotion/core";

import Login from "./Login";
import Signup from "./Signup";

function Authentication() {
  return (
    <>
      <div css={cssAuthentication}>
        <Login />
        <Signup />
      </div>
    </>
  );
}

export default Authentication;

const cssAuthentication = css`
  display: flex;
  max-width: 950px;
  margin: 0 auto;
  min-height: 100vh;

  > * {
    flex: 1;
    padding: 40px;
  }
`;
