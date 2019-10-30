// @flow
import React from "react";

import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Link, Location } from "@reach/router";

import { H1 } from "styles/components";

type Props = {|
  user: { email: string } | null,
  logout: () => Promise<void>,
|};

function Navbar({ user, logout }: Props) {
  return (
    <Location>
      {({ location }) => (
        <Header inBoard={location.pathname.match("/b/")}>
          <Link css={{ textDecoration: "none" }} to="/">
            <H1>OOUX</H1>
          </Link>
          {user && (
            <div>
              <span>Welcome, {user.email}</span>
              <button type="button" css={cssLogout} onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </Header>
      )}
    </Location>
  );
}

export default Navbar;

const Header = styled.header(({ inBoard }) => ({
  alignItems: "center",
  background: inBoard ? "#efefef" : "transparent",
  display: "flex",
  fontSize: "14px",
  justifyContent: "space-between",
  marginBottom: inBoard ? 0 : "20px",
  padding: "20px 40px",
  transition: "background 0.2s",
}));

const cssLogout = css`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  padding: 0;
`;
