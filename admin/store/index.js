import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const cookieparser = require('cookieparser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: false
    }
  })
}

export default createStore
