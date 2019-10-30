// @flow
import * as React from "react";

import produce from "immer";

const OOUXContext = React.createContext();

type Props = {|
  children: React.Node,
|};

const initialState = {
  data: [],
};

export function OOUXProvider(props: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <OOUXContext.Provider value={{ state, dispatch }} {...props} />;
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
          systemObject: name,
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

// const initialState = {
//   isLoading: false,
//   data: [
//     {
//       id: "c1",
//       systemObject: "OOUX Board",
//       elements: [{ id: "1", type: "object", name: "Lists" }],
//       ctas: [{ id: "1", type: "cta", name: "Add list" }],
//     },
//     {
//       id: "c2",
//       systemObject: "List",
//       elements: [
//         { id: "1", type: "coredata", name: "Name" },
//         { id: "2", type: "object", name: "Elements" },
//         { id: "3", type: "object", name: "CTAs" },
//       ],
//       ctas: [
//         { id: "1", type: "cta", name: "Add element" },
//         { id: "2", type: "cta", name: "Add cta" },
//         { id: "3", type: "cta", name: "Remove" },
//       ],
//     },
//     {
//       id: "c3",
//       systemObject: "Element / CTA",
//       elements: [
//         { id: "1", type: "coredata", name: "Name" },
//         { id: "2", type: "coredata", name: "Type" },
//       ],
//       ctas: [
//         { id: "1", type: "cta", name: "Remove" },
//         { id: "2", type: "cta", name: "Edit name" },
//       ],
//     },
//   ],
// };
