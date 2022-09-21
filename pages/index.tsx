import type { NextPage } from "next";
import Head from "next/head";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/system/ThemeProvider/ThemeProvider";
import indigo from "@mui/material/colors/indigo";
import { CalculateForm } from "./forms/CalculateForm";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "2rem",
          paddingBottom: "2rem",
        },
      },
    },
    MuiGrid2: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {},
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {},
      },
    },
  },
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
  },
});

const Home: NextPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Villkostnader</title>
        <meta
          name="description"
          content="En webbplats dedikerad till att tydliggöra och minska fasta kostnader för villaägare."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md">
        <Grid2 container alignItems="center">
          <Grid2 sm={6} display="flex">
            <Typography variant="h4" color={indigo[300]}>
              Villakostnader.se
            </Typography>
          </Grid2>
          <Grid2 sm={6}>
            <p>Hjälper dig minska dina kostnader</p>
          </Grid2>
        </Grid2>
        <CalculateForm />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
