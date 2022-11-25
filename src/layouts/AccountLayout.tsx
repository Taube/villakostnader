import {
  Container,
  Grid,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Link, Outlet } from "react-router-dom"

import PersonIcon from "@mui/icons-material/Person"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { SignOutButton } from "../features/auth/SignOutButton"

export const AccountLayout = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 4,
      }}
      disableGutters
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Features
              </ListSubheader>
            }
          >
            <ListItemButton component={Link} to={"/account"}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Account"} />
            </ListItemButton>
            <ListItemButton component={Link} to={"/account/users"}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </List>
          <SignOutButton />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  )
}
