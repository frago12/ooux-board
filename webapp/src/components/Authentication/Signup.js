// @flow
import React from "react";

import { Formik } from "formik";
import { css } from "@emotion/core";
import { ToastsStore } from "react-toasts";
import * as Yup from "yup";

import { useAuth } from "context/AuthContext";
import {
  Label,
  H2,
  Input,
  ControlGroup,
  PrimaryButton,
  ErrorLabel,
} from "styles/components";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(3)
    .required("Required"),
  password: Yup.string()
    .min(4, "Password should have at least 4 character")
    .required("Required"),
  repeat: Yup.string()
    .min(4, "Password should have at least 4 character")
    .required("Required"),
});

function Signup() {
  const { register } = useAuth();

  return (
    <div css={cssSingup}>
      <H2>Are you new?</H2>
      <Formik
        initialValues={{ email: "", password: "", repeat: "" }}
        validationSchema={SignupSchema}
        onSubmit={({ email, password, repeat }) => {
          if (password !== repeat) {
            ToastsStore.error("Passwords doesn't match");
            return;
          }
          register(email, password, repeat);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form css={cssForm} onSubmit={handleSubmit}>
            <ControlGroup>
              <Label htmlFor="emailSignup">Email</Label>
              <Input
                id="emailSignup"
                name="email"
                type="email"
                required
                minLength={3}
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <ErrorLabel>Add a valid email</ErrorLabel>
              ) : null}
            </ControlGroup>
            <ControlGroup>
              <Label htmlFor="passwordSignup">Password</Label>
              <Input
                id="passwordSignup"
                name="password"
                type="password"
                required
                minLength={4}
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password ? (
                <ErrorLabel>Add a valid password</ErrorLabel>
              ) : null}
            </ControlGroup>
            <ControlGroup>
              <Label htmlFor="repeat">Repeat Password</Label>
              <Input
                id="repeat"
                name="repeat"
                type="password"
                required
                minLength={4}
                value={values.repeat}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <ErrorLabel>Add a valid email</ErrorLabel>
              ) : null}
            </ControlGroup>
            <PrimaryButton type="submit">Sign up</PrimaryButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;

const cssSingup = css`
  text-align: center;
`;

const cssForm = css`
  display: inline-block;
`;
