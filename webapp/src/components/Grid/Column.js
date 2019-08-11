// @flow
import React from "react";

import update from "immutability-helper";
import { css } from "@emotion/core";

import Item from "./Item";
import MainObject from "./MainObject";

type Props = {|
  name: string,
  data: Array<{|
    name: string,
    type: ItemType,
    position: number,
  |}>,
|};

function Column({ name, data: _data }: Props) {
  const [data, setData] = React.useState(_data);

  const moveItem = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = data[dragIndex];
      setData(
        update(data, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        }),
      );
    },
    [data],
  );

  return (
    <div css={cssColumn}>
      <MainObject name={name} />
      {data.map((item, index) => (
        <Item
          key={item.position}
          index={index}
          name={item.name}
          position={item.position}
          type={item.type}
          move={moveItem}
        />
      ))}
    </div>
  );
}

export default Column;

const cssColumn = css`
  > * {
    margin-bottom: 5px;
  }
`;
