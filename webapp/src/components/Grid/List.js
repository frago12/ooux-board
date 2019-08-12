// @flow
import React from "react";

import update from "immutability-helper";
import { css } from "@emotion/core";

import Item from "./Item";
import MainObject from "./MainObject";
import { ItemContainer } from "./styledComponents";
import { getColor } from "./utils";

type ItemType = {|
  id: number,
  name: string,
  type: ItemType,
|};

type Props = {|
  id: string,
  name: string,
  items: ItemType[],
  ctas: ItemType[],
  maxCtas: number,
|};

function List({ id, name, items: _items, ctas: _ctas, maxCtas }: Props) {
  const [items, setItems] = React.useState(_items);
  const [ctas, setCtas] = React.useState(_ctas);

  const moveItem = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = items[dragIndex];
      setItems(
        update(items, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        }),
      );
    },
    [items],
  );

  const moveCta = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ctas[dragIndex];
      setCtas(
        update(ctas, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        }),
      );
    },
    [ctas],
  );

  return (
    <div css={cssList}>
      {[...Array(maxCtas - ctas.length).keys()].map(i => (
        <ItemContainer key={i} background={getColor("empty")} />
      ))}
      {ctas.map((cta, index) => (
        <Item
          key={cta.id}
          index={index}
          name={cta.name}
          id={cta.id}
          type={cta.type}
          listId={`${id}ctas`}
          move={moveCta}
        />
      ))}
      <MainObject name={name} />
      {items.map((item, index) => (
        <Item
          key={item.id}
          index={index}
          name={item.name}
          id={item.id}
          type={item.type}
          listId={`${id}items`}
          move={moveItem}
        />
      ))}
    </div>
  );
}

export default List;

const cssList = css`
  > * {
    margin-bottom: 5px;
  }
`;
