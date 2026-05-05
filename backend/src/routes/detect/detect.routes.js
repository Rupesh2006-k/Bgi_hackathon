import express from 'express'
import detectController from '../../controllers/detect.controller.js'
const detectRoute = express.Router()

detectRoute.post('/detect', detectController)

export default detectRoute
