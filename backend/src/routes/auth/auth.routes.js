import express from 'express'
import {
  registerController,
  loginController,
  logoutController,
  profileController,
  updateDetailsController
} from '../../controllers/auth.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'
import {
  loginValidator,
  registerValidator
} from '../../validators/auth.validator.js'
const authRoute = express.Router()

authRoute.post('/register', registerValidator, registerController)
authRoute.post('/login', loginValidator, loginController)
authRoute.get('/logout', authMiddleware, logoutController)
authRoute.get('/profile', authMiddleware, profileController)
authRoute.put('/update-details', authMiddleware, updateDetailsController)

export default authRoute
