// Core
import React from "react"
import axios from "../../api/axios"
import { useNavigate, Link } from "react-router-dom"

// Material
import { Box, Button, Grid, InputAdornment, TextField } from "@mui/material"

// Custom
import { FormLayout } from "../../layouts/FormLayout"

// Icons
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Alert from "@mui/material/Alert"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

import FormStyles from "../../layouts/Form.module.scss"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import { Trans, useTranslation } from "react-i18next"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const SIGN_UP_URL = "/auth/register"

type SignInResponse = { data: any; accessToken: string }

export const SignUp = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const errorRef = React.useRef<HTMLParagraphElement>(null)

  const [username, setUsername] = React.useState("")
  const [validUsername, setValidUsername] = React.useState(false)
  const [userFocus, setUserFocus] = React.useState(false)

  const [password, setPassword] = React.useState("")
  const [validPassword, setValidPassword] = React.useState(false)
  const [passwordFocus, setPasswordFocus] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  React.useEffect(() => {
    const result = USER_REGEX.test(username)
    console.log(result)
    console.log(username)
    setValidUsername(result)
  }, [username])

  React.useEffect(() => {
    const result = PWD_REGEX.test(password)
    console.log(result)
    console.log(password)
    setValidPassword(result)
  }, [password])

  React.useEffect(() => {
    setErrorMessage("")
  }, [username, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response: SignInResponse = await axios.post(
        SIGN_UP_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )

      // Auto-login user after register.
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      navigate("/account")
      // Clear the input fields for the registration form.
    } catch (err) {
      // Todo: Type error
      const error: any = err
      if (!error?.response) {
        setErrorMessage("No server response.")
      } else if (error.response?.status === "409") {
        setErrorMessage("Username taken")
      } else {
        setErrorMessage("Registration failed.")
      }

      errorRef.current?.focus()
    }
  }

  return (
    <FormLayout
      title={t("label.sign-up")}
      icon={<AppRegistrationIcon />}
      errorRef={errorRef}
      errorMessage={errorMessage}
      footer={
        <Trans i18nKey="subs.already-have-an-account">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </Trans>
      }
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              autoComplete="off"
              name="username"
              id="username"
              label={t("label.username")}
              required
              autoFocus
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {validUsername ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <EmailIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Alert
              id="uidnote"
              severity="info"
              className={
                userFocus && username && !validUsername
                  ? FormStyles["instruction"]
                  : FormStyles["offscreen"]
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores and hyphens allowed.
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="password"
              name="password"
              label={t("label.password")}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
              fullWidth
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {validPassword ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <LockIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <Alert
              id="pwdnote"
              severity="info"
              className={
                passwordFocus && !validPassword
                  ? FormStyles["instruction"]
                  : FormStyles["offscreen"]
              }
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters a:
              <span aria-label="exclamation-mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </Alert>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          disabled={!validUsername || !validPassword}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          {t("label.sign-up")}
        </Button>
      </Box>
    </FormLayout>
  )
}
