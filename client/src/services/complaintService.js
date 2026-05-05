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

export const updateComplaintService = async ({ formData, dispatch }) => {
  try {
    const res = await axiosInstance.put('/problem/update', formData)
    showSuccess(res.data?.message || 'Complaint updated successfully!')
    console.log(res.data.data)
    dispatch(setComplaints(res?.data?.data)) // Update the complaints in the store

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to update complaint. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}

export const updatePriorityCategoryService = async ({ formData, dispatch }) => {
  try {
    const res = await axiosInstance.patch(
      '/problem/update-priority-category',
      formData
    )
    showSuccess(res.data?.message || 'Priority/Category updated successfully!')
    console.log(res.data.data)
    dispatch(setComplaints(res?.data?.data)) // Update the complaints in the store

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to update priority/category. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}

export const deleteComplaintService = async ({ formData }) => {
  try {
    const res = await axiosInstance.delete('/problem/delete', {
      data: formData
    })
    showSuccess(res.data?.message || 'Complaint deleted successfully!')
    console.log(res.data.data)

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to delete complaint. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}

export const getAllComplaintService = async () => {
  try {
    const res = await axiosInstance.get('/problem/all')
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
    console.log(res.data)

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message ||
      'Failed to retrieve complaints. Please try again.'
    showError(message)
    throw new Error(message, { cause: error })
  }
}
