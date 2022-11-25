import { selectCurrentToken } from "../features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import jwtDecode from "jwt-decode"
import { Roles } from "../features/users/usersApiSlice"

type JwtDecoded = {
  UserInfo: {
    username: string
    roles: Roles
    active: boolean
  }
}

export const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isEditor = false
  let isAdmin = false
  let status = "Employee"

  if (token) {
    const decoded: JwtDecoded = jwtDecode(token)

    const { username, roles } = decoded.UserInfo

    isEditor = roles?.includes("Editor")
    isAdmin = roles?.includes("Admin")

    if (isEditor) status = "Editor"
    if (isAdmin) status = "Admin"

    return { username, roles, status, isEditor, isAdmin }
  }

  return { username: "", roles: [], isEditor, isAdmin, status }
}
