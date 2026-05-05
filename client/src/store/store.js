// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import complaintReducer from '../features/complaintSlice'
import submissionSummaryReducer from '../features/submissionSummarySlice'
import recentReducer from '../features/recentSlice'
import dashboardReducer from '../features/dashboardSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    submissionSummary: submissionSummaryReducer,
    recent: recentReducer,
    dashboard: dashboardReducer,
    complaint: complaintReducer
  }
})

export default store
