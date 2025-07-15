import type { Request, Response } from 'express'
import type { ScoreEntry, ApiResponse, LeaderboardResponse, DifficultyLevel } from '../types'
import { ScoreModel } from '../models/Score'

export class ScoresController {
  static async getScores(req: Request, res: Response) {
    try {
      const { difficulty } = req.query

      if (difficulty) {
        const scores = await ScoreModel.getByDifficulty(difficulty as DifficultyLevel)
        const response: ApiResponse<LeaderboardResponse> = {
          success: true,
          data: {
            scores,
            total: scores.length,
          },
        }
        return res.json(response)
      }

      const scores = await ScoreModel.getAll()
      const response: ApiResponse<LeaderboardResponse> = {
        success: true,
        data: {
          scores,
          total: scores.length,
        },
      }
      return res.json(response)
    } catch {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to fetch scores',
      }
      return res.status(500).json(response)
    }
  }

  static async createScore(req: Request, res: Response) {
    try {
      const scoreData = req.body as Omit<ScoreEntry, 'id'>
      const newScore = await ScoreModel.create(scoreData)

      const response: ApiResponse<ScoreEntry> = {
        success: true,
        data: newScore,
      }
      return res.status(201).json(response)
    } catch {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Failed to create score',
      }
      return res.status(500).json(response)
    }
  }
}
