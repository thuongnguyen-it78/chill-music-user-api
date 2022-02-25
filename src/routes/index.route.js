import authRoute from './auth.route'
import userRoute from './user.route'
import permissionRoute from './permission.route'


function route(app) {
  app.use('/v1/auth', authRoute)
  app.use('/v1/users', userRoute)
  app.use('/v1/permission', permissionRoute)

}

export default route
