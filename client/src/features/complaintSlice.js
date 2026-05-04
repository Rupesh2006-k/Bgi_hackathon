import { createSlice } from '@reduxjs/toolkit'

const complaintSlice = createSlice({
  name: 'complaint',
  initialState: {
    complaints: []
  },
  reducers: {
    // 🔹 Set All Complaints
    setComplaints: (state, action) => {
      state.complaints = action.payload
    },

    // 🔹 Clear (optional but useful)
    clearComplaints: state => {
      state.complaints = []
    }
  }
})

export const { setComplaints, clearComplaints } = complaintSlice.actions

export default complaintSlice.reducer
