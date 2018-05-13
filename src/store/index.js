import Vue from 'vue';
import Vuex from 'vuex';
import spam from './modules/spam';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spam,
  },
});
