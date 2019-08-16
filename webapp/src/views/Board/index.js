// @flow
import React from "react";

import produce from "immer";
import { css } from "@emotion/core";

import Grid from "components/Grid";

const initialState = {
  isLoading: false,
  data: [
    {
      id: "123",
      objectName: "Chef",
      data: [
        { id: 1, type: "coredata", name: "Name" },
        { id: 2, type: "coredata", name: "Profile pic" },
        { id: 3, type: "object", name: "Recipes" },
        { id: 4, type: "metadata", name: "# of chef followers" },
        { id: 5, type: "cta", name: "Follow" },
        { id: 6, type: "cta", name: "Favorite" },
        { id: 7, type: "cta", name: "Create, Edit, Delete" },
      ],
    },
    {
      id: "456",
      objectName: "Recipe",
      data: [
        { id: 1, type: "coredata", name: "Title" },
        { id: 2, type: "coredata", name: "Images" },
        { id: 3, type: "metadata", name: "Level of dificulty" },
        { id: 4, type: "cta", name: "Favorite" },
        { id: 5, type: "cta", name: "Create, Edit, Delete" },
      ],
    },
  ],
};

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "add":
        const index = state.data.findIndex(l => l.id === action.payload.listId);
        draft.data[index].data.push({ ...action.payload.item });
        break;
      default:
        throw new Error("Invalid board action");
    }
  });
}

function Board() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const handleCreate = (to, newItem) => {
    dispatch({
      type: "add",
      payload: { listId: to, item: { id: new Date().getTime(), ...newItem } },
    });
  };

  return (
    <div css={cssBoard}>
      <Grid data={state.data} handleCreate={handleCreate} />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
