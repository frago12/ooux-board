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
      case "editSystemObject":
        const so = draft.data.find(obj => obj.id === action.payload.id);
        if (!so) throw new Error("Invalid object");
        so.name = action.payload.name;
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
      case "removeSystemObject":
        columnIndex = draft.data.findIndex(c => c.id === action.payload.id);
        draft.data.splice(columnIndex, 1);
        break;
      case "removeItem":
        const { itemId } = action.payload;
        group = action.payload.group;
        columnIndex = state.data.findIndex(c => c.id === columnId);
        elementIndex = draft.data[columnIndex][group].findIndex(
          e => e.id === itemId,
        );
        draft.data[columnIndex][group].splice(elementIndex, 1);
        break;
      case "reorderColumns":
        const { sourceIndex, destinationIndex } = action.payload;
        const [extractedColumn] = draft.data.splice(sourceIndex, 1);
        draft.data.splice(destinationIndex, 0, extractedColumn);
        break;
      case "reorderItems":
        const {
          sourceColumnId,
          sourceItemIndex,
          destinationColumnId,
          destinationItemIndex,
        } = action.payload;
        group = action.payload.group;

        // Extract item
        const sourceColumnIndex = state.data.findIndex(
          c => c.id === sourceColumnId,
        );
        const [extractedItem] = draft.data[sourceColumnIndex][group].splice(
          sourceItemIndex,
          1,
        );

        // Insert item
        const destinationColumnIndex = state.data.findIndex(
          c => c.id === destinationColumnId,
        );
        draft.data[destinationColumnIndex][group].splice(
          destinationItemIndex,
          0,
          extractedItem,
        );
        break;
      default:
        throw new Error("Invalid board action");
    }
  });
}
