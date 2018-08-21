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
const GuanZhu = resolve => require(['../containers/GuanZhu'], resolve);
const MyCode = resolve => require(['../containers/MyCode'], resolve);
const About = resolve => require(['../containers/About'], resolve);
const UserInfor = resolve => require(['../containers/UserInfor'], resolve);
const News = resolve => require(['../containers/News'], resolve);
const NewsDetail = resolve => require(['../containers/NewsDetail'], resolve);
const JoinInfo = resolve => require(['../containers/JoinInfo'], resolve);
let routes = [
    {
        path: '/base',
        name: 'base',
        meta: {
            title: '首页'
        },
        component: Base,
        beforeEnter:(to, from, next) =>{
            //
        }
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
                    title: '首页',
                    keepAlive:true
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
                    title: '我的',
                    keepAlive:true
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
            title:' '
        },
        component: BindingCode
    },{
        path:'/nuoche-inform',
        name:'nuoche-inform',
        meta:{
            title:'通知车主挪车'
        },
        component: NuocheInform
    },{
        path:'/guan-zhu',
        name:'guan-zhu',
        meta:{
            title:'关注微信'
        },
        component: GuanZhu
    },{
        path:'/my-code',
        name:'my-code',
        meta:{
            title:'我的挪车码'
        },
        component: MyCode
    },{
        path:'/about',
        name:'about',
        meta:{
            title:'关于我们'
        },
        component: About
    },{
        path:'/user-infor',
        name:'user-infor',
        meta:{
            title:'我的信息'
        },
        component: UserInfor
    },{
        path:'/news',
        name:'news',
        meta:{
            title:'新闻'
        },
        component: News
    },{
        path:'/news-detail',
        name:'news-detail',
        meta:{
            title:'新闻详情'
        },
        component: NewsDetail
    },{
        path:'/join-info',
        name:'join-info',
        meta:{
            title:'加盟信息'
        },
        component: JoinInfo
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
