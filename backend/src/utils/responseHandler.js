// success - 200
export const successResponse = (res, message = 'Success', data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data
  })
}
// created
export const createdResponse = (res, message = 'Created', data = null) => {
  return res.status(201).json({
    success: true,
    message,
    data
  })
}

// bad request - 400
export const badRequestResponse = (res, message = 'Bad Request') => {
  return res.status(400).json({
    success: false,
    message
  })
}

// unauthorized - 401
export const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    message
  })
}
// forbidden - 403
export const forbiddenResponse = (res, message = 'Forbidden') => {
  return res.status(403).json({
    success: false,
    message
  })
}
// not found
export const notFoundResponse = (res, message = 'Not Found') => {
  return res.status(404).json({
    success: false,
    message
  })
}
// conflict
export const conflictResponse = (res, message = 'Conflict') => {
  return res.status(409).json({
    success: false,
    message
  })
}
// server error - 500
export const serverErrorResponse = (res, error = 'Internal Server Error') => {
  return res.status(500).json({
    success: false,
    message: error
  })
}
