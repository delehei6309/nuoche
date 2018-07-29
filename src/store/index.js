/**
 * Created by chunting on 2017/5/23.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import actions from './actions';
import mutations from './mutations';
import state from './state';
const store = new Vuex.Store({
  state,
  mutations,
  actions
});
export  default store;
