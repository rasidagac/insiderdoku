<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { BOARD_SIZE } from '@/lib/sudoku'

const gameStore = useGameStore()

const digitCounts = computed(() => {
  const counts = Array(10).fill(0)
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const value = gameStore.board[row]?.[col]?.value
      if (value && value >= 1 && value <= 9) {
        counts[value]++
      }
    }
  }
  return counts
})
</script>

<template>
  <div class="flex flex-col mt-4 text-center max-w-2xl mx-auto">
    <div class="text-lg font-bold mb-2">Available digits</div>
    <div class="flex justify-center gap-2">
      <div
        v-for="digit in 9"
        :key="digit"
        class="size-10 select-none rounded-full text-lg font-bold border border-gray-300 flex items-center justify-center transition-colors duration-150"
        :class="
          digitCounts[digit] === 9
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-blue-100 text-blue-700'
        "
      >
        {{ digit }}
      </div>
    </div>
  </div>
</template>
