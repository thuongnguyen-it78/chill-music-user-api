import { OK } from '../constants/httpStatusCode.constant'
import { pluralResponse, singleResponse } from '../constants/response.constant'
import PermissionService from '../services/permission.service'

class PermissionController {
  async getAll(req, res, next) {
    try {
      const data = await PermissionService.getAll(req.query)
      return res.status(OK).json({ ...pluralResponse, ...data })
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    const id = req.params.id
    try {
      const data = await PermissionService.getById(id)
      return res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async getByCode(req, res, next) {
    const id = req.params.id
    try {
      const data = await PermissionService.getByCode(id)
      return res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async count(req, res, next) {
    try {
      const data = await PermissionService.count()
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await PermissionService.create(req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }


  async update(req, res, next) {
    const id = req.params.id
    try {
      const data = await PermissionService.update(id, req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const id = req.params.id
    try {
      const data = await PermissionService.delete(id)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }
}

export default new PermissionController()
