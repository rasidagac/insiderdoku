import { Pool } from 'pg'

export const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'insiderdoku',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'insiderdoku',
})

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('Database connection error:', err)
})
