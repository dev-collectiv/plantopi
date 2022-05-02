import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";

import tsconfigPaths from 'vite-tsconfig-paths'
import react from "@vitejs/plugin-react";

const pathSrc = path.resolve(__dirname, "./src");


export default defineConfig(({mode}) =>({
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "${pathSrc}/styles/main";` },
    },
  },
  server: {
    port: 3001,
    https: false,
  },
  define: {
    "process.env.NODE_ENV": `"${mode}"`,
  },
  plugins: [react(), svgr(), tsconfigPaths()],
}))