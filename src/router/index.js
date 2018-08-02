import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Base = resolve => require(['../containers/Base'], resolve);
const Tabs = resolve => require(['../containers/Tabs'], resolve);
const Home = resolve => require(['../containers/Home'], resolve);
const Shop = resolve => require(['../containers/Shop'], resolve);
const ShopDetail = resolve => require(['../containers/ShopDetail'], resolve);
const Find = resolve => require(['../containers/Find'], resolve);
const Person = resolve => require(['../containers/Person'], resolve);
const BindingVehicle = resolve => require(['../containers/BindingVehicle'], resolve);
const BindingCode = resolve => require(['../containers/BindingVehicle'], resolve);
const NuocheInform = resolve => require(['../containers/NuocheInform'], resolve);
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
            title: 'tabs'
        },
        redirect:'/tabs/home',
        component: Tabs,
        children:[
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: Home
            },{
                path: 'shop',
                name: 'shop',
                meta: {
                    title: '商城'
                },
                component: Shop
            },{
                path: 'find',
                name: 'find',
                meta: {
                    title: '发现'
                },
                component: Find
            },{
                path: 'person',
                name: 'person',
                meta: {
                    title: '我的'
                },
                component: Person
            }
        ]
    },{
        path:'/shop-detail',
        name:'shop-detail',
        meta:{
            title:'商品详情'
        },
        component: ShopDetail
    }/*,{
        path:'/binding-vehicle',
        name:'binding-vehicle',
        meta:{
            title:'绑定车辆'
        },
        component: BindingVehicle
    }*/,{
        path:'/binding',
        name:'binding',
        meta:{
            title:'绑定挪车码'
        },
        component: BindingCode
    },{
        path:'/nuoche-inform',
        name:'nuoche-inform',
        meta:{
            title:'挪车通知'
        },
        component: NuocheInform
    }
];
routes.push({
    path: '*',
    redirect: '/tabs'
});
export default new Router({
    mode: 'history',
    routes
})
