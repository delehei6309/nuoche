import Vue from 'vue';
import App from './App';
import router from './router';
import FastClick from 'fastclick';

import store from './store';
import {setTitle} from './tools/operation';
import 'flex.css/dist/flex.css';
import './less/base.less';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
router.beforeEach((to, from, next) => {
    console.log(12345);
    next();
});
router.afterEach((to, from) => {
    console.log(to);
    let {meta} = to;
    let {title} = meta;
    setTitle(title);
});
window.onload = () => {
    FastClick.attach(document.body);
}
