import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/app";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer pauseOnFocusLoss={false} />
    <App />
  </Provider>,
  document.getElementById("root")
);
