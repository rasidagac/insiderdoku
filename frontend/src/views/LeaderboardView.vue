<script setup lang="ts">
import { onMounted } from 'vue'
import { LeaderboardHeader, LeaderboardEmpty, LeaderboardSection } from '@/components/leaderboard'
import { useLeaderboard } from '@/composables/useLeaderboard'
import { cn } from '@/lib/utils'
import { LoaderCircle, TriangleAlert } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { leaderboardMap, difficulties, isLoading, hasError, errorMessage, loadLeaderboard } =
  useLeaderboard()

const handleRefresh = async () => {
  await loadLeaderboard()
}

onMounted(async () => {
  await loadLeaderboard()
})
</script>

<template>
  <div class="p-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <LeaderboardHeader :on-refresh="handleRefresh" :loading="isLoading" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoaderCircle :class="cn('size-8 text-blue-600', isLoading && 'animate-spin')" />
        <span class="ml-3 text-gray-600">Loading leaderboard...</span>
      </div>

      <div v-else-if="hasError" class="text-center py-12">
        <div class="text-red-600 mb-4 flex flex-col items-center gap-2">
          <TriangleAlert class="size-10 text-red-600" />
          <p class="text-lg font-medium">Failed to load leaderboard</p>
          <p class="text-sm text-gray-500">{{ errorMessage }}</p>
        </div>
        <Button @click="handleRefresh">Try Again</Button>
      </div>

      <div v-else-if="difficulties.length > 0" class="space-y-8">
        <LeaderboardSection
          v-for="difficulty in difficulties"
          :key="difficulty"
          :difficulty="difficulty"
          :entries="leaderboardMap[difficulty]"
        />
      </div>

      <LeaderboardEmpty v-else />
    </div>
  </div>
</template>
