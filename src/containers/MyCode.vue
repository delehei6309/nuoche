<template>
    <div class="my-code">
        <div class="my-code-header gua-gou">
            <dl flex="main:justify">
                <dt flex="dir:top">
                    <span>您好</span>
                    <span v-if="totalCount>0">您此微信下有{{totalCount}}张挪车券！</span>
                    <span v-if="titSHow">暂无挪车码！</span>
                </dt>
                <dd>
                    <img src="../images/person/carCode_right.png">
                </dd>
            </dl>
        </div>
        <div class="my-code-content" style="overflow: scroll;">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText="加载更多" bottomDropText="释放加载">
                <ul class="my-code-items">
                    <li class="my-code-item" v-for="(item,index) in items"
                        :class="{'gua-gou':index != items.length-1}">
                        <div class="item-title">车牌号：{{item.plateNum || ''}}</div>
                        <dl flex="main:justify cross:center" class="item-time">
                            <dt flex>
                                <span flex-box="0">激活日期：</span>
                                <span flex-box="1">{{item.vipBeginTime || ''}}</span>
                            </dt>
                            <dd flex>
                                <span flex-box="0">有效期截止：</span>
                                <span flex-box="1">{{item.vipEndTIme || ''}}</span>
                            </dd>
                        </dl>
                        <div flex="main:center cross:center" class="item-status">
                            <!-- <span class="s-icon"></span> -->
                            <span v-if="item.status == 1" style="color:#666879">未激活</span>
                            <span v-if="item.status == 2">已激活</span>
                            <span v-if="item.status == 3" style="color:#ef1616">已停用</span>
                            <span v-if="(item.status != 1) && (item.status != 2) && (item.status != 3)">未知</span>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import '../less/my-code.less';
    import Vue from 'vue';
    import {Toast, Indicator, Loadmore } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    import EventBus from '../tools/event-bus';
    import $api from '../tools/api';
    export default {
        name: 'my-code',
        data(){
            return {
                items:[],
                pageNo:1,
                pageSize:10,
                pageCount:0,
                vipBeginTime:'',
                allLoaded:false,
                titSHow:false,
                totalCount:0
            }
        },
        created(){
            //this.getTime();
            this.getUser();
        },
        computed: {
            // plateCount:function(){
            //     return this.items.length;
            // },
            // pageCount:function(){
            //     let { pageSize, count } = this;
            //     return Math.ceil(count/pageSize);
            // }
        },
        components:{

        },
        methods: {
            getUser(){
                let userInfor = JSON.parse(sessionStorage.getItem('userInfor')) || {};
                this.openid = userInfor.openid || '""';
                let openid = this.openid;
                if(!openid){
                    Toast('获取openid失败！');
                    return false;
                }
                Indicator.open({
                    spinnerType:'fading-circle'
                });
                this.getCodeItems();
            },
            getCodeItems(){
                let { openid, pageNo, pageSize } = this;
                return $api.get(`/usercenter/mycode/${openid}/${pageNo}/${pageSize}`).then(res => {
                    Indicator.close();
                    if(res.code == '01'){
                        //plateNum,vipBeginTime，vipEndTIme,status
                        this.pageCount = res.data.pageCount;
                        this.totalCount = res.data.totalCount;
                        res.data.mycodes.map(item => {
                            this.items.push(item);
                        });
                        if(this.totalCount <= 0){
                            this.titSHow = true;
                        }
                    }else{
                        Toast(res.msg || '服务器错误！');
                    }
                    return res;
                })
            },
            loadBottom() {
                if(this.pageNo >= this.pageCount){
                    this.allLoaded = true;// 若数据已全部获取完毕
                    Toast('没有更多内容了！');
                    this.$refs.loadmore.onBottomLoaded();
                    return false;
                }
                this.pageNo ++ ;
                this.getCodeItems().then(()=>{
                    this.$refs.loadmore.onBottomLoaded();
                });
                //
            },
            getTime(){
                let d = new Date();
                let year = d.getFullYear();
                let month = d.getMonth()+1;
                month < 10 ? (month = '0' + month) : '';
                let date = d.getDate();
                date < 10 ? (date = '0' + month) : '';
                this.vipBeginTime = year + '-' + month + '-' + date;
            }
        },
        destroyed(){
            Indicator.close();
        }
    }
</script>
