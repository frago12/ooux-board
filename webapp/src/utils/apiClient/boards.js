// @flow
import request from "utils/request";
import { withErrorHandling } from "utils/decorators";

export const getBoards = () => withErrorHandling(() => request("/api/boards/"));

export const createBoards = title =>
  withErrorHandling(() =>
    request("/api/boards/", {
      method: "post",
      body: { title },
    }),
  );
