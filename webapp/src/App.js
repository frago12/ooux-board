// @flow
import React from "react";

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
      <Navbar user={user} logout={logout} />
      {loading ? (
        <div>Loading...</div>
      ) : user ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_RIGHT}
      />
    </>
  );
}

export default AppRouter;
