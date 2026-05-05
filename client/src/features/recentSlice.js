// redux/slices/recentSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recentComplaints: []
}

const recentSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {
    setRecentComplaints: (state, action) => {
      state.recentComplaints = action.payload || []
    },

    clearRecent: () => initialState
  }
})

export const { setRecentComplaints, clearRecent } = recentSlice.actions

export default recentSlice.reducer
