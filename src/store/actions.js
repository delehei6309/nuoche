/**
 * Created by chunting on 2017/5/23.
 */

'use strict';
const actions = {};
actions.changeName = ({commit}, name) => {
  commit('changeName', name)
};
actions.increment = ({commit}, num) => {
  commit('increment', num)
};
export default actions;