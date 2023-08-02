import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await sdk.check("admin");
          dispatch({
            type: "LOGIN",
            payload: {
              user: response.user,
              token: token,
              role: response.role,
            },
          });
        } catch (error) {
          tokenExpireError(dispatch, error.message);
        }
      }
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
