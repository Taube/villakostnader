import React from "react"

import { Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import { useTranslation } from "react-i18next"

import flagGb from "../assets/gb.svg"
import flagSe from "../assets/se.svg"
import { useTestId } from "../contexts/TestContext"

const languages = [
  { hl: "sv", nativeName: "Svenska", flag: flagSe },
  { hl: "en", nativeName: "English", flag: flagGb },
]

export const LanguageNavigation = () => {
  const { i18n } = useTranslation()

  const testId = useTestId("button-languages")

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const currentLanguage =
    languages.find((language) => language.hl === i18n.resolvedLanguage) ??
    languages[0]

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "language-navigation" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...testId}
      >
        <Avatar sx={{ width: 32, height: 32 }} src={currentLanguage.flag}>
          {currentLanguage.nativeName}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="language-navigation"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {languages.map(({ hl, flag, nativeName }) => (
          <LanguageItem
            key={hl}
            id={`language-${hl}`}
            flag={flag}
            nativeName={nativeName}
            onClick={() => i18n.changeLanguage(hl)}
          />
        ))}
      </Menu>
    </>
  )
}

const LanguageItem = ({
  id,
  nativeName,
  flag,
  onClick,
}: {
  id: string
  nativeName: string
  flag: string
  onClick: React.MouseEventHandler<HTMLLIElement>
}) => {
  const testId = useTestId(id)
  return (
    <MenuItem onClick={onClick} {...testId}>
      <Avatar src={flag} />
      {nativeName}
    </MenuItem>
  )
}
