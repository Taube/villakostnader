import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AuthPayload, setCredentials } from "../../features/auth/authSlice"
import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query"
import { AppState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as unknown as AppState
    const token = state.auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

type RefreshResult = {
  data: AuthPayload
  error: {
    status?: number
    data: {
      message: string
    }
  }
}

const baseQueryWithReauth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: BaseQueryFn
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token")

    // send refresh token to get new access token
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as unknown as RefreshResult

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired."
      }
      return refreshResult
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth as unknown as BaseQueryFn,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
})
