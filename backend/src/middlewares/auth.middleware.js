import jwt from 'jsonwebtoken'
import env from '../config/env.js'
import {
  serverErrorResponse,
  unauthorizedResponse
} from '../utils/responseHandler.js'

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ') &&
        req.headers.authorization.split(' ')[1])

    if (!token) {
      return unauthorizedResponse(res, 'Token not provided')
    }

    const decoded = jwt.verify(token, env.JWT_SECRET)

    req.userId = decoded._id
    req.userRole = decoded.role
    next()
  } catch (error) {
    console.error('Auth error:', error.message)
    return serverErrorResponse(res, error.message)
  }
}

export default authMiddleware
