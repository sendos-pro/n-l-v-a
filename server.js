const loopback = require('loopback')
const boot = require('loopback-boot')
const localtunnel = require('localtunnel')
const { restApiRoot, host, apiPort } = require('./config')

/* Set API */
const app = loopback()

/* Build Loopback */
boot(app, 'server')

app.use(loopback.token({
    model: 'AccessToken'
}))

app.middleware('auth', loopback.token({
    currentUserLiteral: 'data'
}))

app.enableAuth()

app.use(restApiRoot, app.loopback.rest())

/* Build DEV environment */
if (process.env.NODE_ENV == 'development') {
    // FINISH and START other
    // let optsTunnel = {
    //     subdomain: 'api-' + process.env.npm_package_name
    // }

    // const tunnel = localtunnel(apiPort, optsTunnel, function (err, tunnel) {
    //     if (err) console.log(err)
    //     console.log(`Server REST API at %s\n`, `http://${host}:${apiPort}${restApiRoot}`)
    //     console.log('Vizual your REST API at %s\n', `http://${host}:${apiPort}/visual`)
    //     console.log('Explore your REST API at %s\n', `http://${host}:${apiPort}/explorer`)
    //     console.log('Public your APP at %s\n', tunnel.url)
    // })
}

/* Listen to the app */
app.listen(apiPort, host)
