import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  loading: true,
  error: null
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    getCourses(state, { payload }) {
      state.loading = false
      state.error = null
      state.courses = payload.data?.courses
    },
    addCourse(state, { payload }) {
      state.error = null
      state.courses = [...state.courses, payload]
    },
    updateCourse(state, { payload }) {
      state.error = null
      state.courses = state.courses.map((course) => (course._id === payload._id ? payload : course))
    },
    deletecCourse(state, { payload }) {
      state.error = null
      state.courses = state.courses.filter((course) => course._id !== payload)
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    }
  }
})

export const coursesActions = coursesSlice.actions

export default coursesSlice.reducer
