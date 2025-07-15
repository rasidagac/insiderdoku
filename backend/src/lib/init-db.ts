import { pool } from './db'
import fs from 'fs'
import path from 'path'

export async function initializeDatabase() {
  try {
    const schemaPath = path.join(__dirname, './db/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    await pool.query(schema)
    console.log('Database schema initialized')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}
