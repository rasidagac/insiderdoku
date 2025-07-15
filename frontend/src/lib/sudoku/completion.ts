import { BOARD_SIZE } from './types'
import type { SudokuBoard, NumberBoard, CellPosition } from './types'

export function findEmptyCells(board: SudokuBoard): CellPosition[] {
  const emptyCells: CellPosition[] = []

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col].value === null) {
        emptyCells.push({ row, col })
      }
    }
  }

  return emptyCells
}

export function getHint(
  board: SudokuBoard,
  solution: NumberBoard,
): { row: number; col: number; value: number } | null {
  const emptyCells = findEmptyCells(board)

  if (emptyCells.length === 0) {
    return null
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  const { row, col } = emptyCells[randomIndex]
  const correctValue = solution[row][col]

  return { row, col, value: correctValue }
}
