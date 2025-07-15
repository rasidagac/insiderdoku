import { ref } from 'vue'
import confetti from 'canvas-confetti'

const showSuccessModal = ref(false)
const finalScore = ref(0)
const finalTime = ref('')

export function useGameCompletion() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const showGameSuccess = (score: number, time: string) => {
    finalScore.value = score
    finalTime.value = time
    showSuccessModal.value = true

    triggerConfetti()
  }

  const hideSuccessModal = () => {
    showSuccessModal.value = false
  }

  return {
    showSuccessModal,
    finalScore,
    finalTime,
    showGameSuccess,
    hideSuccessModal,
    triggerConfetti,
  }
}
