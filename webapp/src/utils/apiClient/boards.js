// @flow
import request from "utils/request";
import { withErrorHandling } from "utils/decorators";

export const getBoards = () => withErrorHandling(() => request("/api/boards/"));

export const createBoard = title =>
  withErrorHandling(() =>
    request("/api/boards/", {
      method: "post",
      body: { title },
    }),
  );

export const getBoard = id => () =>
  withErrorHandling(() => request(`/api/boards/${id}`));

export const updateBoard = () => (id, title, data) => {};

export const deleteeBoard = () => id => {};
