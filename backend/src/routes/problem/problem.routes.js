import express from 'express'
import {
  createProblemController,
  getAllProblemsController,
  updateProblemController,
  updateProblemStatusController,
  deleteProblemController,
  updatePriorityCategoryController,
  getDashboardStatsController
} from '../../controllers/problem.controller.js'
import authMiddleware from '../../middlewares/auth.middleware.js'

const problemRouter = express.Router()

problemRouter.post('/create', authMiddleware, createProblemController)
problemRouter.get('/all', getAllProblemsController)

problemRouter.put('/update', authMiddleware, updateProblemController)
problemRouter.patch('/status', authMiddleware, updateProblemStatusController)
problemRouter.delete('/delete', authMiddleware, deleteProblemController)

problemRouter.patch(
  '/update-priority-category',
  authMiddleware,
  updatePriorityCategoryController
)

problemRouter.get('/states', getDashboardStatsController)
export default problemRouter
