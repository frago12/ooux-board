// @flow
import React from "react";

import { css } from "@emotion/core";

import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Navbar from "components/Navbar";
import { useAuth } from "context/AuthContext";

function AppRouter() {
  const {
    data: { user, loading },
    logout,
  } = useAuth();

  return (
    <>
      <Navbar user = {user} logout={logout} />
      <div css={cssMainContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp />
        )}
      </div>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_RIGHT}
      />
    </>
  );
}

export default AppRouter;

const cssMainContainer = css`
  padding: 0 40px;
`;
