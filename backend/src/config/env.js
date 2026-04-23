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
  JWT_SECRET: requireEnv('JWT_SECRET')
}

export default env
