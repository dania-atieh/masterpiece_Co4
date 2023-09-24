import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
  error: null,
  loading: true
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateMe(state, { payload }) {
      state.error = null
      state.loading = false
      state.profile = payload.data?.user
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    },
  }
})

export const profileActions = profileSlice.actions

export default profileSlice.reducer
