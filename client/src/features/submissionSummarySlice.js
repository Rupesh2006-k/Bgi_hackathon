import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: '',
  priority: '',
  trackingId: '',
  status: ''
}

const submissionSummarySlice = createSlice({
  name: 'submissionSummary',
  initialState,
  reducers: {
    setSubmissionSummary: (state, action) => {
      state.category = action.payload?.category || ''
      state.priority = action.payload?.priority || ''
      state.trackingId = action.payload?.trackingId || ''
      state.status = action.payload?.status || ''
    },

    clearSubmissionSummary: () => initialState
  }
})

export const { setSubmissionSummary, clearSubmissionSummary } =
  submissionSummarySlice.actions

export default submissionSummarySlice.reducer
