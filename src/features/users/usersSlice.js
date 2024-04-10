import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Immer lets us update state in two ways: either mutating the existing state value, or returning a new result.
    // If we return a new value, that will replace the existing state completely with whatever we return.
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users

export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
