import styled from "@emotion/styled";

export const ItemContainer = styled.div`
  align-items: center;
  background ${props => (props.isDragging ? "transparent" : props.background)};
  box-sizing: border-box;
  color: ${props => (props.isDragging ? "transparent" : "#fff")};
  display: flex;
  font-size: 14px;
  height: 90px;
  justify-content: center;
  padding: 5px;
  width: 90px;
  border: ${props => (props.isDragging ? "1px dashed #bbb" : "none")};
`;
