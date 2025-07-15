import type { Router as ExpressRouter } from 'express'
import { Router } from 'express'
import { ScoresController } from '../controllers/scoresController'

const router: ExpressRouter = Router()

router.get('/', ScoresController.getScores)
router.post('/', ScoresController.createScore)

export { router as scoresRouter }
