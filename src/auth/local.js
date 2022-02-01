import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/user.model'
import { verifyPassword } from '../utils/auth'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username }).select('+password').lean()

        if (!user) {
          throw new Error('User is not found')
        }

        if (!(await verifyPassword(user.password, password))) {
          throw new Error('Password is not valid')
        }
        
        delete user.password
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)

export default passport
