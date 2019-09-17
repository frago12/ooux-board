// @flow
import React from "react";

import { Formik } from "formik";
import { css } from "@emotion/core";

import { useAuth } from "context/AuthContext";
import {
  Label,
  H2,
  Input,
  ControlGroup,
  SecondaryButton,
} from "styles/components";

function Login() {
  const { login } = useAuth();

  return (
    <div css={cssLogin}>
      <H2>Already have an account?</H2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email, password }) => {
          login(email, password);
        }}
        render={({ handleSubmit, handleChange, values }) => (
          <form css={cssForm} onSubmit={handleSubmit}>
            <ControlGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                value={values.email}
                onChange={handleChange}
              />
            </ControlGroup>
            <ControlGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={values.password}
                onChange={handleChange}
              />
            </ControlGroup>
            <SecondaryButton type="submit">log in</SecondaryButton>
          </form>
        )}
      />
    </div>
  );
}

export default Login;

const cssLogin = css`
  text-align: center;
`;

const cssForm = css`
  display: inline-block;
`;
