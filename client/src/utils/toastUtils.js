// src/utils/toast.js
import { toast, Bounce } from 'react-toastify'

const baseConfig = {
  position: 'top-right',
  autoClose: 1500,
  draggable: true,
  theme: 'dark',
  transition: Bounce
}

// ✅ Success Toast
export const showSuccess = message => {
  toast.success(message, baseConfig)
}

// ❌ Error Toast
export const showError = message => {
  toast.error(message, baseConfig)
}

// ℹ️ Info Toast (optional)
export const showInfo = message => {
  toast.info(message, baseConfig)
}

// ⚠️ Warning Toast (optional)
export const showWarning = message => {
  toast.warning(message, baseConfig)
}
