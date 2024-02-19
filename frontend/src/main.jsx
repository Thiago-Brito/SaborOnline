import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "styled-components";

import Global from "./styles/global";

import theme from "./styles/theme";

import { Routes } from "./Routes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global />
      
        <Routes />
      
    </ThemeProvider>
  </React.StrictMode>
);