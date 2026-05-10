import express from 'express'
import { generateAiResponseController } from '../../controllers/ai.controller.js'

const aiRouter = express.Router()

aiRouter.post('/generate', generateAiResponseController)

export default aiRouter
