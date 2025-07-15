<script setup lang="ts">
interface LeaderboardEntry {
  username: string
  score: number
  time: string
  difficulty: string
}

interface Props {
  entries: LeaderboardEntry[]
}

defineProps<Props>()

const formatTime = (time: string) => {
  return time
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Rank
          </th>
          <th
            class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Player
          </th>
          <th
            class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Score
          </th>
          <th
            class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Time
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(item, index) in entries"
          :key="`${item.username}-${index}`"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <span v-if="index === 0" class="text-2xl mr-2"> 🥇 </span>
              <span v-else-if="index === 1" class="text-2xl mr-2"> 🥈 </span>
              <span v-else-if="index === 2" class="text-2xl mr-2"> 🥉 </span>
              <span
                v-else
                class="size-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 mr-2"
              >
                {{ index + 1 }}
              </span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="size-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span class="text-sm font-medium text-blue-600">
                  {{ item.username.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ item.username }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-900">
              {{ item.score.toLocaleString() }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-500">
              {{ formatTime(item.time) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
