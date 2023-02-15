import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import bigScreen from './modules/big-screen';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bigScreen
  },
  getters
})

export default store
