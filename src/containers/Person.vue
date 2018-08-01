<template>
    <div class="person">
        <!-- <img src="../images/person.jpg"> -->
        <div flex="dir:top main:center" class="person-header">
            <dl flex>
                <dt>
                    <img src="../images/person/head_p.jpg">
                </dt>
                <dd flex="dir:top main:center">
                    <span class="user-name">{{userName}}</span>
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
                    <span class="switch" :class="{'switch-closed':!switchStatus}"
                        @click.stop="switchStatus = !switchStatus"></span>
                </li>
                <li flex="dir:top main:center" class="my-infor"
                    @click="link">
                    <span>我的信息</span>
                </li>
                <li flex="dir:top main:center" class="my-order"
                    @click="link">
                    <span>我的订单</span>
                </li>
            </ul>
            <ul>
                <li flex="dir:top main:center" class="my-code"
                    @click="link">
                    <span>我的挪车码</span>
                </li>
                <li flex="dir:top main:center" class="my-record"
                    @click="link">
                    <span>挪车记录</span>
                </li>
            </ul>
            <ul>
                <li flex="dir:top main:center" class="my-about"
                    @click="link">
                    <span>关于我们</span>
                </li>
            </ul>
        </div>
        <div flex="main:center cross:center" class="service">
            <span class="service-icon">
                <img src="../images/person/service.png">
            </span>
            <span>客服电话: <a href="tel:400-400-4000">400-400-4000</a></span>
        </div>
    </div>
</template>

<script>
    import '../less/person.less';
    import Toast from '../components/Toast';
    export default {
        name: 'person',
        data(){
            return {
                userName:'张三三 13552149166',
                time:'2019.09.01 12:30:00',
                switchStatus:true,
                remarksShow:true
            }
        },
        created(){
        },
        computed: {
        },
        components:{

        },
        methods: {
            link(){
                Toast('暂未开放！');
            },
            closeRemarks(){
                this.remarksShow = false;
            }
        },
        destroyed(){

        }
    }
</script>
