// @flow
import React from "react";

import { SWRConfig } from "swr";
import { css } from "@emotion/core";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Navbar from "components/Navbar";
import request from "utils/request";
import { withErrorHandling } from "utils/decorators";
import { useAuth } from "context/AuthContext";

function App() {
  const {
    data: { user, loading, showErrorPage },
    logout,
  } = useAuth();

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => withErrorHandling(() => request(...args)),
        revalidateOnFocus: false,
        suspense: true,
      }}
    >
      <Navbar user={user} logout={logout} />
      <div css={cssMainContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : showErrorPage ? (
          <div>Whoops! somehitng went wrong</div>
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
    </SWRConfig>
  );
}

export default App;

const cssMainContainer = css`
  padding: 0 40px;
`;
