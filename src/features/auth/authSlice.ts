import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../../redux/store"

export type AuthPayload = {
  accessToken: string
}

export interface AuthState {
  token: null | string
}

const initialState: AuthState = {
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: () => initialState,
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: AppState) => state.auth.token
