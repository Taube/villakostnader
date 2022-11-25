import { selectUserById } from "./usersApiSlice"
import { EditUserForm } from "./EditUserForm"
import { useAppSelector } from "../../redux/hooks"
import { useParamsId } from "../../hooks/useParamsId"

export const EditUser = () => {
  const id = useParamsId()
  const user = useAppSelector((state) => selectUserById(state, id))
  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

  return content
}
