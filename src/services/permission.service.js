import Permission from '../models/permission.model'

class PermissionService {
  async getAll({ page = 1, limit = 20, q = '', isActive }) {
    page = Number.parseInt(page) - 1
    limit = Number.parseInt(limit)
    const query = q ? { name: new RegExp(q, 'i') } : {}
    try {
      if (isActive) query.isActive = isActive === 'false' ? false : true

      const data = await Permission.find(query)
        .skip(page * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()

      const count = await Permission.find(query).count()
      return { data, pagination: { page, limit, count } }
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      const result = await Permission.findById(id).lean()
      return result
    } catch (error) {
      throw error
    }
  }

  async getByCode(code) {
    try {
      const result = await Permission.findOne({ code }).lean()
      return result
    } catch (error) {
      throw error
    }
  }

  async count() {
    try {
      const data = await Permission.find({}).count()
      return data
    } catch (error) {
      throw error
    }
  }

  async create(data) {
    try {
      const result = await new Permission({
        ...data,
      }).save()
      return result
    } catch (error) {
      throw error
    }
  }

  async update(id, data) {
    try {
      const result = await Permission.findByIdAndUpdate(id, data, {
        new: true,
      })
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    try {
      const result = await Permission.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default new PermissionService()
