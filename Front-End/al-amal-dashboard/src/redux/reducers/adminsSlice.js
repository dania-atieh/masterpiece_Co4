import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admins: [],
  error: null,
  loading: true
}

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    getAdmins(state, { payload }) {
      state.loading = false
      state.error = null
      state.admins = payload.data.admins
    },
    addAdmin(state, { payload }) {
      state.error = null
      state.admins = [...state.admins, payload]
    },
    updateAdmin(state, { payload }) {
      state.error = null
      state.admins = state.admins.map((admin) => (admin._id === payload._id ? payload : admin))
    },
    deleteAdmin(state, { payload }) {
      state.error = null
      state.admins = state.admins.filter((admin) => admin._id !== payload)
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    }
  }
})

export const adminsActions = adminsSlice.actions

export default adminsSlice.reducer
