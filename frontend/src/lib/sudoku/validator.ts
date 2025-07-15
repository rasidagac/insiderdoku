import { BOARD_SIZE, BOX_SIZE } from './types'
import type { NumberBoard, SudokuCell } from './types'
import { getBoxStart } from './utils'

export function isValidMove(board: NumberBoard, row: number, col: number, num: number): boolean {
  for (let x = 0; x < BOARD_SIZE; x++) {
    if (board[row][x] === num || board[x][col] === num) return false
  }

  const { startRow, startCol } = getBoxStart(row, col)

  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (board[startRow + i][startCol + j] === num) return false
    }
  }

  return true
}

export function validateAffectedCells(affectedCells: SudokuCell[], cell: SudokuCell) {
  let isValid = true

  affectedCells.forEach((affectedCell) => {
    if (affectedCell.value === cell.value) {
      isValid = false
      cell.erroredBy.add(`${affectedCell.row}-${affectedCell.col}`)
      affectedCell.erroredBy.add(`${cell.row}-${cell.col}`)
    } else {
      cell.erroredBy.delete(`${affectedCell.row}-${affectedCell.col}`)
      affectedCell.erroredBy.delete(`${cell.row}-${cell.col}`)
    }
  })

  return isValid
}
