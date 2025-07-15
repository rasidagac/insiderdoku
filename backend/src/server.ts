import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { scoresRouter } from './routes/scores'
import { initializeDatabase } from './lib/init-db'

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully')
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  })

app.use('/api/scores', scoresRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
