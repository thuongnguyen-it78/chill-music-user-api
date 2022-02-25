import express from 'express'
const router = express.Router()
import PermissionController from '../controllers/permission.controller'

router.get('/', PermissionController.getAll)
router.get('/code/:id', PermissionController.getByCode)
router.get('/count', PermissionController.count)
router.get('/:id', PermissionController.getById)
router.post('/', PermissionController.create)
router.patch('/:id', PermissionController.update)
router.delete('/:id', PermissionController.delete)

export default router
