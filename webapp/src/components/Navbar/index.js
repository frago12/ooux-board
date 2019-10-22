// @flow
import React from "react";

import { css } from "@emotion/core";

import { H1 } from "styles/components";

type Props = {|
  email: string,
  logout: () => void,
|};

function Navbar({ user, logout }: Props) {
  return (
    <header css={cssHeader}>
      <H1>OOUX</H1>
      {user && (
        <div>
          <span>Welcome, {user.email}</span>
          <button type="button" css={cssLogout} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;

const cssHeader = css`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 40px;
`;

const cssLogout = css`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  padding: 0;
`;
