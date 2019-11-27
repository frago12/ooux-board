// @flow
import React, { Suspense } from "react";

import { Router } from "@reach/router";

import MyBoards from "views/MyBoards";
import Board from "views/Board";

function AuthenticatedApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <MyBoards path="/" />
        <Board path="/b/new" isNew={true} />
        <Board path="/b/:boardId" />
      </Router>
    </Suspense>
  );
}

export default AuthenticatedApp;
