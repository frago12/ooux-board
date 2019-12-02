import styled from "@emotion/styled";

import { ITEM_SIZE } from "./constants";

export const ElementContainer = styled.div`
  align-items: center;
  background ${props => props.background};
  border: ${props => (props.isDragging ? "1px dashed #666" : "none")};
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 11px;
  font-weight: bold;
  height: ${ITEM_SIZE}px;
  justify-content: center;
  padding: 5px;
  position: relative;
  text-align: center;
  width: ${ITEM_SIZE}px;
`;
