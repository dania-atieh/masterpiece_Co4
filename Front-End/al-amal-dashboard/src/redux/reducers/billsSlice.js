import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bills: [],
  loading: true,
  error: null
}

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    getBills(state, { payload }) {
      state.loading = false
      state.error = null
      state.bills = payload.data?.bills
    },
    updateBill(state, { payload }) {
      state.error = null
      state.bills = state.bills.map((bill) => (bill._id === payload._id ? payload : bill))
    },
    deleteBill(state, { payload }) {
      state.error = null
      state.bills = state.bills.filter((bill) => bill._id !== payload)
    },
    setError(state, { payload }) {
      state.error = payload
    },
    startLoading(state) {
      state.loading = true
    }
  }
})

export const billsActions = billsSlice.actions

export default billsSlice.reducer
