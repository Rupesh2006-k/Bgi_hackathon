// redux/slices/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalComplaints: 0,
  pendingIssues: 0,
  resolvedIssues: 0,
  rejectedIssues: 0,
  highPriorityIssues: 0,
  categoryStats: []
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      const data = action.payload

      state.totalComplaints = data.totalComplaints || 0
      state.pendingIssues = data.pendingIssues || 0
      state.resolvedIssues = data.resolvedIssues || 0
      state.rejectedIssues = data.rejectedIssues || 0
      state.highPriorityIssues = data.highPriorityIssues || 0
      state.categoryStats = data.categoryStats || []
    },

    clearDashboard: () => initialState
  }
})

export const { setDashboardData, clearDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer
