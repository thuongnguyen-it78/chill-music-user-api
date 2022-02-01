import createError from 'http-errors'
import shortid from 'shortid'
import User from '../models/user.model'
import { generateAccessToken } from '../utils'
import { sendNewPassword } from '../utils/mail'
import UserService from './user.service'

class AuthService {
  async logIn(user) {
    try {
      const token = generateAccessToken(user)
      return { token, user }
    } catch (error) {
      throw error
    }
  }

  async register(data) {
    try {
      if (await User.findOne({ email: data.email })) {
        throw createError.BadRequest('Email already exists')
      }

      const user = await UserService.create(data)
      const token = generateAccessToken(user)
      return { token, user }
    } catch (error) {
      throw error
    }
  }

  async forgottenPasswordS1(data) {
    try {
      const user = await User.findOne({ email: data.email })
      if (!user) {
        throw createError.BadRequest("Email doesn't exists")
      }

      const random = shortid.generate()
      await sendNewPassword(data.email, random)
      user.code = random
      await user.save()

      return true
    } catch (error) {
      throw error
    }
  }

  async forgottenPasswordS2(data) {
    try {
      const user = await User.findOne({ email: data.email })
      if (!user) {
        throw createError.BadRequest("Email doesn't exists")
      }

      if (user.code !== data.code) {
        throw createError.BadRequest('Code is invalid')
      }
      
      return true

    } catch (error) {
      throw error
    }
  }

  async forgottenPasswordS3(data) {
    try {
      const { email, code, password, rePassword } = data

      const user = await User.findOne({ email })
      if (!user) {
        throw createError.BadRequest("Email doesn't exists")
      }

      if (user.code !== code) {
        throw createError.BadRequest('Code is invalid')
      }

      if (password !== rePassword) {
        throw createError.BadRequest('Password must be the same with rePassword')
      }

      await UserService.update(user._id, { password, code: null })

      return true
    } catch (error) {
      throw error
    }
  }

  async changePassword(data) {
    const { email, password, rePassword } = data
    try {
      const user = await User.findOne({ email })
      if (!verifyPassword(user.password, password)) {
        throw createError.BadRequest('Current password is invalid')
      }

      if (password !== rePassword) {
        throw createError.BadRequest('Password must be the same with rePassword')
      }

      await UserService.update(user._id, { password })
      return true
    } catch (error) {
      throw error
    }
  }
}

export default new AuthService()
