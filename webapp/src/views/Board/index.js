// @flow
import React from "react";

import produce from "immer";
import { css } from "@emotion/core";

import OOUXBoard from "components/OOUXBoard";

const initialState = {
  isLoading: false,
  data: [
    {
      id: "1",
      systemObject: "OOUX Board",
      elements: [{ id: "1", type: "object", name: "Lists" }],
      ctas: [{ id: "1", type: "cta", name: "Add list" }],
    },
    {
      id: "2",
      systemObject: "List",
      elements: [
        { id: "1", type: "coredata", name: "Name" },
        { id: "2", type: "object", name: "Elements" },
        { id: "3", type: "object", name: "CTAs" },
      ],
      ctas: [
        { id: "1", type: "cta", name: "Add element" },
        { id: "2", type: "cta", name: "Add cta" },
        { id: "3", type: "cta", name: "Remove" },
      ],
    },
    {
      id: "3",
      systemObject: "Element / CTA",
      elements: [
        { id: "1", type: "coredata", name: "Name" },
        { id: "2", type: "coredata", name: "Type" },
      ],
      ctas: [
        { id: "1", type: "cta", name: "Remove" },
        { id: "2", type: "cta", name: "Edit name" },
      ],
    },
  ],
};

function reducer(state, action) {
  return produce(state, draft => {
    let listIndex = -1;

    switch (action.type) {
      case "addElement":
        listIndex = state.data.findIndex(l => l.id === action.payload.listId);
        draft.data[listIndex].elements.push({ ...action.payload.item });
        break;
      case "removeElement":
        listIndex = state.data.findIndex(l => l.id === action.payload.listId);
        const elementIndex = draft.data[listIndex].elements.findIndex(
          e => e.id === action.payload.itemId,
        );
        draft.data[listIndex].elements.splice(elementIndex, 1);
        break;
      default:
        throw new Error("Invalid board action");
    }
  });
}

function Board() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onAddElement = (to, newItem) => {
    dispatch({
      type: "addElement",
      payload: {
        listId: to,
        item: { id: new Date().getTime().toString(), ...newItem },
      },
    });
  };

  const onRemoveElement = (from, id) => {
    dispatch({ type: "removeElement", payload: { listId: from, itemId: id } });
  };

  const onEditElement = () => {};

  return (
    <div css={cssBoard}>
      <OOUXBoard
        data={state.data}
        {...{ onAddElement, onRemoveElement, onEditElement }}
      />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
