import React from "react"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../../components/ErrorMessage"

import { User } from "../users/usersApiSlice"
import { useAddNewNoteMutation } from "./notesApiSlice"

const NewNoteForm = ({ users }: { users: Array<User> }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = React.useState("")
  const [text, setText] = React.useState("")
  const [userId, setUserId] = React.useState(users[0].id)

  React.useEffect(() => {
    if (isSuccess) {
      setTitle("")
      setText("")
      setUserId("")
      navigate("/account/notes")
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value)

  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value)

  const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user: userId, title, text })
    }
  }

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    )
  })

  const validTitleClass = !title ? "form__input--incomplete" : ""
  const validTextClass = !text ? "form__input--incomplete" : ""

  const content = (
    <>
      <ErrorMessage isError={isError}>{error}</ErrorMessage>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              Save
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="username"
        >
          ASSIGNED TO:
        </label>
        <select
          id="username"
          name="username"
          className="form__select"
          value={userId}
          onChange={onUserIdChanged}
        >
          {options}
        </select>
      </form>
    </>
  )

  return content
}

export default NewNoteForm
