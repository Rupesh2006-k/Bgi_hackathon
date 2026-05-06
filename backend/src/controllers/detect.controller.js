import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '../config/categoryConfig.js'
import DetectModel from '../models/detect.model.js'

const normalizeText = text => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const escapeRegex = text => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const hasKeyword = (text, keyword) => {
  const cleanKeyword = normalizeText(keyword)

  const pattern = new RegExp(`(^|\\s)${escapeRegex(cleanKeyword)}(\\s|$)`, 'i')

  return pattern.test(text)
}

const detectController = async (req, res) => {
  try {
    const { problem } = req.body

    if (!problem?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Problem is required'
      })
    }

    const text = normalizeText(problem)

    let detectedCategory = 'other'
    let detectedPriority = 'low'

    // ✅ CATEGORY DETECTION
    for (const [category, keywords] of Object.entries(CATEGORY_CONFIG)) {
      const match = keywords.some(word => hasKeyword(text, word))

      if (match) {
        detectedCategory = category
        break
      }
    }

    // ✅ PRIORITY DETECTION
    for (const [priority, keywords] of Object.entries(PRIORITY_CONFIG)) {
      const match = keywords.some(word => hasKeyword(text, word))

      if (match) {
        detectedPriority = priority
        break
      }
    }

    const detect = await DetectModel.create({
      problem:  problem.trim(),
      category: detectedCategory,
      priority: detectedPriority
    })

    return res.status(201).json({
      success: true,
      message: 'Detected successfully',
      data: detect
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export default detectController
