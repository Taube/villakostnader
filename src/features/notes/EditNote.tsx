import { selectNoteById } from "./notesApiSlice"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"
import { useParamsId } from "../../hooks/useParamsId"
import { useAppSelector } from "../../redux/hooks"

const EditNote = () => {
  const id = useParamsId()

  const note = useAppSelector((state) => selectNoteById(state, id))
  const users = useAppSelector(selectAllUsers)

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    )

  return content
}
export default EditNote
