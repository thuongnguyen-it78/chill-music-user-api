import User from '../models/user.model'
import { toDate, encodePassword } from '../utils'

class UserService {
  async getAll({ page = 1, limit = 20, q = '', role, email, isActive, gender }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { fullName: new RegExp(q, 'i') } : {}
    try {
      if (role) query.role = Number(role)
      if (email) query.email = email.trim()
      if (isActive) query.isActive = isActive === 'false' ? false : true
      if (gender) query.gender = Number(gender)


      const data = await User.find(query)
        .skip(page * limit)
        .limit(limit)
        .lean()
      const count = await User.find(query).count()
      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await User.findById(id).lean()
      return result
    } catch (error) {
      throw error
    }
  }

  async count() {
    try {
      const data = await User.find({}).count()
      return data
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      data.dateOfBirth = toDate(data.dateOfBirth)
      data.password = await encodePassword(data.password)

      const result = await new User({
        ...data,
      }).save()
      delete result._doc.password
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      if (data.dateOfBirth) {
        data.dateOfBirth = toDate(data.dateOfBirth)
      }

      if (data.password) {
        data.password = await encodePassword(data.password)
      }

      const result = await User.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await User.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }

  async deleteSoft(id) {
    try {
      const result = await User.findById(id)
      result.isDelete = 1
      await result.save()
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
