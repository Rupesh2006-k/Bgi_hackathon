import mongoose from 'mongoose'
import { CATEGORY_CONFIG } from '../config/categoryConfig.js'

const CATEGORY_ENUM = [...Object.keys(CATEGORY_CONFIG), 'other']
const problemSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: [true, 'Problem is required'],
      trim: true,
      minlength: 5
    },

    area: {
      type: String,
      required: [true, 'Area is required'],
      trim: true,
      lowercase: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      enum: CATEGORY_ENUM,
      lowercase: true,
      trim: true,
      default: 'other'
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Invalid mobile number']
    },

    status: {
      type: String,
      enum: ['pending', 'resolved', 'rejected'],
      default: 'pending'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },

    adminRemark: {
      type: String,
      trim: true,
      default: ''
    },

    resolvedAt: {
      type: Date,
      default: null
    },

    rejectedAt: {
      type: Date,
      default: null
    },
    trackingId: {
      type: String,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
)

problemSchema.pre('save', function () {
  if (!this.trackingId) {
    this.trackingId = 'AGRV-' + Math.floor(100000 + Math.random() * 900000)
  }
})
const ProblemModel = mongoose.model('Problem', problemSchema)

export default ProblemModel
