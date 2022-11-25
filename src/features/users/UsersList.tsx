import React from "react"
import { useGetUsersQuery } from "./usersApiSlice"
import { Box } from "@mui/system"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { GridEventListener, GridRowsProp } from "@mui/x-data-grid/models"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../../components/ErrorMessage"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
    editable: false,
  },
  {
    field: "roles",
    headerName: "Roles",
    width: 150,
    editable: false,
  },
  {
    field: "active",
    headerName: "Active",
    type: "boolean",
    width: 80,
    editable: false,
  },
]

export const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()

  const rows = React.useMemo(() => {
    return users?.ids.map((id: string) => ({
      id,
      username: users.entities[id]?.username ?? "",
      roles: users.entities[id]?.roles.toString().replaceAll(",", ", ") ?? "",
      active: users.entities[id]?.active ?? false,
    })) as GridRowsProp
  }, [users])

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <ErrorMessage isError={isError}>{error}</ErrorMessage>
  }

  if (isSuccess) {
    const handleRowClick: GridEventListener<"rowClick"> = (
      params, // GridRowParams
      e // MuiEvent<React.MouseEvent<HTMLElement>>
    ) => {
      e.preventDefault()
      navigate(`/account/users/${params.row.id}`)
    }

    return (
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onRowClick={handleRowClick}
        />
      </Box>
    )
  }

  return null
}
