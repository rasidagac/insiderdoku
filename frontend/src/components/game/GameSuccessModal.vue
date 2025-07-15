<script setup lang="ts">
import { useGameCompletion } from '@/composables/useGameCompletion'
import { useGameStore } from '@/stores/game'
import { useLeaderboard } from '@/composables/useLeaderboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ref } from 'vue'

const { showSuccessModal, finalScore, finalTime, hideSuccessModal } = useGameCompletion()
const gameStore = useGameStore()
const { addScore } = useLeaderboard()

const username = ref('')
const isSubmitting = ref(false)

const saveScore = async () => {
  isSubmitting.value = true

  try {
    await addScore({
      username: username.value,
      difficulty: gameStore.difficulty,
      score: finalScore.value,
      time: finalTime.value,
      date: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    })

    hideSuccessModal()
  } catch (error) {
    console.error('Error saving score:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Dialog :open="showSuccessModal" @update:open="hideSuccessModal">
    <DialogContent
      class="sm:max-w-md"
      @escape-key-down="(event) => event.preventDefault()"
      @interact-outside="(event) => event.preventDefault()"
    >
      <DialogHeader>
        <DialogTitle class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4"
          >
            <svg
              class="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          Congratulations!
        </DialogTitle>
        <DialogDescription class="text-center">
          You've completed the Sudoku puzzle!
        </DialogDescription>
      </DialogHeader>

      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ finalScore }}</div>
            <div class="text-sm text-gray-500">Final Score</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ finalTime }}</div>
            <div class="text-sm text-gray-500">Time</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
            Enter your name for the leaderboard:
          </label>
          <Input
            id="username"
            v-model="username"
            placeholder="Your name"
            class="w-full"
            :disabled="isSubmitting"
            @keyup.enter="saveScore"
          />
        </div>

        <div class="flex gap-3">
          <Button
            @click="hideSuccessModal"
            variant="outline"
            class="flex-1"
            :disabled="isSubmitting"
          >
            Continue Playing
          </Button>
          <Button @click="saveScore" class="flex-1" :disabled="isSubmitting || !username.trim()">
            {{ isSubmitting ? 'Saving...' : 'Save Score' }}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
