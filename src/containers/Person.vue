<template>
    <div class="person">
        <!-- <img src="../images/person.jpg"> -->
        <div flex="dir:top main:center" class="person-header">
            <dl flex>
                <dt>
                    <img src="../images/person/head_p.jpg">
                </dt>
                <dd flex="dir:top main:center">
                    <span class="user-name">
                        <i>{{userName}}</i>&nbsp;&nbsp;<i></i>
                    </span>
                    <span class="time">服务到期时间: {{time}}</span>
                </dd>
            </dl>
            <div class="person-setting"></div>
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
                    <mt-switch v-model="disturb"></mt-switch>
                </li>
                <li flex="dir:top main:center" class="my-infor"
                    @click="link('user-infor')">
                    <span>我的信息</span>
                </li>
                <li flex="dir:top main:center" class="my-order"
                    @click="link">
                    <span>我的订单</span>
                </li>
            </ul>
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
    Vue.component(Switch.name, Switch);
    export default {
        name: 'person',
        data(){
            return {
                userName:'挪车VIP',
                time:'2019-08-01',
                switchStatus:true,
                remarksShow:false,
                disturb:true
            }
        },
        created(){
            console.log(EventBus.openid);
        },
        computed: {
        },
        components:{
           
        },
        methods: {
            link(url){
                //
                Toast('暂未开放！');
                return false;
                // if(url == 'about' || url == 'user-infor' || url == 'my-code'){
                //     this.$router.push({
                //         path:`/${url}`,
                //     });
                // }else{
                //     Toast('暂未开放！');
                // }
                

            },
            closeRemarks(){
                this.remarksShow = false;
            }
        },
        mounted(){

        },
        destroyed(){

        }
    }
</script>
