import generateContentAi from '../services/geminiAi.service.js'

export const generateAiResponseController = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      })
    }

    const result = await generateContentAi(prompt)

    return res.status(200).json({
      success: true,
      message: 'AI response generated successfully',
      data: result
    })
  } catch (error) {
    console.error('AI Controller Error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI response',
      error: error.message
    })
  }
}
