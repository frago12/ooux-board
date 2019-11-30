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
    let group: "ctas" | "elements" | "" = "";

    const { columnId } = action.payload;

    switch (action.type) {
      case "addSystemObject":
        const { id, name } = action.payload;
        draft.data.push({
          id,
          name: name,
          elements: [],
          ctas: [],
        });
        break;
      case "addCTA":
        columnIndex = state.data.findIndex(c => c.id === columnId);
        draft.data[columnIndex].ctas.unshift({ ...action.payload.item });
        break;
      case "addElement":
        columnIndex = state.data.findIndex(c => c.id === columnId);
        draft.data[columnIndex].elements.push({ ...action.payload.item });
        break;
      case "editItem":
        const { item } = action.payload;
        group = action.payload.group;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        elementIndex = draft.data[columnIndex][group].findIndex(
          e => e.id === item.id,
        );
        draft.data[columnIndex][group][elementIndex] = item;
        break;
      case "removeItem":
        const { itemId } = action.payload;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        elementIndex = draft.data[columnIndex][group].findIndex(
          e => e.id === itemId,
        );
        draft.data[columnIndex][group].splice(elementIndex, 1);
        break;
      case "reorderItems":
        const { startIndex: startCta, endIndex: endCta } = action.payload;
        group = action.payload.group;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        const [removedCta] = draft.data[columnIndex][group].splice(startCta, 1);
        draft.data[columnIndex][group].splice(endCta, 0, removedCta);
        break;
      default:
        throw new Error("Invalid board action");
    }
  });
}
