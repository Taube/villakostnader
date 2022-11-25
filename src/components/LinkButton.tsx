import { Button } from "@mui/material"
import { NavLink, To } from "react-router-dom"
import { useTestId } from "../contexts/TestContext"

type Variant = "text" | "contained" | "outlined" | undefined

export const LinkButton = ({
  id,
  children,
  to,
  icon,
  onClick,
  variant,
}: {
  id: string
  children: React.ReactNode
  to: To
  icon?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  variant?: Variant
}) => {
  const testId = useTestId(id)

  return (
    <Button
      onClick={onClick}
      component={NavLink}
      to={to}
      variant={variant}
      startIcon={icon}
      {...testId}
    >
      {children}
    </Button>
  )
}
