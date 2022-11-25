import { selectUserById } from "./usersApiSlice"
import { TableCell, TableRow, IconButton } from "@mui/material"

import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import EditIcon from "@mui/icons-material/Edit"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"

export const User = ({ userId }: { userId: string }) => {
  const user = useAppSelector((state) => selectUserById(state, userId))

  const navigate = useNavigate()

  if (user) {
    const handleEdit = () => {
      navigate(`/account/users/${userId}`)
    }

    const userRolesString = user.roles.toString().replaceAll(",", ", ")

    return (
      <TableRow>
        <TableCell>{user.username}</TableCell>
        <TableCell>{userRolesString}</TableCell>
        <TableCell>
          {user.active ? (
            <CheckBoxIcon color="info" />
          ) : (
            <CheckBoxOutlineBlankIcon color="info" />
          )}
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }

  return null
}
