import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  users: [],
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {//these actions receive payload from responses of the server/ HTTP requests 
    getUsers(state, { payload }) {
      state.loading = false
      state.error = null
      state.users = payload.data.users
    },
    addUser(state, { payload }) {
      state.error = null
      state.users = [...state.users, payload]//adds the new user to users array
    },
    updateUser(state, { payload }) {
      state.error = null
      state.users = state.users.map((user) => (user._id === payload._id ? payload : user))//finds the user with matching ID and replaces it with new data(payload)
    },
    deleteUser(state, { payload }) {
      state.error = null
      state.users = state.users.filter((user) => user._id !== payload)
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    }
  }
})

export const usersActions = usersSlice.actions //I extracted and exported only the actions in reducer property so I can dispath actions to update the state

export default usersSlice.reducer
