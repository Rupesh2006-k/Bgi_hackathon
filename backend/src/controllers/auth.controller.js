import UserModel from '../models/user.model.js'
import env from '../config/env.js'
import generateToken from '../utils/generateToken.js'
import {
  badRequestResponse,
  conflictResponse,
  createdResponse,
  forbiddenResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse
} from '../utils/responseHandler.js'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
}

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return badRequestResponse(res, 'All fields are required')
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return conflictResponse(res, 'User already exists')
    }

    const user = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    })

    const token = generateToken({
      userId: user._id,
      secret: env.JWT_SECRET,
      exTime: '1d'
    })

    res.cookie('token', token, cookieOptions)

    return createdResponse(res, 'User registered successfully', user)
  } catch (error) {
    console.error('register error:', error)

    return serverErrorResponse(res, error.message)
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return badRequestResponse(res, 'All fields are required')
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim()
    }).select('+password')

    if (!user) {
      return unauthorizedResponse(res, 'Invalid credentials')
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return unauthorizedResponse(res, 'Invalid credentials')
    }

    const token = generateToken({
      userId: user._id,
      secret: env.JWT_SECRET,
      exTime: '1d'
    })

    res.cookie('token', token, cookieOptions)

    return successResponse(res, 'Login Successful', user)
  } catch (error) {
    console.error('login error:', error)

    return serverErrorResponse(res, error.message)
  }
}

export const logoutController = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict'
    })
    return successResponse(res, 'User logged out successfully')
  } catch (error) {
    console.error('logout error:', error)
    return serverErrorResponse(res, error.message)
  }
}

export const profileController = async (req, res) => {
  try {
    if (!req.userId) {
      return notFoundResponse(res, 'Unauthorized')
    }
    const user = await UserModel.findById(req.userId).select('-password')
    if (!user) {
      return notFoundResponse(res, 'User not found')
    }
    return successResponse(res, 'Current user Profile', user)
  } catch (error) {
    console.error('Profile Error:', error)
    return serverErrorResponse(res, error.message)
  }
}

export const updateDetailsController = async (req, res) => {
  try {
    const userId = req.userId
    const { mobile, address, role, name } = req.body

    const updateData = {}

    if (name !== undefined) updateData.name = name
    if (mobile !== undefined) updateData.mobile = mobile
    if (address !== undefined) updateData.address = address

    if (role !== undefined) {
      if (req.userRole !== 'admin') {
        return forbiddenResponse(res, 'Not allowed to update role')
      }
      updateData.role = role
    }

    if (Object.keys(updateData).length === 0) {
      return badRequestResponse(res, 'No data to update')
    }

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {
      returnDocument: 'after',
      runValidators: true
    })

    if (!user) {
      return notFoundResponse(res, 'User not found')
    }

    return successResponse(res, 'User updated successfully', user)
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}
