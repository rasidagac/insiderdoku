// Constants
export const BOARD_SIZE = 9
export const BOX_SIZE = 3
export const TOTAL_CELLS = BOARD_SIZE * BOARD_SIZE
export const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: { minCells: 36, maxCells: 40 },
  medium: { minCells: 32, maxCells: 36 },
  hard: { minCells: 28, maxCells: 32 },
  expert: { minCells: 24, maxCells: 28 },
} as const

// Types
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert'

export interface SudokuCell {
  value: number | null
  editable: boolean
  isCorrect?: boolean
  erroredBy: Set<`${number}-${number}`>
  hintUsed: boolean
  row: number
  col: number
}

export type SudokuBoard = SudokuCell[][]
export type NumberBoard = number[][]

export interface SudokuPuzzle {
  puzzleBoard: SudokuBoard
  solutionBoard: NumberBoard
  emptyCellsCount: number
}

export interface CellPosition {
  row: number
  col: number
}

export interface DifficultyConfig {
  minCells: number
  maxCells: number
}

// Leaderboard Types
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
