import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Uncomment to use JSX:
  plugins: [
    tailwindcss(),
  ],
  esbuild: {
    jsx: "transform",
    jsxFactory: "m",
    jsxFragment: "'['",
  },
});
