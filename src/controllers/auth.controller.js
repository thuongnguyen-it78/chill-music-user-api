import { OK } from '../constants/httpStatusCode.constant'
import { singleResponse } from '../constants/response.constant'
import AuthService from '../services/auth.service'

class AuthController {
  async logIn(req, res, next) {
    try {
      const data = await AuthService.logIn(req.user)
      res.status(OK).json({
        ...singleResponse,
        data,
      })
    } catch (error) {
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      const data = await AuthService.register(req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async forgottenPasswordS1(req, res, next) {
    try {
      const data = await AuthService.forgottenPasswordS1(req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async forgottenPasswordS2(req, res, next) {
    try {
      const data = await AuthService.forgottenPasswordS2(req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async forgottenPasswordS3(req, res, next) {
    try {
      const data = await AuthService.forgottenPasswordS3(req.body)
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = await AuthService.changePassword({ ...req.body, user: req.user })
      res.status(OK).json({ ...singleResponse, data })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
