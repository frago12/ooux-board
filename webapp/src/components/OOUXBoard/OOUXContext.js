// @flow
import * as React from "react";

import produce from "immer";

import type { BoardData } from "./types";

type Props = {|
  children: React.Node,
  initialData: BoardData,
|};

type State = {|
  data: BoardData,
|};

type Action = {|
  type: string,
  payload: {
    [any]: any,
  },
|};

type Context = {|
  state: State,
  dispatch: (action: Action) => void,
|};

const OOUXContext = React.createContext<Context | void>();

const initialState = {
  data: [],
};

export function OOUXProvider({ children, initialData }: Props) {
  const [state, dispatch] = React.useReducer<State, Action, State>(
    reducer,
    initialState,
    () => ({ data: initialData }),
  );
  return (
    <OOUXContext.Provider value={{ state, dispatch }} children={children} />
  );
}

export function useOOUX() {
  const context = React.useContext(OOUXContext);
  if (context === undefined) {
    throw new Error();
  }

  return context;
}

function reducer(state, action) {
  return produce(state, draft => {
    let columnIndex = -1;
    let elementIndex = -1;

    const { columnId } = action.payload;

    switch (action.type) {
      case "addMainObject":
        const { id, name } = action.payload;
        draft.data.push({
          id,
          name: name,
          elements: [],
          ctas: [],
        });
        break;
      case "addElement":
        columnIndex = state.data.findIndex(c => c.id === columnId);
        draft.data[columnIndex].elements.push({ ...action.payload.item });
        break;
      case "editElement":
        const { item } = action.payload;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        elementIndex = draft.data[columnIndex].elements.findIndex(
          e => e.id === item.id,
        );
        draft.data[columnIndex].elements[elementIndex] = item;
        break;
      case "removeElement":
        const { itemId } = action.payload;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        elementIndex = draft.data[columnIndex].elements.findIndex(
          e => e.id === itemId,
        );
        draft.data[columnIndex].elements.splice(elementIndex, 1);
        break;
      case "reorderElements":
        const { startIndex, endIndex } = action.payload;
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
