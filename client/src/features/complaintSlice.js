import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  complaints: []
}

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setComplaints: (state, action) => {
      state.complaints = action.payload || []
    },

    clearComplaints: () => initialState
  }
})

export const { setComplaints, clearComplaints } = complaintSlice.actions

export default complaintSlice.reducer