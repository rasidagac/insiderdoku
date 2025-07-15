<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import SudokuCell from './SudokuCell.vue'
import { useGameStore } from '@/stores/game'
import { BOARD_SIZE } from '@/lib/sudoku'

const gameStore = useGameStore()

let timerInterval: number | null = null

onMounted(() => {
  if (gameStore.board.length === 0) {
    gameStore.startNewGame()
  }

  timerInterval = setInterval(() => {
    if (!gameStore.isGameComplete) {
      gameStore.updateTimer()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

const getCellClass = (row: number, col: number) => {
  const baseClass = 'border border-gray-300'

  const isRightBorder = col === 2 || col === 5
  const isBottomBorder = row === 2 || row === 5

  let borderClass = baseClass
  if (isRightBorder) borderClass += ' border-r-2 border-r-gray-400'
  if (isBottomBorder) borderClass += ' border-b-2 border-b-gray-400'

  return borderClass
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-lg p-6 flex justify-center items-center">
      <div class="inline-grid grid-cols-9 gap-0">
        <template v-for="row in BOARD_SIZE" :key="row">
          <SudokuCell
            v-for="col in BOARD_SIZE"
            :key="`${row}-${col}`"
            :row="row - 1"
            :col="col - 1"
            :class="getCellClass(row - 1, col - 1)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
