import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { selectNoteById } from "./notesApiSlice"

export const NoteItem = ({ noteId }: { noteId: string }) => {
  const note = useAppSelector((state) => selectNoteById(state, noteId))
  const navigate = useNavigate()

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    })

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    })

    const handleEdit = () => {
      navigate(`/account/notes/${noteId}`)
    }

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            Edit
          </button>
        </td>
      </tr>
    )
  } else return null
}
