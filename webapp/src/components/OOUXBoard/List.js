// @flow
import React from "react";

import update from "immutability-helper";
import { css } from "@emotion/core";

import AddElement from "./AddElement";
import Element from "./Element";
import MainObject from "./SystemObject";
import { ElementContainer } from "./styledComponents";
import { getColor } from "./utils";

import type { ElementTypes } from "./Element";

type ElementProps = {|
  id: string,
  name: string,
  type: ElementTypes,
|};

type Props = {|
  id: string,
  name: string,
  elements: ElementProps[],
  ctas: ElementProps[],
  maxCtas: number,
|};

function List({ id, name, elements: _elements, ctas: _ctas, maxCtas }: Props) {
  const [elements, setElements] = React.useState(_elements);
  const [ctas, setCtas] = React.useState(_ctas);

  const moveItem = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = elements[dragIndex];
      setElements(
        update(elements, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        }),
      );
    },
    [elements],
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
        <ElementContainer key={i} background={getColor("empty")} />
      ))}
      {ctas.map((cta, index) => (
        <Element
          key={cta.id}
          index={index}
          name={cta.name}
          id={cta.id}
          type={cta.type}
          listId={id}
          move={moveCta}
        />
      ))}
      <MainObject name={name} />
      {elements.map((item, index) => (
        <Element
          key={item.id}
          index={index}
          name={item.name}
          id={item.id}
          type={item.type}
          listId={id}
          move={moveItem}
        />
      ))}
      <AddElement to={id} />
    </div>
  );
}

export default List;

const cssList = css`
  > * {
    margin-bottom: 5px;
  }
`;
