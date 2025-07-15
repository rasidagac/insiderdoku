<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { onMounted, watch } from 'vue'
import { useGameCompletion } from '@/composables/useGameCompletion'
import { GameHeader, SudokuBoard, DigitPalette, GameSuccessModal } from '@/components/game'

const gameStore = useGameStore()
const { showGameSuccess } = useGameCompletion()

watch(
  () => gameStore.isGameComplete,
  (isComplete) => {
    if (isComplete) {
      showGameSuccess(gameStore.score, gameStore.formattedTime)
    }
  },
)

onMounted(() => {
  gameStore.startNewGame()
})
</script>

<template>
  <GameHeader />

  <SudokuBoard />

  <DigitPalette />

  <GameSuccessModal />
</template>
