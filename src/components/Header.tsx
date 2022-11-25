import React from "react"
import { Link, NavLink } from "react-router-dom"

import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"

import { Box } from "@mui/system"
import MenuIcon from "@mui/icons-material/Menu"
import AdbIcon from "@mui/icons-material/Adb"
import HouseIcon from "@mui/icons-material/House"

import { selectCurrentToken } from "../features/auth/authSlice"
import { UserNavigation } from "./UserNavigation"
import { useAppSelector } from "../redux/hooks"

import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import KeyIcon from "@mui/icons-material/Key"
import { LanguageNavigation } from "./LanguageNavigation"
import { useTranslation } from "react-i18next"
import { LinkButton } from "./LinkButton"
import { TestContext } from "../contexts/TestContext"

export const Header = () => {
  const { t } = useTranslation()

  const currentToken = useAppSelector(selectCurrentToken)

  const [anchorElNav, setAnchorElNav] =
    React.useState<HTMLButtonElement | null>(null)

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <TestContext.Provider value="header">
      <AppBar elevation={3} position="sticky" color="inherit">
        <Container>
          <Toolbar disableGutters>
            <HouseIcon
              color="primary"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("brand.domain")}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>Sida</MenuItem>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("brand.name")}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              {/* Public links goes here */}
            </Box>

            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              {currentToken ? (
                <UserNavigation />
              ) : (
                <Stack direction={"row"} spacing={2}>
                  <LinkButton
                    id="link-sign-in"
                    icon={<KeyIcon />}
                    onClick={handleCloseNavMenu}
                    to="/sign-in"
                    variant="outlined"
                  >
                    {t("label.sign-up")}
                  </LinkButton>
                  <LinkButton
                    id="link-sign-up"
                    icon={<AppRegistrationIcon />}
                    onClick={handleCloseNavMenu}
                    to="/sign-up"
                    variant="contained"
                  >
                    {t("label.sign-up")}
                  </LinkButton>
                  <LanguageNavigation />
                </Stack>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </TestContext.Provider>
  )
}
