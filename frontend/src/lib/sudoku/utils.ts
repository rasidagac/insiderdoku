import { BOARD_SIZE, BOX_SIZE } from './types'

export function shuffleArray(array: number[]): number[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function createEmptyBoard(): number[][] {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(0))
}

export function getBoxStart(row: number, col: number): { startRow: number; startCol: number } {
  return {
    startRow: Math.floor(row / BOX_SIZE) * BOX_SIZE,
    startCol: Math.floor(col / BOX_SIZE) * BOX_SIZE,
  }
}

export function positionToRowCol(pos: number): { row: number; col: number } {
  return {
    row: Math.floor(pos / BOARD_SIZE),
    col: pos % BOARD_SIZE,
  }
}
