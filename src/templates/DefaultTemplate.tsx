import { Outlet } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

import { ThemeOptions } from "@mui/material"
import { deepPurple } from "@mui/material/colors"

import layout from "../layouts/layout.module.scss"

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: deepPurple["A200"],
      dark: "#222A45",
    },
    secondary: {
      main: "#ff9e43",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#fafafa",
    },
  },
}

export const DefaultTemplate = () => {
  const theme = createTheme(themeOptions)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className={layout.main}>
        <Header />
        <Outlet />
        <Footer />
      </main>
    </ThemeProvider>
  )
}
