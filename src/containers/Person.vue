<template>
    <div class="person">
        <!-- <img src="../images/person.jpg"> -->
        <div flex="dir:top main:center" class="person-header">
            <dl flex>
                <dt>
                    <img :src="userInfor.headimgurl">
                </dt>
                <dd flex="dir:top main:center">
                    <span class="user-name">
                        <i>{{userInfor.nickname}}</i>&nbsp;&nbsp;<i v-if="plateNum">{{plateNum}}</i>
                    </span>
                    <span v-if="vipEndTime" class="time">服务到期时间: {{vipEndTime}}</span>
                    <span v-if="vipEndTime == '2018'" class="time">未绑定车牌号</span>
                </dd>
            </dl>
            <div class="person-setting" @click.stop="link('user-infor')"></div>
        </div>
        <div v-show="remarksShow" flex="dir:top main:center" class="remarks">
            <dl flex="cross:center">
                <dt flex-box="1">备注:服务到期自动提醒</dt>
                <dd flex-box="0" @click.stop="closeRemarks"></dd>
            </dl>
        </div>
        <div class="person-list">
            <ul>
                <li flex="main:justify cross:center" class="darao">
                    <span>免打扰</span>
                    <!-- <span class="switch" :class="{'switch-closed':!switchStatus}"
                        @click.stop="switchStatus = !switchStatus"></span> -->
                    <mt-switch v-model="disturb" @change="switchChange"></mt-switch>
                </li>
                
                
            </ul>
            <ul>
                <li flex="dir:top main:center" class="my-infor"
                    @click="link('user-infor')">
                    <span>我的信息</span>
                </li>
            </ul>
            <!-- <ul>
                <li flex="dir:top main:center" class="my-order"
                    @click="link">
                    <span>我的订单</span>
                </li>
            </ul> -->
            <ul>
                <li flex="dir:top main:center" class="my-code"
                    @click="link('my-code')">
                    <span>我的挪车码</span>
                </li>
                <!-- <li flex="dir:top main:center" class="my-record"
                    @click="link">
                    <span>挪车记录</span>
                </li> -->
            </ul>
            <ul>
                <li flex="dir:top main:center" class="my-about"
                    @click="link('about')">
                    <span>关于我们</span>
                </li>
            </ul>
        </div>
        <!-- <div flex="main:center cross:center" class="service">
            <span class="service-icon">
                <img src="../images/person/service.png">
            </span>
            <span>客服电话: <a href="tel:400-400-4000">400-400-4000</a></span>
        </div> -->
    </div>
</template>

<script>
    import '../less/person.less';
    import Vue from 'vue';
    import { Switch, Toast } from 'mint-ui';
    import EventBus from '../tools/event-bus';
    import $api from '../tools/api';
    Vue.component(Switch.name, Switch);
    export default {
        name: 'person',
        data(){
            return {
                userName:'挪车VIP',
                vipEndTime:'',
                switchStatus:true,
                remarksShow:false,
                disturb:false,
                plateNum:'',
                userInfor:{}
            }
        },
        created(){
            console.log(sessionStorage.getItem('userInfor'));
            this.getUser();
        },
        computed: {
        },
        components:{
           
        },
        methods: {
            getUser(){
                this.userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
                let openid = this.userInfor.openid;
                if(!openid){
                    Toast('获取openid失败！');
                    return false;
                }
                let userCenter = JSON.parse(sessionStorage.getItem('userCenter'));
                if(userCenter && openid){
                    this.setUser(userCenter);
                    return false;
                }
                $api.get(`/usercenter/init/${openid}`).then(res => {
                    if(res.code == '01'){
                        let userCenter = res.data;
                        this.setUser(userCenter);
                        sessionStorage.setItem('userCenter',JSON.stringify(userCenter));
                    }else{
                        Toast(res.msg || '服务器错误');
                    }
                });
            },
            setUser(userCenter){
                this.telphone = userCenter.telphone;
                this.disturb = userCenter.disturb;
                this.vipEndTime = userCenter.vipEndTime || '';
                this.plateNum = userCenter.plateNum;
            },
            link(url){
                //
                // Toast('暂未开放！');
                // return false;
                if(url == 'about' || url == 'user-infor' || url == 'my-code'){
                    this.$router.push({
                        path:`/${url}`,
                    });
                }else{
                    Toast('暂未开放！');
                }
                

            },
            closeRemarks(){
                this.remarksShow = false;
            },
            switchChange(checked){
                let disturb = 0;
                this.disturb ? disturb = 1 : '' ;
                let openId = this.userInfor.openid || '""';
                if(!openId){
                    Toast('获取openId失败！');
                    return false;
                }
                //this.switchLoading = false;
                $api.get(`/usercenter/setDisturb/${disturb}/${openId}`).then(res => {
                    if(res.code == '01'){
                        if(disturb){
                            Toast('您已经开启了免打扰模式！');
                        }else{
                            Toast('您已经关闭了免打扰模式！')
                        }
                        //update 一下 session里面的数据
                        let userCenter = JSON.parse(sessionStorage.getItem('userCenter'));
                        if(userCenter){
                            userCenter.disturb = disturb;
                            //存储
                            sessionStorage.setItem('userCenter',JSON.stringify(userCenter));
                        }
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                })
                //this.$nextTick(()=>{
                    console.log(this.disturb);
                //})
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>
