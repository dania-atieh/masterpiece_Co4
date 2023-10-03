import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orphans: [],
  families: [],
  error: null,
  loading: true
}

const sponsoredSlice = createSlice({
  name: 'sponsored',
  initialState,
  reducers: {
    getOrphans(state, { payload }) {
      state.loading = false
      state.error = null
      state.orphans = payload.data.orphans
    },
    addOrphan(state, { payload }) {
      state.error = null
      state.orphans = [...state.orphans, payload]
    },
    updateOrphan(state, { payload }) {
      state.error = null
      state.orphans = state.orphans.map((orphan) => (orphan._id === payload._id ? payload : orphan))
    },
    deleteOrphan(state, { payload }) {
      state.error = null
      state.orphans = state.orphans.filter((orphan) => orphan._id !== payload)
    },
    getFamilies(state, { payload }) {
      state.loading = false
      state.error = null
      state.families = payload.data.families
    },
    addFamily(state, { payload }) {
      state.error = null
      state.families = [...state.families, payload]
    },
    updateFamily(state, { payload }) {
      state.error = null
      state.families = state.families.map((family) =>
        family._id === payload._id ? payload : family
      )
    },
    deleteFamily(state, { payload }) {
      state.error = null
      state.families = state.families.filter((family) => family._id !== payload)
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    }
  }
})

export const sponsoredActions = sponsoredSlice.actions

export default sponsoredSlice.reducer
