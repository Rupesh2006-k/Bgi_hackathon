// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload
    },

    logoutUser: state => {
      state.user = null
      state.loading = false
    },

    setUserLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setUserDetails, logoutUser, setUserLoading } = userSlice.actions

export default userSlice.reducer
