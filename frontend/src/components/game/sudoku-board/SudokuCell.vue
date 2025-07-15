<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

interface Props {
  row: number
  col: number
}

const props = defineProps<Props>()
const gameStore = useGameStore()

const cell = computed(() => gameStore.board[props.row]?.[props.col])

const value = computed({
  get: () => cell.value?.value || '',
  set: (newValue: string) => {
    const numValue = newValue === '' ? null : parseInt(newValue)
    gameStore.updateCell(props.row, props.col, numValue)
  },
})

const isEditable = computed(() => cell.value?.editable || false)
const isError = computed(() => cell.value?.erroredBy.size > 0 || false)

const cellClass = computed(() => {
  const baseClass =
    'size-12 p-0 text-center font-bold text-lg focus:outline-none disabled:cursor-not-allowed focus:shadow-sm transition-all duration-200 ease-in-out'

  if (!isEditable.value) {
    return `${baseClass} bg-gray-100 text-gray-700 cursor-not-allowed`
  }

  if (isError.value) {
    return `${baseClass} bg-red-100 text-red-700 border-red-500`
  }

  return `${baseClass} bg-white hover:bg-gray-50 focus:bg-blue-100`
})

const handleKeydown = (event: KeyboardEvent) => {
  if (
    ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(
      event.key,
    )
  ) {
    return
  }

  if (!/^[1-9]$/.test(event.key)) {
    event.preventDefault()
  }
}
</script>

<template>
  <input
    type="text"
    v-model="value"
    :class="cellClass"
    :disabled="!isEditable"
    @keydown="handleKeydown"
    maxlength="1"
    inputmode="numeric"
  />
</template>
