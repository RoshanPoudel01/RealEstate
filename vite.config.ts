import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig(() => {
  return {
    server: { open: true, port: 6005 },
    plugins: [
      svgr(),
      react(),
      tsconfigPaths(),
      checker({
        typescript: true,
      }),
    ],
    publicDir: "public",
    resolve: {
      alias: {
        "@realState": path.resolve(__dirname, "src"),
      },
    },
  };
});
