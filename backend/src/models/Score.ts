import type { ScoreEntry } from '../types'
import { pool } from '../lib/db'

export class ScoreModel {
  static async getAll(): Promise<ScoreEntry[]> {
    try {
      const result = await pool.query('SELECT * FROM scores ORDER BY score DESC')
      return result.rows.map((row) => ({
        id: row.id.toString(),
        username: row.username,
        score: row.score,
        time: row.time,
        difficulty: row.difficulty,
        date: row.date.toISOString(),
        completedAt: row.completed_at.toISOString(),
      }))
    } catch (error) {
      console.error('Error fetching all scores:', error)
      throw error
    }
  }

  static async getByDifficulty(difficulty: string): Promise<ScoreEntry[]> {
    try {
      const result = await pool.query(
        'SELECT * FROM scores WHERE difficulty = $1 ORDER BY score DESC LIMIT 3',
        [difficulty],
      )
      return result.rows.map((row) => ({
        id: row.id.toString(),
        username: row.username,
        score: row.score,
        time: row.time,
        difficulty: row.difficulty,
        date: row.date.toISOString(),
        completedAt: row.completed_at.toISOString(),
      }))
    } catch (error) {
      console.error('Error fetching scores by difficulty:', error)
      throw error
    }
  }

  static async create(scoreData: Omit<ScoreEntry, 'id'>): Promise<ScoreEntry> {
    try {
      const result = await pool.query(
        `INSERT INTO scores (username, score, time, difficulty, date, completed_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          scoreData.username,
          scoreData.score,
          scoreData.time,
          scoreData.difficulty,
          new Date(scoreData.date),
          new Date(scoreData.completedAt),
        ],
      )

      const newScore = result.rows[0]
      return {
        id: newScore.id.toString(),
        username: newScore.username,
        score: newScore.score,
        time: newScore.time,
        difficulty: newScore.difficulty,
        date: newScore.date.toISOString(),
        completedAt: newScore.completed_at.toISOString(),
      }
    } catch (error) {
      console.error('Error creating score:', error)
      throw error
    }
  }
}
