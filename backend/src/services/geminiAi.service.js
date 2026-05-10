import { GoogleGenAI } from '@google/genai'
import env from '../config/env.js'

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
})

async function generateContentAi (prompt) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    })

    const result = response.candidates?.[0]?.content?.parts?.[0]?.text || ''
    return result
  } catch (error) {
    throw error
  }
}

export default generateContentAi
