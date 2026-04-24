import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "FoncierChain",
  server: {
    allowedHosts: [".trycloudflare.com"],
  },
  plugins: [tailwindcss()],
});
