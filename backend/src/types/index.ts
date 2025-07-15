export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert'

export interface ScoreEntry {
  id?: string
  username: string
  score: number
  time: string
  difficulty: DifficultyLevel
  date: string
  completedAt: string
}

export interface LeaderboardResponse {
  scores: ScoreEntry[]
  total: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
