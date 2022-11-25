import Container from "@mui/material/Container"
import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography"
import { Stack } from "@mui/system"
import { Link } from "react-router-dom"
import { Link as MuiLink } from "@mui/material"
import { deepPurple } from "@mui/material/colors"

import layout from "../layouts/layout.module.scss"

export const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      className={layout.footer}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.dark
            : theme.palette.grey[800],
        color: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.contrastText
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Typography variant="body2">
            Copyright ©{" "}
            <MuiLink component={Link} to="/" sx={{ color: deepPurple["A100"] }}>
              Villakostnader.se
            </MuiLink>
          </Typography>
          <Typography variant="body2">
            Ola Taube | <strong>{year}</strong>
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
