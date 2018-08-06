<template>
    <div class="my-code">
        <div class="my-code-header gua-gou">
            <dl flex="main:justify">
                <dt flex="dir:top">
                    <span>您好</span>
                    <span>您此微信下有{{count}}张挪车券！</span>
                </dt>
                <dd>
                    <img src="../images/person/carCode_right.png">
                </dd>
            </dl>
        </div>
        <div class="my-code-content">
            <ul class="my-code-items">
                <li class="my-code-item" v-for="(item,index) in items"
                    :class="{'gua-gou':index != items.length-1}">
                    <div class="item-title">车牌号：{{item.PLATENUM}}</div>
                    <dl flex="main:justify cross:center" class="item-time">
                        <dt flex>
                            <span flex-box="0">激活日期：</span>
                            <span flex-box="1">{{item.vipBeginDate}}</span>
                        </dt>
                        <dd flex>
                            <span flex-box="0">有效期截止：</span>
                            <span flex-box="1">{{item.vipEndDate}}</span>
                        </dd>
                    </dl>
                    <div flex="main:center cross:center" class="item-status">
                        <!-- <span class="s-icon"></span> -->
                        <span v-if="item.STATUS == 1" style="color:#666879">未激活</span>
                        <span v-if="item.STATUS == 2">已激活</span>
                        <span v-if="item.STATUS == 3" style="color:#ef1616">已停用</span>
                        <span v-if="(item.STATUS != 1) && (item.STATUS != 2) && (item.STATUS != 3)">未知</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../less/my-code.less';
    import { Indicator, Toast } from 'mint-ui';
    import EventBus from '../tools/event-bus';
    import $api from '../tools/api';
    import jsonp from 'jsonp';
    export default {
        name: 'my-code',
        data(){
            return {
                items:[
                    /*{
                        PLATENUM:'京A31154',
                        vipBeginDate:'2018.02.01',
                        vipEndDate:'2019.02.01',
                        STATUS:1// 1未激活，2激活 3停用
                    },{
                        PLATENUM:'京A31154',
                        vipBeginDate:'2018.02.01',
                        vipEndDate:'2019.02.01',
                        STATUS:1// 1未激活，2激活 3停用
                    }*/
                ]
            }
        },
        created(){
            Indicator.open({
                spinnerType:'fading-circle'
            });
            this.getUser();
        },
        computed: {
            count:function(){
                return this.items.length;
            }
        },
        components:{

        },
        methods: {

            getUser(){
                let phone = this.$route.query.phone;
                jsonp(`http://test.filmfest.hualumedia.com/getCode.php?phone=${phone}`,null,(err,data)=>{
                    Indicator.close();
                    if (err) {
                        Toast(err.message);
                    } else {
                        if(data.status == 200){
                            data.data.map(item => {
                                this.items.push(item);
                            })
                        }
                    }
                    console.log(data);
                });
            }
        },
        destroyed(){

        }
    }
</script>
