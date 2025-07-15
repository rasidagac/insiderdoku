<script setup lang="ts">
import { Crown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center py-12">
    <div class="max-w-md mx-auto">
      <div class="size-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Crown class="size-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Leaderboard Data</h3>
      <p class="text-gray-600 mb-6">Complete some games to see your scores on the leaderboard!</p>
      <Button to="/" variant="outline" :as="RouterLink">Start Playing</Button>
    </div>
  </div>
</template>
