import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { selectCurrentToken } from "./authSlice"

export const Welcome = () => {
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

      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/account/users">Users</Link>
          </li>
          <li>
            <Link to="/account/notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </Box>
  )
}
