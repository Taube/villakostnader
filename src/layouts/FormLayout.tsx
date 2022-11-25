import React from "react"

import { Alert, Avatar, Container, Grid, Typography, Box } from "@mui/material"
import { deepPurple } from "@mui/material/colors"

import styles from "./Form.module.scss"

type FormLayoutProps = {
  title: React.ReactNode
  icon: React.ReactNode
  errorRef: React.RefObject<HTMLParagraphElement>
  errorMessage: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
}

export const FormLayout = ({
  title,
  icon,
  errorRef,
  errorMessage,
  children,
  footer,
}: FormLayoutProps) => {
  const errorClass = errorMessage
    ? styles["error-message"]
    : styles["offscreen"]
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {icon ? (
          <Avatar sx={{ m: 1, bgcolor: deepPurple[50], color: "primary.main" }}>
            {icon}
          </Avatar>
        ) : null}
        <Alert
          ref={errorRef}
          sx={{ m: 3 }}
          severity="warning"
          className={errorClass}
        >
          {errorMessage}
        </Alert>

        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Box>

      {children}

      {footer ? (
        <Grid
          container
          justifyContent="center"
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Typography variant="body2">{footer}</Typography>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  )
}
