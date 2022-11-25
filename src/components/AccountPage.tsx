import { Box, Typography } from "@mui/material"

import { selectCurrentToken } from "../features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

export const AccountPage = () => {
  const token = useAppSelector(selectCurrentToken)

  const date = new Date()
  const today = new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date)

  const tokenAbbr = `${token?.slice(0, 9)}...`

  return (
    <Box>
      <Typography component="p">{today}</Typography>
      <Typography component="p">Token: {tokenAbbr}</Typography>

      {/**
      <Typography component="h1" variant="h5">
        {user ? `Welcome ${user}!` : "Welcome!"}
      </Typography>
       */}

      <Typography component="p">Links for testing purposes.</Typography>
    </Box>
  )
}
