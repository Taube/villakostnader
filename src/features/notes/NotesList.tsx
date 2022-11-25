import { useGetNotesQuery } from "./notesApiSlice"
import { ErrorMessage } from "../../components/ErrorMessage"
import { NoteItem } from "./NoteItem"

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <ErrorMessage isError={isError}>{error}</ErrorMessage>
  }

  if (isSuccess) {
    const { ids } = notes

    const tableContent = ids?.length
      ? ids.map((noteId: string) => <NoteItem key={noteId} noteId={noteId} />)
      : null

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    )
  }

  return content
}
export default NotesList