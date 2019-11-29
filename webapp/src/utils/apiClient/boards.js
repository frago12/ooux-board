// @flow
import request from "utils/request";
import { withErrorHandling } from "utils/decorators";

import type { BoardData } from "components/OOUXBoard/types";

export const createBoard = (title: string) =>
  withErrorHandling(() =>
    request("/api/boards/", {
      method: "post",
      body: { title },
    }),
  );

export const updateBoard = (id: string, title: string, data?: BoardData) =>
  withErrorHandling(() =>
    request(`/api/boards/${id}`, {
      method: "put",
      body: { title, data },
    }),
  );

export const deleteeBoard = () => (id: string) => {};
