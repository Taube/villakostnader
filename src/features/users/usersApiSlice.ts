import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../redux/api/apiSlice"
import { AppState } from "../../redux/store"

export type Roles = ReadonlyArray<string>

export type User = {
  id: string
  _id: string
  username: string
  roles: Roles
  active: boolean
}

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
})

const initialState = usersAdapter.getInitialState({
  ids: [],
  entities: [],
})

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response: any, result: any) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData: any) => {
        const loadedUsers = responseData.map((user: User) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      // @ts-ignore: Unreachable code error
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ]
        } else return [{ type: "User", id: "LIST" }]
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice

// returns the query result object
// @ts-ignore: Unreachable code error
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state: AppState) => selectUsersData(state) ?? initialState
)
