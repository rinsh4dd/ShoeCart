/* import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/shoeCart-Proj/",
  plugins: [react(), tailwindcss()],
});




 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/shoeCart-Proj/",
  server: {
    watch: {
      ignored: ["/db.json", "/*.db.json"],
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      
    },
  },
});
