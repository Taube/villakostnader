import { useAppSelector } from "../../redux/hooks"
import { selectAllUsers } from "../users/usersApiSlice"
import NewNoteForm from "./NewNoteForm"

const NewNote = () => {
  const users = useAppSelector(selectAllUsers)

  if (!users?.length) {
    return <p>Not Currently Available</p>
  }

  const content = <NewNoteForm users={users} />

  return content
}
export default NewNote
