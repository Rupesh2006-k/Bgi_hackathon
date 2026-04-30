import mongoose from 'mongoose'

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
      enum: [
        'water',
        'garbage',
        'electricity',
        'road',
        'sanitization',
        'other'
      ],
      lowercase: true,
      trim: true
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
    }
  },
  {
    timestamps: true
  }
)

const ProblemModel = mongoose.model('Problem', problemSchema)

export default ProblemModel
