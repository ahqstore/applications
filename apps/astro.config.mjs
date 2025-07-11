// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ahqstore.github.io",
  base: "/applications",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.github.com",
        pathname: "ahqstore/**",
      },
    ],
  },
  integrations: [react()],
});
