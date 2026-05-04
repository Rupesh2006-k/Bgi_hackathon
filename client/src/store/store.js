// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import complaintReducer from '../features/complaintSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    complaint: complaintReducer
  }
})

export default store
