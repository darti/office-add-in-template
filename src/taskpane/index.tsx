/* global document, Office */
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { createRoot } from "react-dom/client";

import React from "react";

import "./taskpane.css";

let isOfficeInitialized = false;

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;

  const container = document.getElementById("container");
  const root = createRoot(container);

  root.render(
    <FluentProvider theme={webLightTheme}>
      <App isOfficeInitialized={isOfficeInitialized} />
    </FluentProvider>,
  );
});
