import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const RequireAuth = ({
  allowedRoles,
}: {
  allowedRoles: ReadonlyArray<string>
}) => {
  const location = useLocation()
  const { roles } = useAuth()

  const roleHasAccess = roles?.some((role: string) =>
    allowedRoles.includes(role)
  )

  if (roleHasAccess) {
    return <Outlet />
  } else {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
}
