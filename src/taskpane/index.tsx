import App from "./App";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import { createRoot } from "react-dom/client";

import React from "react";

/* global document, Office */

initializeIcons();

let isOfficeInitialized = false;

const title = "Hero Word";

// root.render(
//   <ThemeProvider>
//     <App title={title} isOfficeInitialized={isOfficeInitialized} />
//   </ThemeProvider>,
// );

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;

  const container = document.getElementById("container");
  const root = createRoot(container);

  root.render(
    <ThemeProvider>
      <App title={title} isOfficeInitialized={isOfficeInitialized} />
    </ThemeProvider>,
  );
});
