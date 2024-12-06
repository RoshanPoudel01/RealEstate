import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    server: { open: true, port: 6005 },
    plugins: [
      svgr(),
      react(),
      tsconfigPaths(),
      // checker({
      //   typescript: true,
      //   eslint: { lintCommand: "eslint src" },
      //   overlay: false,
      // }),
    ],
    publicDir: "public",
    resolve: {
      alias: {
        "@realState": path.resolve(__dirname, "src"),
      },
    },
  };
});
