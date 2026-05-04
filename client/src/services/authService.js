// src/services/authService.js
import axiosInstance from '../config/axiosInstance'
import { showError, showSuccess } from '../utils/toastUtils'
import { logoutUser, setUserDetails } from '../features/userSlice'

const loginService = async ({ email, password }, dispatch) => {
  try {
    const res = await axiosInstance.post('/auth/login', { email, password })

    const userData = res?.data?.data

    dispatch(setUserDetails(userData))

    showSuccess('Login successful')

    return res.data // ✅ success return
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed'

    showError(message)

    throw new Error(message, { cause: error })
  }
}

const registerService = async (formData, dispatch) => {
  try {
    const res = await axiosInstance.post('/auth/register', formData)
    const userData = res?.data?.data
    dispatch(setUserDetails(userData))
    showSuccess('Account created successfully')

    return res.data
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed'
    showError(message)

    throw new Error(message, { cause: error })
  }
}

const logoutService = async dispatch => {
  try {
    const res = await axiosInstance.get('/auth/logout')

    dispatch(logoutUser())

    showSuccess('Logged out successfully')

    return res.data
  } catch (error) {
    const message = error.response?.data?.message || 'Logout failed'
    showError(message)

    throw new Error(message, { cause: error })
  }
}
const profileService = async dispatch => {
  try {
    const res = await axiosInstance.get('/auth/profile')

    const userData = res?.data?.data

    dispatch(setUserDetails(userData))

    return res.data
  } catch (error) {
    const message = error.response?.data?.message || 'Profile fetch failed'

    throw new Error(message, { cause: error })
  }
}
export { loginService, registerService, logoutService, profileService }
