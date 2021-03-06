// @flow
import { ToastsStore } from "react-toasts";

import request from "utils/request";
import { API_URL } from "utils/constants";
import { withErrorHandling } from "utils/decorators";

export const login = (email: string, password: string) =>
  withErrorHandling(
    () =>
      request(`${API_URL}/api/users/login/`, {
        method: "post",
        body: { email, password },
      }),
    error => {
      if (error.status === 400) {
        ToastsStore.error("Invalid credentials");
      }
      return { error };
    },
  );

export const register = (email: string, password: string, password2: string) =>
  withErrorHandling(
    () =>
      request(`${API_URL}/api/users/register/`, {
        method: "post",
        body: { email, password, password2 },
      }),
    error => {
      if (error.status === 400) {
        ToastsStore.error("Make sure data is correct");
      } else if (error.status === 409) {
        ToastsStore.error("Email was already taken");
      }
      return { error };
    },
  );

export const logout = () =>
  withErrorHandling(() => request(`${API_URL}/api/users/logout/`));

export const me = () =>
  withErrorHandling(() => request(`${API_URL}/api/users/me/`));
