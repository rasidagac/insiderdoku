import { defineStore } from 'pinia'
import { BOARD_SIZE, BOX_SIZE } from '@/lib/sudoku'
import type { SudokuBoard, SudokuPuzzle, DifficultyLevel, SudokuCell } from '@/lib/sudoku'
import { generateSudokuBoard, getBoxStart, getHint, validateAffectedCells } from '@/lib/sudoku'

interface GameState {
  username: string
  difficulty: DifficultyLevel
  board: SudokuBoard
  solution: number[][]
  isGameComplete: boolean
  score: number
  startTime: number | null
  currentTime: number
  hintCount: number
  mistakeCount: number
  remainingEmptyCellCount: number
  emptyCellCount: number
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    username: 'Player',
    difficulty: 'medium',
    board: [],
    solution: [],
    isGameComplete: false,
    score: 0,
    startTime: null,
    currentTime: 0,
    hintCount: 0,
    mistakeCount: 0,
    remainingEmptyCellCount: 0,
    emptyCellCount: 0,
  }),

  actions: {
    setUsername(username: string) {
      this.username = username
    },

    setDifficulty(difficulty: DifficultyLevel) {
      this.difficulty = difficulty
    },

    startNewGame() {
      const puzzle: SudokuPuzzle = generateSudokuBoard(this.difficulty)
      this.board = puzzle.puzzleBoard
      this.solution = puzzle.solutionBoard
      this.remainingEmptyCellCount = puzzle.emptyCellsCount
      this.emptyCellCount = puzzle.emptyCellsCount
      this.isGameComplete = false
      this.score = 0
      this.startTime = Date.now()
      this.currentTime = 0
      this.hintCount = 0
      this.mistakeCount = 0
    },

    updateCell(row: number, col: number, value: number | null) {
      const updatedCell = this.board[row][col]
      updatedCell.value = value
      updatedCell.erroredBy.clear()

      const affectedCells = this.findAffectedCells(row, col)

      const isValid = validateAffectedCells(affectedCells, updatedCell)

      if (!isValid) {
        this.mistakeCount++
      } else {
        if (updatedCell.value !== null) {
          this.remainingEmptyCellCount--
        } else {
          this.remainingEmptyCellCount++
        }
      }

      if (this.remainingEmptyCellCount === 0) {
        this.completeGame()
      }
    },

    findAffectedCells(row: number, col: number) {
      const affectedCells: SudokuCell[] = []

      // Row
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (i !== col && this.board[row][i].value !== null) {
          affectedCells.push(this.board[row][i])
        }
      }

      // Column
      for (let r = 0; r < BOARD_SIZE; r++) {
        if (r !== row && this.board[r][col].value !== null) {
          affectedCells.push(this.board[r][col])
        }
      }

      // 3x3 Box
      const { startRow, startCol } = getBoxStart(row, col)

      for (let r = startRow; r < startRow + BOX_SIZE; r++) {
        for (let c = startCol; c < startCol + BOX_SIZE; c++) {
          if (r !== row && c !== col && this.board[r][c].value !== null) {
            affectedCells.push(this.board[r][c])
          }
        }
      }

      return affectedCells
    },

    calculateScore() {
      this.score += 500 - this.currentTime

      this.score += this.emptyCellCount * 5

      if (this.mistakeCount > 0) {
        this.score -= this.mistakeCount
      }

      if (this.hintCount > 0) {
        const hintPenalty = -(3 + this.hintCount)
        this.score += hintPenalty
      }
    },

    useHint() {
      if (this.hintCount >= 10) {
        return null
      }

      const hint = getHint(this.board, this.solution)

      if (hint) {
        this.updateCellWithHint(hint.row, hint.col, hint.value)
        this.hintCount++
      }

      return hint
    },

    updateCellWithHint(row: number, col: number, value: number | null) {
      this.updateCell(row, col, value)

      this.board[row][col].hintUsed = true

      if (this.remainingEmptyCellCount === 0) {
        this.completeGame()
      }
    },

    completeGame() {
      if (this.isGameComplete) return

      this.calculateScore()

      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          this.board[row][col].editable = false
        }
      }

      this.isGameComplete = true
    },

    updateTimer() {
      if (this.startTime && !this.isGameComplete) {
        this.currentTime = Math.floor((Date.now() - this.startTime) / 1000)
      }
    },

    resetGame() {
      this.username = ''
      this.difficulty = 'medium'
      this.board = []
      this.solution = []
      this.isGameComplete = false
      this.score = 0
      this.startTime = null
      this.currentTime = 0
      this.hintCount = 0
      this.mistakeCount = 0
    },

    fillBoardWithSolution() {
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          if (this.board[row][col].editable && this.board[row][col].value === null) {
            this.updateCell(row, col, this.solution[row][col])
          }
        }
      }
    },
  },

  getters: {
    formattedTime: (state) => {
      const minutes = Math.floor(state.currentTime / 60)
      const seconds = state.currentTime % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
  },
})
