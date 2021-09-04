import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ConnectButton from "./classes/connectButton";
import { StoreProvider } from "./classes/store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ConnectButton />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);