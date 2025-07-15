<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const isDev = import.meta.env.DEV

const gameStore = useGameStore()

const difficulty = computed(() => gameStore.difficulty)

const difficultyLabel = computed(() => {
  return difficulty.value.charAt(0).toUpperCase() + difficulty.value.slice(1)
})

const startNewGame = () => {
  gameStore.startNewGame()
}
</script>

<template>
  <div class="mb-6 max-w-2xl mx-auto bg-white">
    <div class="flex justify-between items-center mb-4">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Sudoku Game</h2>
        <p class="text-sm text-gray-600">Difficulty: {{ difficultyLabel }}</p>
      </div>
      <div class="text-right">
        <div class="text-2xl font-mono font-bold text-blue-600">
          {{ gameStore.formattedTime }}
        </div>
        <div class="text-sm text-red-600">Mistakes: {{ gameStore.mistakeCount }}</div>
      </div>
    </div>

    <div class="flex gap-2 justify-between">
      <div class="flex gap-2 items-center">
        <Select v-model="difficulty" class="w-32">
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Button @click="startNewGame" variant="outline" size="sm">New Game</Button>
        <!-- Test button for development -->
        <Button
          v-if="isDev"
          @click="gameStore.fillBoardWithSolution"
          variant="outline"
          size="sm"
          class="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
        >
          Test Complete
        </Button>
      </div>
      <Button
        @click="gameStore.useHint"
        variant="outline"
        size="sm"
        :disabled="gameStore.isGameComplete || gameStore.hintCount >= 10"
        class="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-300"
      >
        Hint ({{ 10 - gameStore.hintCount }}/10)
      </Button>
    </div>
  </div>
</template>
