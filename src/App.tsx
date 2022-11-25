// Core
import { Routes, Route } from "react-router-dom"
import loadable from "@loadable/component"

// Global Deps
import { DefaultTemplate } from "./templates/DefaultTemplate"
import { PersistSignIn } from "./features/auth/PersistLogin"
import { Prefetch } from "./features/auth/Prefetch"
import { AccountLayout } from "./layouts/AccountLayout"
import { RequireAuth } from "./features/auth/RequireAuth"
import { ROLES } from "./config/roles"

// Async Deps
const HomePage = loadable(() => import("./components/HomePage"), {
  resolveComponent: (components) => components.HomePage,
})

const SignIn = loadable(() => import("./features/auth/SignIn"), {
  resolveComponent: (components) => components.SignIn,
})

const SignUp = loadable(() => import("./features/auth/SignUp"), {
  resolveComponent: (components) => components.SignUp,
})

const Unauthorized = loadable(() => import("./components/Unauthorized"), {
  resolveComponent: (components) => components.Unauthorized,
})

const Missing = loadable(() => import("./components/Missing"), {
  resolveComponent: (components) => components.Missing,
})

const AccountPage = loadable(() => import("./components/AccountPage"), {
  resolveComponent: (components) => components.AccountPage,
})

const UsersList = loadable(() => import("./features/users/UsersList"), {
  resolveComponent: (components) => components.UsersList,
})

const EditUser = loadable(() => import("./features/users/EditUser"), {
  resolveComponent: (components) => components.EditUser,
})

const NewUserForm = loadable(() => import("./features/users/NewUserForm"), {
  resolveComponent: (components) => components.NewUserForm,
})

import "./i18n"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultTemplate />}>
        <Route index element={<HomePage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PersistSignIn />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="account" element={<AccountLayout />}>
                <Route index element={<AccountPage />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}
