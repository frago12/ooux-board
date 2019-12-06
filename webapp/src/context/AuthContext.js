// @flow
import * as React from "react";

import { navigate } from "@reach/router";

import * as AuthApi from "utils/apiClient/auth";
import { setDispatch } from "utils/request";

type User = {| email: string |};

type State = {|
  user: User | null,
  loading: boolean,
  showErrorPage: boolean,
|};

type Action = {|
  type: string,
  payload: { [any]: any },
|};

type Props = {|
  children: React.Node,
|};

type Context = {|
  data: State,
  login: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>,
  register: (email: string, password: string, repeat: string) => Promise<void>,
|};

const AuthContex = React.createContext<Context | void>();

const initialState: State = {
  user: null,
  loading: true,
  showErrorPage: false,
};

function reducer(state, action) {
  let email = null;

  switch (action.type) {
    case "setUserInfo":
      email = action.payload.email;
      return { ...state, user: { email }, loading: false };
    case "isLoading":
      return { ...state, loading: true, showErrorPage: false };
    case "logout":
      return { ...state, user: null, loading: false };
    case "showErrorPage":
      return { ...state, loading: false, showErrorPage: true };
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
    // $FlowFixMe
    setDispatch(dispatch);
    console.log("here");
    me();
  }, []);

  const me = async () => {
    console.log("me");
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
    const { error } = await AuthApi.register(email, password, password2);
    if (error) return;

    const { data } = await AuthApi.me();
    if (!data) return;

    dispatch({ type: "setUserInfo", payload: { email: data.email } });
    navigate("/");
  };

  const logout = async () => {
    await AuthApi.logout();
    // $FlowFixMe
    dispatch({ type: "logout" });
    navigate("/");
  };

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
