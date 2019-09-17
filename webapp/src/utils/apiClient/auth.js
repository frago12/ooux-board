// @flow
import { ToastsStore } from "react-toasts";

import request from "utils/request";
import { withErrorHandling } from "utils/decorators";

export const login = (email, password) =>
  withErrorHandling(
    () =>
      request("/api/users/login/", {
        method: "post",
        body: { email, password },
      }),
    error => {
      if (error.status === 400) {
        ToastsStore.error("Invalid credentials");
        return error;
      }
    },
  );

export const register = (email, password, password2) =>
  withErrorHandling(
    () =>
      request("/api/users/register/", {
        method: "post",
        body: { email, username: email, password, password2 },
      }),
    error => {
      if (error.status === 400) {
        ToastsStore.error("Make sure data is correct");
        return error;
      }
    },
  );

export const me = () => withErrorHandling(() => request("/api/users/me/"));
