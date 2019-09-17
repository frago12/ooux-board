// @flow
import * as React from "react";

import { navigate } from "@reach/router";

import * as AuthApi from "utils/apiClient/auth";

type User = {| email: string |};

type State = {|
  user: User,
  loading: Boolean,
|};

type Action = {|
  type: string,
  payload: {
    email: string,
  },
|};

type Props = {|
  children: React.Node,
|};

type Context = {|
  data: State,
  login: (email: string, password: string) => void,
  logout: () => void,
  register: (email: string, password: string, repeat: string) => void,
|};

const AuthContex = React.createContext<Context | void>();

const initialState: State = {
  user: null,
  loading: true,
};

function reducer(state, action) {
  let email = null;

  switch (action.type) {
    case "setUserInfo":
      email = action.payload.email;
      return { ...state, user: { email }, loading: false };
    case "isLoading":
      return { ...state, loading: true };
    default:
      throw new Error("Invalid Auth action");
  }
}

export function AuthProvider(props: Props) {
  const [data, dispatch] = React.useReducer<State, Action>(
    reducer,
    initialState,
  );

  React.useEffect(() => {
    me();
  }, []);

  const me = async () => {
    const { data } = await AuthApi.me();
    if (!data) return;
    dispatch({ type: "setUserInfo", payload: { email: data.email } });
  };

  const login = async (email, password) => {
    const { error: loginError } = await AuthApi.login(email, password);
    if (loginError) return;

    const { data } = await AuthApi.me();
    if (!data) return;

    dispatch({ type: "setUserInfo", payload: { email: data.email } });
    navigate("/");
  };

  const register = async (email, password, password2) => {
    const { error: loginError } = await AuthApi.register(
      email,
      password,
      password2,
    );
    if (loginError) return;

    const { data } = await AuthApi.me();
    if (!data) return;

    dispatch({ type: "setUserInfo", payload: { email: data.email } });
    navigate("/");
  };

  const logout = () => {};

  return (
    <AuthContex.Provider value={{ data, login, logout, register }} {...props} />
  );
}

export function useAuth() {
  const context = React.useContext(AuthContex);
  if (context === undefined) {
    throw new Error();
  }

  return context;
}
