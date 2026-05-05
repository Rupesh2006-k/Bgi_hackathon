import express from 'express'
import authRoute from './auth/auth.routes.js'
import problemRouter from './problem/problem.routes.js'
import detectRoute from './detect/detect.routes.js';

const routes = express.Router()

routes.use('/auth', authRoute)
routes.use('/problem',problemRouter)
routes.use('/complaint',detectRoute)

export default routes
