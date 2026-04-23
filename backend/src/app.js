import express from 'express'
import cors from 'cors'
import routes from './routes/index.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

// middlewares
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// test route
app.get('/', (req, res) => {
  res.send('Server is running...')
})

app.use('/api/v1', routes)

export default app
