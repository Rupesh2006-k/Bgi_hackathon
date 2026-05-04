// src/utils/axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + '/api/v1',
  withCredentials: true // important for cookies
})

export default axiosInstance
