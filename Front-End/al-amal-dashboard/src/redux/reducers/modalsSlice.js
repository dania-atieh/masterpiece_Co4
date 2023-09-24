import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modals: {}
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.modals = { ...state.modals, [payload]: true }
    },
    closeModals(state) {
      state.modals = initialState
    }
  }
})

export const modalsActions = modalsSlice.actions

export default modalsSlice.reducer
