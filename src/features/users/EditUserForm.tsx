import React from "react"
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  User,
} from "./usersApiSlice"

import { ROLES } from "../../config/roles"

import { Box, Stack } from "@mui/system"
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
  TextField,
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"
import DeleteIcon from "@mui/icons-material/Delete"
import EmailIcon from "@mui/icons-material/Email"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate } from "react-router-dom"
import { BackButton } from "../../components/BackButton"
import { ErrorMessage } from "../../components/ErrorMessage"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

export const EditUserForm = ({ user }: { user: User }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: deleteError },
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = React.useState(user.username)
  const [validUsername, setValidUsername] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [validPassword, setValidPassword] = React.useState(false)
  const [roles, setRoles] = React.useState(Object.values(user.roles))

  const [active, setActive] = React.useState(user.active)

  React.useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  React.useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  React.useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("")
      setPassword("")
      setRoles([])
      navigate("/account/users")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value)

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onActiveChanged = () =>
    setActive((previousValue: boolean) => !previousValue)

  const onSaveUserClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  let canSave
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleToggle = (value: string) => () => {
    const currentIndex = roles.indexOf(value)
    const newRoles = [...roles]
    if (currentIndex === -1) {
      newRoles.push(value)
    } else {
      newRoles.splice(currentIndex, 1)
    }

    setRoles(newRoles)
  }

  const rolesArray = Object.entries(ROLES)

  return (
    <>
      <ErrorMessage isError={isError || isDelError}>
        {error || deleteError}
      </ErrorMessage>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack spacing={2}>
          <TextField
            onChange={onUsernameChanged}
            value={username}
            autoComplete="off"
            name="username"
            id="username"
            label="Username"
            required
            aria-invalid={validUsername ? "false" : "true"}
            aria-describedby="uidnote"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {validUsername ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <EmailIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            autoComplete="off"
            name="password"
            id="password"
            label="Password"
            onChange={onPasswordChanged}
            value={password}
            FormHelperTextProps={
              <p>empty = no change. 4-12 chars incl. !@#$%</p>
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {password && validPassword ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <LockIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={active} onChange={onActiveChanged} />}
              label="Active"
            />
          </FormGroup>

          <List subheader={<ListSubheader>Assigned roles</ListSubheader>}>
            {rolesArray.map((role) => (
              <ListItem key={role[0]} value={role[1]}>
                <ListItemText primary={role[0]} />
                <Switch
                  edge="end"
                  onChange={handleToggle(role[1])}
                  checked={roles.includes(role[1])}
                />
              </ListItem>
            ))}
          </List>

          <Stack spacing={2} direction="row" flexGrow={1}>
            <BackButton />
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              Save
            </Button>

            <Stack
              spacing={2}
              direction="row"
              flexGrow={1}
              justifyItems={"flex-end"}
              justifyContent={"flex-end"}
            >
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={onDeleteUserClicked}
                color="error"
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
