import React from "react"

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { NavLink } from "react-router-dom"

export const UserNavigation = () => {
  const [anchorElUser, setAnchorElUser] =
    React.useState<HTMLButtonElement | null>(null)
  const handleOpenUserMenu = (
    e: React.MouseEvent<HTMLButtonElement | null>
  ) => {
    setAnchorElUser(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <Tooltip title="User Navigation">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          component={NavLink}
          to={"/account"}
          onClick={handleCloseUserMenu}
        >
          Account
        </MenuItem>
        <MenuItem
          component={NavLink}
          to={"/account/users"}
          onClick={handleCloseUserMenu}
        >
          Users
        </MenuItem>
        <MenuItem
          component={NavLink}
          to={"/account/notes"}
          onClick={handleCloseUserMenu}
        >
          Notes
        </MenuItem>
      </Menu>
    </>
  )
}
