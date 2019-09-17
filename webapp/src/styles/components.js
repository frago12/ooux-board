// @flow
import styled from "@emotion/styled";

import { colors, textColors } from "styles/variables";

export const H1 = styled.h1`
  color: ${colors.primary};
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const H2 = styled.h2`
  color: ${textColors.gray};
  font-size: 20px;
  margin-bottom: 40px;
`;

export const ControlGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
  width: 350px;
`;

export const ErrorLabel = styled.div`
  color: red;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  padding-left: 20px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  background: #fff;
  border: none;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
  outline: none;
  padding: 0 20px;
  width: 100%;
`;

export const GridInput = styled(Input)`
  background: #fff;
  height: 30px;
`;

export const PrimaryButton = styled.button`
  background: ${colors.primary};
  border-radius: 20px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  padding: 0 30px;
  text-transform: capitalize;
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: ${colors.secondary};
`;
