// @flow
import React from "react";

import { Router } from "@reach/router";

import MyBoards from "views/MyBoards";

function AuthenticatedApp() {
  return (
    <Router>
      <MyBoards path="/" />
    </Router>
  );
}

export default AuthenticatedApp;
