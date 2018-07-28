const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const localtunnel = require('localtunnel')

const { host } = require('./config')
const port = process.env.PORT || 3001

const config = require('./nuxt.config')

/* Build Nuxt */
config.dev = !(process.env.NODE_ENV === 'production')
config.analyze = config.dev

const app = express()
app.disable('x-powered-by')

const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
    let optsTunnel = {
        subdomain:  'admin-' + process.env.npm_package_name
    }

    new Builder(nuxt).build()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

    nuxt.hook('build:done', (builder) => {
        const tunnel = localtunnel(port, optsTunnel, function (err, tunnel) {
            if (err) console.log(err)
            console.log(`Local your APP at %s\n`, `${host}:${port}`)
            console.log('Public your APP at %s\n', tunnel.url)
        })
    })
}

app.use(nuxt.render)

// Listen the server
app.listen(port, host)
