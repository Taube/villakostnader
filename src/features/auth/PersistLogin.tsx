import React from "react"

import { Link, Outlet } from "react-router-dom"
import { useRefreshMutation } from "./authApiSlice"
import { usePersist } from "../../hooks/usePersist"
import { selectCurrentToken } from "./authSlice"
import { useAppSelector } from "../../redux/hooks"
import { ErrorMessage } from "../../components/ErrorMessage"

export const PersistSignIn = () => {
  const [persist] = usePersist()
  const token = useAppSelector(selectCurrentToken)

  // Specific for React 18 strict mode
  const effectRan = React.useRef(false)

  const [trueSuccess, setTrueSuccess] = React.useState(false)

  // isUninitialized = has not been called yet
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  React.useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode. useEffect runs twice when in development mode in react 18 in strict mode
      // It will only be true the second render.
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token")
        try {
          // const response = await refresh()
          // const { accessToken } = response.data
          await refresh("refresh")

          // Extra little bit of time/state to check it.
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) {
        verifyRefreshToken()
      }
    }

    // Cleanup
    return () => {
      effectRan.current = true
    }

    // eslint does not like empty dependency arrays so we'll disable it like this.
    // eslint-disable-next-line
  }, [])

  if (!persist) {
    // persist: no
    console.log("no persist")
    return <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading")
    return <p>Loading...</p>
  } else if (isError) {
    //persist: yes, token: no
    console.log("error")
    return (
      <>
        <ErrorMessage isError={true}>{error}</ErrorMessage>
        <p>
          <Link to="/sign-in">Please login again</Link>.
        </p>
      </>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success")
    return <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and isUninitialized")
    console.log(isUninitialized)
    return <Outlet />
  }

  return null
}
