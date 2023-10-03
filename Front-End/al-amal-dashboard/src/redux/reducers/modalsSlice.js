import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modals: {}
}

//The createSlice function returns an object that contains the generated action creators (openModel and closeModel) and the reducer for the slice.
const modalsSlice = createSlice({
  name: 'modals',//slice name
  initialState,
  reducers: {//2 functions
    openModal(state, { payload }) {
      state.modals = { ...state.modals, [payload]: true }//updates the modals property by creating a new object with the modal identified by payload set to true.
    },
    closeModals(state) {//closing all modals.
      state.modals = initialState
    }
  }
})

export const modalsActions = modalsSlice.actions

export default modalsSlice.reducer
