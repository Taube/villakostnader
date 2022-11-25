import React from "react"
import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "./authApiSlice"
import { Button } from "@mui/material"
import { ErrorMessage } from "../../components/ErrorMessage"

export const SignOutButton = () => {
  const navigate = useNavigate()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  React.useEffect(() => {
    // If Sign out is successful, send to the start page.
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate])

  if (isError) {
    return <ErrorMessage isError={isError}>{error}</ErrorMessage>
  }

  return (
    <Button onClick={sendLogout} color="error" disabled={isLoading}>
      Sign out
    </Button>
  )
}
