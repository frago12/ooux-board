import styled from "@emotion/styled";

export const ElementContainer = styled.div`
  align-items: center;
  background ${props => (props.isDragging ? "transparent" : props.background)};
  border: ${props => (props.isDragging ? "1px dashed #bbb" : "none")};
  box-sizing: border-box;
  color: ${props => (props.isDragging ? "transparent" : "#fff")};
  display: flex;
  font-size: 11px;
  font-weight: bold;
  height: 90px;
  justify-content: center;
  padding: 5px;
  position: relative;
  text-align: center;
  width: 90px;
`;
