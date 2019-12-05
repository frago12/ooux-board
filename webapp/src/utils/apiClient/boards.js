// @flow
import request from "utils/request";
import { API_URL } from "utils/constants";
import { withErrorHandling } from "utils/decorators";

import type { BoardData } from "components/OOUXBoard/types";

export const createBoard = (title: string) =>
  withErrorHandling(() =>
    request(`${API_URL}/api/boards/`, {
      method: "post",
      body: { title },
    }),
  );

export const updateBoard = (id: string, title: string, data?: BoardData) =>
  withErrorHandling(() =>
    request(`${API_URL}/api/boards/${id}`, {
      method: "put",
      body: { title, data },
    }),
  );

export const deleteBoard = (id: string) =>
  withErrorHandling(() =>
    request(`${API_URL}/api/boards/${id}`, { method: "delete" }),
  );
