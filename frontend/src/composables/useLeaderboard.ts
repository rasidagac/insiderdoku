import type {
  DifficultyLevel,
  ScoreEntry,
  ApiResponse,
  LeaderboardResponse,
} from '@/lib/sudoku/types'
import { computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useLeaderboard() {
  const url = ref(`${API_BASE_URL}/api/scores`)

  const { data, error, isFetching, execute } = useFetch(url, {
    immediate: false,
  }).json<ApiResponse<LeaderboardResponse>>()

  const leaderboard = computed(() => data.value?.data?.scores || [])
  const isLoading = computed(() => isFetching.value)
  const hasError = computed(() => !!error.value)
  const errorMessage = computed(() => error.value?.message || 'Failed to fetch leaderboard')

  const leaderboardMap = computed(() => {
    const scoresByDifficulty = leaderboard.value.reduce(
      (acc, item) => {
        acc[item.difficulty] = acc[item.difficulty] || []
        acc[item.difficulty].push(item)
        return acc
      },
      {} as Record<DifficultyLevel, ScoreEntry[]>,
    )

    return Object.keys(scoresByDifficulty).reduce(
      (acc, difficulty) => {
        const difficultyKey = difficulty as DifficultyLevel
        acc[difficultyKey] = scoresByDifficulty[difficultyKey]
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
        return acc
      },
      {} as Record<DifficultyLevel, ScoreEntry[]>,
    )
  })

  const difficulties = computed(() => {
    return Object.keys(leaderboardMap.value) as DifficultyLevel[]
  })

  const hasScores = computed(() => leaderboard.value.length > 0)

  const loadLeaderboard = async (difficulty?: DifficultyLevel) => {
    const newUrl = difficulty
      ? `${API_BASE_URL}/api/scores?difficulty=${difficulty}`
      : `${API_BASE_URL}/api/scores`

    url.value = newUrl
    await execute()
  }

  const addScore = async (scoreData: Omit<ScoreEntry, 'id'>) => {
    const { data: responseData, error: responseError } = await useFetch<ApiResponse<ScoreEntry>>(
      `${API_BASE_URL}/api/scores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      },
    ).json<ApiResponse<ScoreEntry>>()

    if (responseError.value) {
      throw new Error(responseError.value.message || 'Failed to add score')
    }

    if (responseData.value?.success && responseData.value.data) {
      await loadLeaderboard()
      return responseData.value.data
    } else {
      throw new Error(responseData.value?.error || 'Failed to add score')
    }
  }

  return {
    leaderboard,
    leaderboardMap,
    difficulties,
    hasScores,

    isLoading,
    hasError,
    errorMessage,

    loadLeaderboard,
    addScore,
  }
}
