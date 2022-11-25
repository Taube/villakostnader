import React from "react"

import { Outlet } from "react-router-dom"
import { usersApiSlice } from "../users/usersApiSlice"

import { store } from "../../redux/store"

export const Prefetch = () => {
  React.useEffect(() => {
    console.log("subscribing")

    // @ts-ignore: Unreachable code error
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
      console.log("unsubscribing")
      users.unsubscribe()
    }
  }, [])

  return <Outlet />
}
