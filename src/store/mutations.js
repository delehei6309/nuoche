/**
 * Created by chunting on 2017/5/23.
 */
'use strict';
const mutations = {};
mutations.changeName = (state, name = '') => {
  state.username = name;
};
mutations.increment = (state, num = 1) => {
  state.count += num;
};
export default  mutations;