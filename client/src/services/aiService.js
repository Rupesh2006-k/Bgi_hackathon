import axiosInstance from '../config/axiosInstance'
import { showError, showSuccess } from '../utils/toastUtils'

const aiService = async prompt => {
  try {
    const res = await axiosInstance.post('/ai/generate', {
      prompt
    })

    showSuccess(res.data?.message || 'AI response generated successfully')

    return res.data
  } catch (error) {
    const message =
      error.response?.data?.message || 'Failed to generate AI response'

    showError(message)

    throw new Error(message, { cause: error })
  }
}

export { aiService }
