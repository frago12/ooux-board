// @flow
import request from "utils/request";
import { withErrorHandling } from "utils/decorators";

export const createBoard = title =>
  withErrorHandling(() =>
    request("/api/boards/", {
      method: "post",
      body: { title },
    }),
  );

export const updateBoard = () => (id, title, data) => {};

export const deleteeBoard = () => id => {};
