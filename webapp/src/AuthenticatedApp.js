// @flow
import React from "react";

import { Router } from "@reach/router";

function AuthenticatedApp() {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
}

export default AuthenticatedApp;

function Home() {
  return <div>Home</div>;
}
