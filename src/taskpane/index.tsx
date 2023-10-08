/* global document, Office */
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import { createRoot } from "react-dom/client";

import "tailwindcss/tailwind.css";
import "../index.css";

let isOfficeInitialized = false;

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;

  const container = document.getElementById("container");

  if (container) {
    const root = createRoot(container);

    root.render(
      <FluentProvider theme={webLightTheme}>
        <App isOfficeInitialized={isOfficeInitialized} />
      </FluentProvider>,
    );
  } else {
    console.error("Could not find container element");
  }
});
