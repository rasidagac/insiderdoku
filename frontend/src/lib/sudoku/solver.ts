import { BOARD_SIZE, DIGITS } from './types'
import type { CellPosition, NumberBoard } from './types'
import { shuffleArray } from './utils'
import { isValidMove } from './validator'

function findNextEmptyCell(board: NumberBoard): CellPosition | null {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        return { row, col }
      }
    }
  }
  return null
}

export function solveSudoku(board: NumberBoard): boolean | undefined {
  const emptyCell = findNextEmptyCell(board)

  if (!emptyCell) {
    return true
  }

  const { row, col } = emptyCell
  const shuffledDigits = shuffleArray([...DIGITS])

  for (const digit of shuffledDigits) {
    if (isValidMove(board, row, col, digit)) {
      board[row][col] = digit

      if (solveSudoku(board)) {
        return true
      }

      board[row][col] = 0
    }
  }
}
