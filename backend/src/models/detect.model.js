import mongoose from 'mongoose'
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../config/categoryConfig.js'

// 🔥 Dynamic enums
const CATEGORY_ENUM = [...Object.keys(CATEGORY_CONFIG), 'other']
const PRIORITY_ENUM = Object.keys(PRIORITY_CONFIG)

const detectSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000
    },

    normalizedText: {
      type: String,
      default: '',
      index: true
    },

    category: {
      type: String,
      enum: CATEGORY_ENUM,
      default: 'other',
      index: true
    },

    priority: {
      type: String,
      enum: PRIORITY_ENUM,
      default: 'low',
      index: true
    }
  },
  { timestamps: true }
)

// 🔥 Pre-save hook (normalize + fallback safety)
detectSchema.pre('save', function () {
  // normalize text
  if (this.problem) {
    this.normalizedText = this.problem.toLowerCase().trim()
  }

  // ✅ category fallback
  if (!CATEGORY_ENUM.includes(this.category)) {
    this.category = 'other'
  }

  // ✅ priority fallback
  if (!PRIORITY_ENUM.includes(this.priority)) {
    this.priority = 'low'
  }
})

const DetectModel = mongoose.model('Detect', detectSchema)
export default DetectModel
