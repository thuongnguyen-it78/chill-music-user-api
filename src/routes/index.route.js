import authRoute from './auth.route'
import userRoute from './user.route'

function route(app) {
  app.use('/v1/auth', authRoute)
  app.use('/v1/users', userRoute)
}

export default route
