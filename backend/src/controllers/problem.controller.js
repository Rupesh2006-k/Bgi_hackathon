// ahmedayan88232@gmail.com
// ayan16662

import ProblemModel from '../models/problem.model.js'
import {
  successResponse,
  createdResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  forbiddenResponse
} from '../utils/responseHandler.js'
import UserModel from '../models/user.model.js'
// CREATE problem
export const createProblemController = async (req, res) => {
  try {
    const { problem, area, mobile } = req.body

    if (!problem || !area || !mobile) {
      return badRequestResponse(res, 'Problem, area and mobile are required')
    }

    const newProblem = await ProblemModel.create({
      problem,
      area,
      mobile,
      createdBy: req.userId || null
    })

    return createdResponse(res, 'Problem created successfully', newProblem)
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}

// GET all problems
export const getAllProblemsController = async (req, res) => {
  try {
    const problems = await ProblemModel.find()
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ createdAt: -1 })

    return successResponse(res, 'Problems fetched successfully', problems)
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}

// UPDATE problem details
export const updateProblemController = async (req, res) => {
  try {
    const { id } = req.params
    const { problem, area, mobile } = req.body

    const updateData = {}

    if (problem !== undefined) updateData.problem = problem
    if (area !== undefined) updateData.area = area
    if (mobile !== undefined) updateData.mobile = mobile

    if (Object.keys(updateData).length === 0) {
      return badRequestResponse(res, 'No data to update')
    }

    const updatedProblem = await ProblemModel.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!updatedProblem) {
      return notFoundResponse(res, 'Problem not found')
    }

    return successResponse(res, 'Problem updated successfully', updatedProblem)
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}

// UPDATE problem status by admin
export const updateProblemStatusController = async (req, res) => {
  try {
    const { id } = req.params
    const { status, adminRemark } = req.body

    let user = await UserModel.findById(req?.userId)

    if (user.role !== 'admin') {
      return forbiddenResponse(res, 'Only admin can update problem status')
    }

    const allowedStatus = ['pending', 'resolved', 'rejected']

    if (!status) {
      return badRequestResponse(res, 'Status is required')
    }

    if (!allowedStatus.includes(status)) {
      return badRequestResponse(res, 'Invalid status')
    }

    const updateData = {
      status,
      updatedBy: req.userId,
      resolvedAt: null,
      rejectedAt: null
    }

    if (adminRemark !== undefined) {
      updateData.adminRemark = adminRemark
    }

    if (status === 'resolved') {
      updateData.resolvedAt = new Date()
    }

    if (status === 'rejected') {
      updateData.rejectedAt = new Date()
    }

    const updatedProblem = await ProblemModel.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')

    if (!updatedProblem) {
      return notFoundResponse(res, 'Problem not found')
    }

    return successResponse(
      res,
      'Problem status updated successfully',
      updatedProblem
    )
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}

// DELETE problem
export const deleteProblemController = async (req, res) => {
  try {
    const { id } = req.params

    const problem = await ProblemModel.findByIdAndDelete(id)

    if (!problem) {
      return notFoundResponse(res, 'Problem not found')
    }

    return successResponse(res, 'Problem deleted successfully', problem)
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}
// update priority and category
export const updatePriorityCategoryController = async (req, res) => {
  try {
    const { id } = req.params
    const { priority, category } = req.body

    const updateData = {}

    // allowed values (extra safety)
    const allowedPriority = ['low', 'medium', 'high']
    const allowedCategory = [
      'water',
      'garbage',
      'electricity',
      'road',
      'sanitization',
      'other'
    ]

    if (priority !== undefined) {
      if (!allowedPriority.includes(priority.toLowerCase())) {
        return badRequestResponse(res, 'Invalid priority')
      }
      updateData.priority = priority
    }

    if (category !== undefined) {
      if (!allowedCategory.includes(category.toLowerCase())) {
        return badRequestResponse(res, 'Invalid category')
      }
      updateData.category = category
    }

    if (Object.keys(updateData).length === 0) {
      return badRequestResponse(res, 'No data to update')
    }
    console.log(id)

    const updatedProblem = await ProblemModel.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!updatedProblem) {
      return notFoundResponse(res, 'Problem not found')
    }

    return successResponse(
      res,
      'Priority/Category updated successfully',
      updatedProblem
    )
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}

export const getDashboardStatsController = async (req, res) => {
  try {
    const [
      totalComplaints,
      pendingIssues,
      resolvedIssues,
      rejectedIssues,
      highPriorityIssues,
      categoryStats
    ] = await Promise.all([
      ProblemModel.countDocuments(),
      ProblemModel.countDocuments({ status: 'pending' }),
      ProblemModel.countDocuments({ status: 'resolved' }),
      ProblemModel.countDocuments({ status: 'rejected' }),
      ProblemModel.countDocuments({ priority: 'high' }),

      ProblemModel.aggregate([
        {
          $group: {
            _id: '$category',
            total: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            total: 1
          }
        },
        {
          $sort: { total: -1 }
        }
      ])
    ])

    return successResponse(res, 'Dashboard stats fetched successfully', {
      totalComplaints,
      pendingIssues,
      resolvedIssues,
      rejectedIssues,
      highPriorityIssues,
      categoryStats
    })
  } catch (error) {
    return serverErrorResponse(res, error.message)
  }
}
