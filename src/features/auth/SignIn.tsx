// Core
import React from "react"

import { useNavigate, useLocation, Link } from "react-router-dom"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import { Grid } from "@mui/material"
import { FormLayout } from "../../layouts/FormLayout"
import { useInput } from "../../hooks/useInput"
import { useAppDispatch } from "../../redux/hooks"
import { useTranslation, Trans } from "react-i18next"
import { FieldUsername } from "../../components/FieldUsername"
import { FieldPassword } from "../../components/FieldPassword"
import { SubmitButton } from "../../components/SubmitButton"
import { FieldPersistLogin } from "../../components/FieldPersistLogin"
import { Form } from "../../components/Form"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

type ServerResponseError = {
  status: number | string
  data?: {
    message?: string
  }
}

export const SignIn = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const errorRef = React.useRef<HTMLParagraphElement>(null)
  const [errorMessage, setErrorMessage] = React.useState("")
  const dispatch = useAppDispatch()

  const [username, resetUsername, usernameAttributes] = useInput("username", "")
  const [password, setPassword] = React.useState("")

  const [login, { isLoading }] = useLoginMutation()

  const from = location.state?.from?.pathname || "/account"

  React.useEffect(() => {
    setErrorMessage("")
  }, [username, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      resetUsername()
      setPassword("")
      navigate(from)
    } catch (err) {
      const error = err as ServerResponseError

      console.log(error)

      if ("status" in error) {
        if (!error?.status) {
          setErrorMessage("No Server Response")
        } else if (error.status === 400) {
          setErrorMessage("Missing Username or Password")
        } else if (error.status === 401) {
          setErrorMessage("Unauthorized")
        } else if (error.status === "FETCH_ERROR") {
          setErrorMessage("No Server Response")
        } else {
          if ("data" in error) {
            setErrorMessage(error?.data?.message ?? "")
          }
        }
      }
    }

    errorRef.current?.focus()
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <FormLayout
      title={t("label.sign-in")}
      icon={<LockOutlinedIcon />}
      errorRef={errorRef}
      errorMessage={errorMessage}
      footer={
        <Trans i18nKey="subs.do-not-have-an-account">
          Har du inget konto? <Link to="/sign-up">Registrera</Link>
        </Trans>
      }
    >
      <Form id="sign-in" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldUsername
              id="username"
              disabled={isLoading}
              {...usernameAttributes}
            />
          </Grid>
          <Grid item xs={12}>
            <FieldPassword
              id="password"
              onChange={handlePasswordInput}
              value={password}
              disabled={isLoading}
            />
          </Grid>
        </Grid>

        <SubmitButton isLoading={isLoading} />

        <FieldPersistLogin id="persist" disabled={isLoading} />
      </Form>
    </FormLayout>
  )
}
