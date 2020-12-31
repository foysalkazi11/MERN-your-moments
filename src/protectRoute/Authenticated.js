import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthState";

const Authenticated = (props) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      path={props.path}
      render={(data) =>
        isAuthenticated ? (
          <props.component {...data} />
        ) : (
          <Redirect to={{ pathname: "/signup", state: data.location }} />
        )
      }
    ></Route>
  );
};

export { Authenticated };
