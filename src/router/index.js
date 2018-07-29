import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Base = resolve => require(['../containers/Base'], resolve);
const Tabs = resolve => require(['../containers/Tabs'], resolve);
let routes = [
    {
        path: '/base',
        name: 'base',
        meta: {
            title: '首页'
        },
        component: Base
    },{
        path: '/tabs',
        name: 'tabs',
        meta: {
            title: 'tab'
        },
        component: Tabs
    }
];
routes.push({
    path: '*',
    redirect: '/base'
});
export default new Router({
    mode: 'history',
    routes
})
