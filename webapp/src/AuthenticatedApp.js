// @flow
import React from "react";

import { Router } from "@reach/router";

import MyBoards from "views/MyBoards";
import Board from "views/Board";

function AuthenticatedApp() {
  return (
    <Router>
      <MyBoards path="/" />
      <Board path="/b/new" isNew={true} />
      <Board path="/b/:boardId" />
    </Router>
  );
}

export default AuthenticatedApp;
