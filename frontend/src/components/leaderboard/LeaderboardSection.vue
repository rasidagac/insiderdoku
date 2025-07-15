<script setup lang="ts">
import type { DifficultyLevel } from '@/lib/sudoku'
import { DIFFICULTY_LABELS } from '@/lib/sudoku'
import LeaderboardTable from './LeaderboardTable.vue'

interface LeaderboardEntry {
  username: string
  score: number
  time: string
  difficulty: string
}

interface Props {
  difficulty: DifficultyLevel
  entries: LeaderboardEntry[]
}

defineProps<Props>()

const getDifficultyColor = (difficulty: DifficultyLevel) => {
  const colors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-orange-600 bg-orange-100',
    expert: 'text-red-600 bg-red-100',
  }
  return colors[difficulty]
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold text-gray-900">
          {{ DIFFICULTY_LABELS[difficulty] }}
        </h2>
        <span
          :class="['px-3 py-1 rounded-full text-sm font-medium', getDifficultyColor(difficulty)]"
        >
          {{ entries.length }} entries
        </span>
      </div>
    </div>

    <LeaderboardTable :entries="entries" />
  </div>
</template>
