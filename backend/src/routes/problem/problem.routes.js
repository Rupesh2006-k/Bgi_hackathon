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

problemRouter.put('/update/:id', authMiddleware, updateProblemController)
problemRouter.patch(
  '/status/:id',
  authMiddleware,
  updateProblemStatusController
)
problemRouter.delete('/delete/:id', authMiddleware, deleteProblemController)

problemRouter.patch(
  '/update-priority-category/:id',
  authMiddleware,
  updatePriorityCategoryController
)

problemRouter.get('/stats', getDashboardStatsController)
export default problemRouter
