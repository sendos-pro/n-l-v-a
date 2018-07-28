const { restApiRoot, apiPort, host } = require('./config')

module.exports = {
  mode: 'spa',
  router: {
    mode: 'history'
  },
  head: {
    title: 'ADMIN',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Nuxt + Loopback + Vuetify + Auth' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // loading: {
  //   color: 'green',
  //   height: '4px',
  //   failedColor: 'red',
  //   duration: 100
  // },
  loadIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  css: [
  {
    src: '~/assets/css/app.styl',
    lang: 'styl'
  }
  ],
  router: {
    middleware: ['auth']
  },
  srcDir: 'admin',
  plugins: [
  '~/plugins/vuetify',
  '~/plugins/cordova'
  ],
  modules: [
  '@nuxtjs/onesignal',
  '@nuxtjs/axios',
  '@nuxtjs/auth'
  ],
  oneSignal: {
    cdn: true,
    importScripts: false,
    GcmSenderId: false,
    init: {
      appId: '7c19a214-438d-490a-ac6b-51809f534131',
      allowLocalhostAsSecureOrigin: true,
      autoRegister: true,
      notifyButton: {
        enable: false
      }
    }
  },
  axios: {
    baseURL: `http://${host}:${apiPort}${restApiRoot}`,
    browserBaseURL: `http://${host}:${apiPort}${restApiRoot}`
  },
  auth: {
    resetOnError: true,
    watchLoggedIn: true,
    // plugins: [ '~/plugins/auth.js' ],
    token: {
      prefix: '_token.'
    },
    refresh_token: {
      prefix: '_refresh_token.'
    },
    localStorage: {
      prefix: 'auth.'
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/'
      }
    },
    redirect: {
      login: '/login', // не авторизован
      logout: '/login', // после выхода
      callback: '/callback', // коллбэк хззачем
      // home: '/', // куда после автризации
      user: '/' // походу редирект после получения strategies/local/user
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'User/login', method: 'post', propertyName: 'id' },
          logout: { url: 'User/logout', method: 'post' },
          user: { url: 'User/data', method: 'get', propertyName: 'email' } // Если нужно получить еще данные сразу после или выкл false
        },
        tokenType: false // Bearer, Basic or false
      }
    }
  },
  generate: {
    dir: 'www'
  },
  build: {
    vendor: [
    'vuetify',
    'vue-cordova'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isClient && !ctx.isDev) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
