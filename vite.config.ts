import { defineConfig } from "vite";
import { extname, relative, resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { glob } from "glob";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: ["**/*.stories.tsx", "**/*.stories.ts"],
      tsconfigPath: "tsconfig.app.json",
    }),
  ],
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },

    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{ts,tsx}", {
            ignore: ["src/**/*.d.ts", "src/**/*.stories.{ts,tsx}"],
          })
          .map((file) => {
            return [
              relative(
                "src",
                file.slice(0, file.length - extname(file).length)
              ),
              fileURLToPath(new URL(file, import.meta.url)),
            ];
          })
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
