import { BOARD_SIZE, TOTAL_CELLS, DIFFICULTY_CONFIGS } from './types'
import type { DifficultyLevel, SudokuPuzzle, SudokuBoard, NumberBoard } from './types'
import { shuffleArray, createEmptyBoard } from './utils'
import { solveSudoku } from './solver'

function generateSolution(): NumberBoard {
  const board = createEmptyBoard()

  if (!solveSudoku(board)) {
    throw new Error('Failed to generate valid Sudoku solution')
  }

  return board
}

export function generateSudokuBoard(difficulty: DifficultyLevel): SudokuPuzzle {
  const solutionBoard = generateSolution()
  const config = DIFFICULTY_CONFIGS[difficulty]

  const cellsToKeep =
    Math.floor(Math.random() * (config.maxCells - config.minCells + 1)) + config.minCells

  const puzzleBoard: SudokuBoard = solutionBoard.map((row, rowIndex) =>
    row.map((_, colIndex) => ({
      value: null,
      editable: true,
      erroredBy: new Set(),
      hintUsed: false,
      row: rowIndex,
      col: colIndex,
    })),
  )

  const allPositions = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
  const shuffledPositions = shuffleArray(allPositions)
  const positionsToKeep = shuffledPositions.slice(0, cellsToKeep)

  positionsToKeep.forEach((pos) => {
    const row = Math.floor(pos / BOARD_SIZE)
    const col = pos % BOARD_SIZE
    puzzleBoard[row][col] = {
      value: solutionBoard[row][col],
      editable: false,
      erroredBy: new Set(),
      hintUsed: false,
      row,
      col,
    }
  })

  const emptyCellsCount = TOTAL_CELLS - cellsToKeep

  return {
    puzzleBoard,
    solutionBoard,
    emptyCellsCount,
  }
}
