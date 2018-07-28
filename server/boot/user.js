module.exports = (app) => {
  app.models.User.afterRemote('login', (context, authToken, next) => {
    // const res = context.res
    // if (authToken !== null && authToken.id !== null) {
    //   res.cookie('authToken', authToken.id, { signed: true, maxAge: 300000 })
    //   res.cookie('userId', authToken.userId.toString(), { signed: true, maxAge: 300000 })
    // }

    return next()
  })

  app.models.User.afterRemote('logout', (context, result, next) => {
    // const res = context.res

    // res.clearCookie('authToken')
    // res.clearCookie('userId')

    return next()
  })
}
