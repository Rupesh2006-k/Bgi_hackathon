import express from 'express'
import authRoute from './auth/auth.routes.js'

const routes = express.Router()

routes.use('/auth', authRoute)

export default routes
