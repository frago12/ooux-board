// @flow
import React from "react";

import { css } from "@emotion/core";

import Login from "./Login";
import Signup from "./Signup";
import { H1 } from "styles/components";

function Authentication() {
  return (
    <>
      <header css={cssHeader}>
        <H1>OOUX</H1>
      </header>
      <div css={cssAuthentication}>
        <Login />
        <Signup />
      </div>
    </>
  );
}

export default Authentication;

const cssHeader = css`
  padding: 40px;
  margin-bottom: 20px;
`;

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
