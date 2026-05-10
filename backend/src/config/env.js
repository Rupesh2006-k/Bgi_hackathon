import dotenv from 'dotenv'

dotenv.config()

const requireEnv = key => {
  const value = process.env[key]

  if (!value) {
    console.error(`❌ Missing ENV variable: ${key}`)
    process.exit(1)
  }

  return value
}

const env = {
  PORT: requireEnv('PORT'),
  MONGO_URI: requireEnv('MONGO_URI'),
  JWT_SECRET: requireEnv('JWT_SECRET'),
  FRONTEND_URL: requireEnv('FRONTEND_URL'),
  GEMINI_API_KEY: requireEnv('GEMINI_API_KEY')
}
console.log('✅ All environment variables loaded successfully')
export default env
