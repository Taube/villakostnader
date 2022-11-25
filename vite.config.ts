import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import dns from "dns"

dns.setDefaultResultOrder("verbatim")

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})
