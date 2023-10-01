/* global document, Office */
import App from "./App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";

import { createRoot } from "react-dom/client";

import React from "react";

import "./taskpane.css";

let isOfficeInitialized = false;

const title = "Hero Word";

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;

  const container = document.getElementById("container");
  const root = createRoot(container);

  root.render(
    <FluentProvider theme={teamsLightTheme}>
      <App title={title} isOfficeInitialized={isOfficeInitialized} />
    </FluentProvider>,
  );
});
