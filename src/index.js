import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App";
import { AuthState } from "./context/authContext/AuthState";
import { CampState } from "./context/campContext/CampState";
import { ReviewState } from "./context/reviewContext/ReviewState";

ReactDOM.render(
  <AuthState>
    <CampState>
      <ReviewState>
        <App />
      </ReviewState>
    </CampState>
  </AuthState>,
  document.getElementById("root")
);
