import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import officeManifest from "vite-plugin-office-addin";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

import { getHttpsServerOptions } from "office-addin-dev-certs";

console.log(officeManifest);

const proxy = { proxy: { "/templates": "http://localhost:8080", "/template": "http://localhost:8080" } };

async function getHttpsOptions() {
  const httpsOptions = await getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    officeManifest.default({
      devUrl: "https://localhost:3000",
      prodUrl: "https://www.contoso.com", // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION
    }),
  ],
  root: "src",
  build: {
    rollupOptions: {
      input: {
        taskpane: resolve(__dirname, "src/taskpane.html"),
        commands: resolve(__dirname, "src/commands.html"),
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: mode !== "production" ? { https: await getHttpsOptions(), ...proxy } : { ...proxy },
}));
