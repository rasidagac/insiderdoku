<script setup lang="ts">
import { cn } from '@/lib/utils'
import { RefreshCcw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

interface Props {
  onRefresh?: () => void
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="mb-8 flex justify-between items-start">
    <div>
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
      <p class="text-gray-600">Top players across all difficulty levels</p>
    </div>

    <Button
      v-if="onRefresh"
      @click="onRefresh"
      :disabled="loading"
      class="flex items-center gap-2"
      variant="outline"
    >
      <RefreshCcw :class="cn('size-4', loading && 'animate-spin')" />
      {{ loading ? 'Refreshing...' : 'Refresh' }}
    </Button>
  </div>
</template>
