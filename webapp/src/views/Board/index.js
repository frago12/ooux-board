// @flow
import React from "react";

import produce from "immer";
import { css } from "@emotion/core";

import OOUXBoard from "components/OOUXBoard";

const initialState = {
  isLoading: false,
  data: [
    {
      id: "c1",
      systemObject: "OOUX Board",
      elements: [{ id: "1", type: "object", name: "Lists" }],
      ctas: [{ id: "1", type: "cta", name: "Add list" }],
    },
    {
      id: "c2",
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
      id: "c3",
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
    let columnIndex = -1;

    switch (action.type) {
      case "addElement":
        columnIndex = state.data.findIndex(
          c => c.id === action.payload.columnId,
        );
        draft.data[columnIndex].elements.push({ ...action.payload.item });
        break;
      case "removeElement":
        columnIndex = state.data.findIndex(
          c => c.id === action.payload.columnId,
        );
        const elementIndex = draft.data[columnIndex].elements.findIndex(
          e => e.id === action.payload.itemId,
        );
        draft.data[columnIndex].elements.splice(elementIndex, 1);
        break;
      case "reorderElements":
        const { columnId, startIndex, endIndex } = action.payload;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        const result = draft.data[columnIndex].elements;
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
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
        columnId: to,
        item: { id: new Date().getTime().toString(), ...newItem },
      },
    });
  };

  const onRemoveElement = (from, id) => {
    dispatch({
      type: "removeElement",
      payload: { columnId: from, itemId: id },
    });
  };

  const onEditElement = () => {};

  const onReorderElements = (columnId, startIndex, endIndex) => {
    dispatch({
      type: "reorderElements",
      payload: { columnId, startIndex, endIndex },
    });
  };

  return (
    <div css={cssBoard}>
      <OOUXBoard
        data={state.data}
        {...{ onAddElement, onRemoveElement, onEditElement, onReorderElements }}
      />
    </div>
  );
}

export default Board;

const cssBoard = css`
  padding: 20px;
`;
