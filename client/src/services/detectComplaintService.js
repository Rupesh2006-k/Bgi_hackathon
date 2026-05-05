import axiosInstance from '../config/axiosInstance'
import { setSubmissionSummary } from '../features/submissionSummarySlice'
import { showError } from '../utils/toastUtils'

export const detectComplaintService = async ({ prompt, dispatch }) => {
  try {
    const res = await axiosInstance.post('/complaint/detect', {
      prompt
    })
    if (res?.success) {
      dispatch(setSubmissionSummary(res.data))
    }
    console.log(res)
    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to detect complaint'

    showError(message)
    throw error
  }
}
