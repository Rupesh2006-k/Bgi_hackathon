import express from 'express'
import cors from 'cors'
import routes from './routes/index.routes.js'
import cookieParser from 'cookie-parser'
import env from './config/env.js'
import morgan from 'morgan'
const app = express()

app.set('trust proxy', 1)
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', env.FRONTEND_URL], // ✅ dynamic
    credentials: true
  })
)

app.use(morgan('dev')) // ✅ logging middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Server is running 🚀')
})

// ✅ API routes
app.use('/api/v1', routes)

export default app
