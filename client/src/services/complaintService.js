import axiosInstance from '../config/axiosInstance'
import { setComplaints } from '../features/complaintSlice'
import { showError, showSuccess } from '../utils/toastUtils'

export const createComplaintService = async ({ formData, dispatch }) => {
  try {
    const res = await axiosInstance.post('/problem/create', formData)
    showSuccess(res.data?.message || 'Complaint created successfully!')
    console.log(res.data.data)
    dispatch(setComplaints(res?.data?.data)) // Update the complaints in the store

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to create complaint. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}

export const getAllComplaintService = async formData => {
  try {
    const res = await axiosInstance.get('/problem/all', formData)
    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to retrieve complaints. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}

export const getDashboardStatsService = async () => {
  try {
    const res = await axiosInstance.get('/problem/states')
    console.log(res.data);
    
    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to retrieve complaints. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}
